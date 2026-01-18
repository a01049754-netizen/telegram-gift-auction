import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from './balance.schema';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Balance.name, schema: BalanceSchema },
    ]),
  ],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
