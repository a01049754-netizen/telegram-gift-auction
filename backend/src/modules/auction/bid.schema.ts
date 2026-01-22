import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Bid extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  auctionId: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
