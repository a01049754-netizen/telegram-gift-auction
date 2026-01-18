import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuctionService } from './auction.service';

@Controller('auction')
export class AuctionController {
  constructor(private readonly service: AuctionService) {}

  @Post('create')
  create(@Body() body: any) {
    return this.service.createAuction(
      body.title,
      body.startPrice,
      body.duration
    );
  }

  @Get('active')
  getActive() {
    return this.service.getActiveAuctions();
  }
}
