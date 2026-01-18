import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction } from './auction.schema';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel(Auction.name)
    private readonly auctionModel: Model<Auction>,
  ) {}

  async create(data: {
    title: string;
    startPrice: number;
    endAt: Date;
  }) {
    return this.auctionModel.create({
      ...data,
      isActive: true,
      extended: false,
    });
  }
}
