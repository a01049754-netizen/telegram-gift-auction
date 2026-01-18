import { Module } from '@nestjs/common';
import { AuctionModule } from './modules/auction/auction.module';
import { BidModule } from './modules/bid/bid.module';

@Module({
  imports: [
    AuctionModule,
    BidModule,
  ],
})
export class AppModule {}
