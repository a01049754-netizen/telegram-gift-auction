import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bid, BidDocument } from './bid.schema';

@Injectable()
export class BidService {
  constructor(
    @InjectModel(Bid.name)
    private bidModel: Model<BidDocument>,
  ) {}

  async placeBid(userId: string, auctionId: string, amount: number) {
    return this.bidModel.create({
      userId,
      auctionId,
      amount,
      createdAt: new Date(),
    });
  }

  async getHighestBid(auctionId: string) {
    return this.bidModel
      .findOne({ auctionId })
      .sort({ amount: -1 })
      .exec();
  }
}
