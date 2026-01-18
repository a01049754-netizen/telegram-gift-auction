@Schema({ timestamps: true })
export class Auction extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startPrice: number;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  extended: boolean;
}
