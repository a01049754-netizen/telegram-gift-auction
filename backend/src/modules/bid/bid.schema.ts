import { Schema } from 'mongoose';

export const BidSchema = new Schema({
  auctionId: { type: String, index: true },
  userId: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});
