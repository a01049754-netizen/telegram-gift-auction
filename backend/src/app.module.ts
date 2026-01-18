import { Module } from '@nestjs/common';
import { AuctionModule } from './modules/auction/auction.module';

@Module({
  imports: [AuctionModule],
})
export class AppModule {}
