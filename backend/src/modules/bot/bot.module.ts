import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { AuctionModule } from '../auction/auction.module';

@Module({
  imports: [AuctionModule],
  providers: [BotService],
})
export class BotModule {}
