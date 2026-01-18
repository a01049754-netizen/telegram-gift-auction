import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction } from '../auction/auction.schema';
import { Bid } from './bid.schema';

@Injectable()
export class BidService {
  constructor(
    @InjectModel(Auction.name)
    private readonly auctionModel: Model<Auction>,

    @InjectModel(Bid.name)
    private readonly bidModel: Model<Bid>,
  ) {}

  async placeBid(auctionId: string, userId: string, amount: number) {
    // 1️⃣ получаем аукцион
    const auction = await this.auctionModel.findById(auctionId);

    if (!auction || !auction.isActive) {
      throw new BadRequestException('Auction not active');
    }

    const now = new Date();

    if (auction.endAt <= now) {
      throw new BadRequestException('Auction already ended');
    }

    // 2️⃣ сохраняем ставку
    await this.bidModel.create({
      auctionId,
      userId,
      amount,
      createdAt: now,
    });

    // 3️⃣ АНТИ-СНАЙПИНГ (+5 секунд ОДИН РАЗ)
    const timeLeft = auction.endAt.getTime() - now.getTime();

    if (timeLeft <= 5000 && !auction.extended) {
      auction.endAt = new Date(auction.endAt.getTime() + 5000);
      auction.extended = true;
      await auction.save();
    }

    return { success: true };
  }
}
