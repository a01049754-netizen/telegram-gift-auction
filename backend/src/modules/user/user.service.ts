import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // авто-создание пользователя
  async getOrCreate(userId: string): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(
      { userId },
      {
        $setOnInsert: {
          userId,
          balance: 100000,
          reserved: 0,
        },
      },
      { new: true, upsert: true },
    );
  }

  // резерв средств (атомарно)
  async reserve(userId: string, amount: number): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      {
        userId,
        balance: { $gte: amount },
      },
      {
        $inc: {
          balance: -amount,
          reserved: amount,
        },
      },
      { new: true },
    );

    if (!user) {
      throw new Error('NO_BALANCE');
    }

    return user;
  }

  // освобождение резерва
  async release(userId: string, amount: number): Promise<void> {
    await this.userModel.updateOne(
      { userId },
      {
        $inc: {
          reserved: -amount,
        },
      },
    );
  }
}
