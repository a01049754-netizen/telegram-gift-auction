import { Module } from '@nestjs/common';

import { AuctionModule } from './modules/auction/auction.module';
import { BidModule } from './modules/bid/bid.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [
    AuctionModule,
    BidModule,
    BalanceModule,
  ],
})
export class AppModule {}
