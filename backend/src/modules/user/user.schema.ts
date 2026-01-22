import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  // Telegram user id / тестовый id
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  userId: string;

  // Основной баланс
  @Prop({
    default: 100000, // стартовый баланс (можешь сменить)
    min: 0,
  })
  balance: number;

  // Зарезервированные средства (ставки)
  @Prop({
    default: 0,
    min: 0,
  })
  reserved: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
