import { Controller, Post, Body } from '@nestjs/common';
import { BidService } from './bid.service';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  placeBid(
    @Body('auctionId') auctionId: string,
    @Body('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    return this.bidService.placeBid(auctionId, userId, amount);
  }
}
