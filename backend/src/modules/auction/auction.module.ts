import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { Auction, AuctionSchema } from './auction.schema';

import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auction.name, schema: AuctionSchema },
    ]),
    UserModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
