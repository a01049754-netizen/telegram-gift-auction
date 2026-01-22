import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN!);

    this.bot.start((ctx) =>
      ctx.reply('🤖 Bot is alive, backend works'),
    );
  }

  onModuleInit() {
    this.bot.launch().then(() => {
      console.log('🤖 Telegram bot launched');
    });
  }

  async onModuleDestroy() {
    await this.bot.stop();
  }
}
