import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Balance extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, min: 0 })
  amount: number;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
