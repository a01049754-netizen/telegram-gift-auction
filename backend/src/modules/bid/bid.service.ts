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
    const auction
