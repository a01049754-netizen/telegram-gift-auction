import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance } from './balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name)
    private readonly balanceModel: Model<Balance>,
  ) {}

  async get(userId: string) {
    return this.balanceModel.findOne({ userId });
  }

  async reserve(userId: string, amount: number) {
    const balance = await this.balanceModel.findOneAndUpdate(
      {
        userId,
        amount: { $gte: amount },
      },
      {
        $inc: { amount: -amount },
      },
      { new: true },
    );

    if (!balance) {
      throw new BadRequestException('Insufficient funds');
    }

    return balance;
  }

  async refund(userId: string, amount: number) {
    await this.balanceModel.findOneAndUpdate(
      { userId },
      { $inc: { amount } },
    );
  }
}
