import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bid, BidSchema } from './bid.schema';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bid.name, schema: BidSchema },
    ]),
  ],
  providers: [BidService],
  controllers: [BidController],
  exports: [BidService],
})
export class BidModule {}
