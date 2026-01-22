import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction } from '../auction/auction.schema';
import { Bid } from './bid.schema';

@Injectable()
export class BidService {
  constructor(
    @InjectModel(Auction.name) private auctionModel: Model<Auction>,
    @InjectModel(Bid.name) private bidModel: Model<Bid>,
  ) {}

  async placeBid(
    auctionId: string,
    userId: string,
    amount: number,
  ) {
    const now = new Date();

    const auction = await this.auctionModel.findOneAndUpdate(
      {
        _id: auctionId,
        isActive: true,
        endAt: { $gt: now },
        startPrice: { $lt: amount },
      },
      {
        $set: { startPrice: amount },
      },
      {
        new: true,
      },
    );

    if (!auction) {
      throw new BadRequestException('Bid rejected');
    }

    await this.bidModel.create({
      auctionId,
      userId,
      amount,
      createdAt: now,
    });

    const timeLeft = auction.endAt.getTime() - now.getTime();

    if (timeLeft <= 5000 && !auction.extended) {
      auction.endAt = new Date(auction.endAt.getTime() + 10000);
      auction.extended = true;
      await auction.save();
    }

    return { success: true };
  }
}
