async placeBid(auctionId: string, userId: string, amount: number) {
  const now = new Date();

  // атомарная ставка
  const auction = await this.auctionModel.findOneAndUpdate(
    {
      _id: auctionId,
      isActive: true,
      endAt: { $gt: now },
      startPrice: { $lt: amount }, // ставка должна быть больше
    },
    {
      $set: { startPrice: amount },
    },
    { new: true },
  );

  if (!auction) {
    throw new BadRequestException('Bid rejected');
  }

  // сохраняем ставку
  await this.bidModel.create({
    auctionId,
    userId,
    amount,
    createdAt: now,
  });

  // anti-sniping (один раз)
  const timeLeft = auction.endAt.getTime() - now.getTime();

  if (timeLeft <= 5000 && !auction.extended) {
    auction.endAt = new Date(auction.endAt.getTime() + 5000);
    auction.extended = true;
    await auction.save();
  }

  return { success: true };
}
