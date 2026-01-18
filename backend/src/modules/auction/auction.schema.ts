import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Auction extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startPrice: number;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ default: true })
  isActive: boolean = true;

  @Prop({ default: false })
  extended: boolean = false;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
