import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { AuctionService } from './auction.service';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  // 📄 все аукционы
  @Get()
  findAll() {
    return this.auctionService.findAll();
  }

  // 📄 один аукцион
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(id);
  }

  // 🔥 ставка
  @Post(':id/bid')
  placeBid(
    @Param('id') id: string,
    @Body() body: { amount: number; userId: string },
  ) {
    return this.auctionService.placeBid(
      id,
      body.amount,
      body.userId,
    );
  }
}
