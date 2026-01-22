import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction, AuctionDocument } from './auction.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel(Auction.name)
    private readonly auctionModel: Model<AuctionDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ➕ создать аукцион
  async create(data: {
    title: string;
    startPrice: number;
    endAt: Date;
  }) {
    const auction = new this.auctionModel({
      title: data.title,
      startPrice: data.startPrice,
      currentPrice: data.startPrice,
      endAt: data.endAt,
      isActive: true,
      extended: false,
    });

    return auction.save();
  }

  // 📄 все аукционы
  async findAll() {
    return this.auctionModel.find().sort({ createdAt: -1 });
  }

  // 📄 один аукцион
  async findOne(id: string) {
    const auction = await this.auctionModel.findById(id);
    if (!auction) {
      throw new NotFoundException('Auction not found');
    }
    return auction;
  }

  // 🔥 ставка + авто-создание пользователя
  async placeBid(id: string, amount: number, userId: string) {
    if (amount <= 0) {
      throw new BadRequestException('Invalid bid amount');
    }

    const now = new Date();

    // ✅ авто-создание пользователя
    let user = await this.userModel.findOne({ userId });
    if (!user) {
      user = await this.userModel.create({
        userId,
        balance: 1_000_000,
        reserved: 0,
      });
    }

    if (user.balance - user.reserved < amount) {
      throw new BadRequestException('Not enough balance');
    }

    // ✅ атомарная ставка
    const auction = await this.auctionModel.findOneAndUpdate(
      {
        _id: id,
        isActive: true,
        endAt: { $gt: now },
        currentPrice: { $lt: amount },
      },
      {
        $set: {
          currentPrice: amount,
          currentBidder: userId,
        },
      },
      { new: true },
    );

    if (!auction) {
      throw new BadRequestException(
        'Bid rejected (auction ended or price too low)',
      );
    }

    // 💰 резервируем деньги
    user.reserved += amount;
    await user.save();

    // ⏱ anti-sniping (1 раз)
    const remaining = auction.endAt.getTime() - now.getTime();
    if (remaining <= 30_000 && !auction.extended) {
      auction.endAt = new Date(auction.endAt.getTime() + 30_000);
      auction.extended = true;
      await auction.save();
    }

    return auction;
  }

  // ⛔ авто-закрытие аукционов
  async closeExpiredAuctions() {
    const now = new Date();

    const auctions = await this.auctionModel.find({
      isActive: true,
      endAt: { $lte: now },
    });

    for (const auction of auctions) {
      auction.isActive = false;

      if (auction.currentBidder) {
        const winner = await this.userModel.findOne({
          userId: auction.currentBidder,
        });

        if (winner) {
          winner.reserved -= auction.currentPrice;
          winner.balance -= auction.currentPrice;
          await winner.save();
        }

        auction.winner = auction.currentBidder;
        auction.finalPrice = auction.currentPrice;
      }

      await auction.save();
    }
  }
}
