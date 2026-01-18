import { Controller, Post, Body } from '@nestjs/common';
import { BidService } from './bid.service';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  placeBid(
    @Body('userId') userId: string,
    @Body('auctionId') auctionId: string,
    @Body('amount') amount: number,
  ) {
    return this.bidService.placeBid(userId, auctionId, amount);
  }
}
