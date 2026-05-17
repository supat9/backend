import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Rating } from '../../common/enums/rating.enum';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  yearRelease!: number;

  @Prop({ required: true, enum: Object.values(Rating) })
  rating!: Rating;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
