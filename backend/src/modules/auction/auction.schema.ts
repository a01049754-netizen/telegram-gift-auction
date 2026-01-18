import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Auction extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  startPrice!: number;

  @Prop({ required: true })
  endAt!: Date;

  @Prop({ default: true })
  isActive!: boolean;

  // anti-sniping: можно продлить ТОЛЬКО ОДИН РАЗ (+5 сек)
  @Prop({ default: false })
  extended!: boolean;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
