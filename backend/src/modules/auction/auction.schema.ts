import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuctionDocument = Auction & Document;

@Schema({ timestamps: true })
export class Auction {
  // Название лота
  @Prop({ required: true, trim: true })
  title: string;

  // Стартовая цена
  @Prop({ required: true, min: 1 })
  startPrice: number;

  // Текущая цена
  @Prop({ required: true, default: 0 })
  currentPrice: number;

  // Дата окончания
  @Prop({ required: true })
  endAt: Date;

  // Активен ли аукцион
  @Prop({ default: true })
  isActive: boolean;

  // Было ли продление (anti-sniping)
  @Prop({ default: false })
  extended: boolean;

  // Текущий лидер ставки
  @Prop({ type: String, default: null })
  currentBidder: string | null;

  // Победитель
  @Prop({ type: String, default: null })
  winner: string | null;

  // Финальная цена
  @Prop({ type: Number, default: null })
  finalPrice: number | null;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
