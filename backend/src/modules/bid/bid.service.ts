import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bid } from './bid.schema';

@Injectable()
export class BidService {
  constructor(
    @InjectModel(Bid.name)
    private bidModel: Model<Bid>,
  ) {}

  async placeBid(auctionId: string, userId: string, amount: number) {
    const lastBid = await this.bidModel
      .findOne({ auctionId })
      .sort({ amount: -1 });

    if (lastBid && amount <= lastBid.amount) {
      throw new BadRequestException('Ставка должна быть больше текущей');
    }

    const bid = new this.bidModel({
      auctionId,
      userId,
      amount,
    });

    return bid.save();
  }
}
