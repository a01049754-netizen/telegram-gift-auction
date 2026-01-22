import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config'; // 🔥 ВАЖНО

import { AuctionModule } from './modules/auction/auction.module';
import { BotModule } from './modules/bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 🔥 чтобы process.env работал везде
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    ScheduleModule.forRoot(),
    AuctionModule,
    BotModule,
  ],
})
export class AppModule {}
