export interface Auction {
  id: string;
  title: string;
  currentPrice: number;
  endsAt: number;
  finished: boolean;
  winnerId?: string;
}
