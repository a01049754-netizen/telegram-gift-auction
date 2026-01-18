import { Injectable } from '@nestjs/common';
import { Auction } from './auction.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class AuctionService {
  private auctions: Auction[] = [];

  createAuction(title: string, startPrice: number, duration: number) {
    const auction: Auction = {
      id: randomUUID(),
      title,
      currentPrice: startPrice,
      endsAt: Date.now() + duration * 1000,
      finished: false,
    };

    this.auctions.push(auction);
    return auction;
  }

  getActiveAuctions() {
    return this.auctions.filter(
      a => !a.finished && a.endsAt > Date.now()
    );
  }

  finishExpired() {
    this.auctions.forEach(a => {
      if (!a.finished && a.endsAt <= Date.now()) {
        a.finished = true;
      }
    });
  }
}
