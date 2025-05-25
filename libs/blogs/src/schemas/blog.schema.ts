import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, default: "", type: String })
  title = "";

  @Prop({ required: true, type: String })
  content = "";

  @Prop({required: true, type: String })
  excerpt = "";

  @Prop({type: String })
  featuredImage?: string;

  @Prop({ default: false, type: Boolean })
  published = false;

  @Prop({type: Date })
  publishedAt?: Date;

  @Prop({ default: [], type: [String] })
  tags: string[] = [];

  @Prop({ default: 0, type: Number })
  viewCount = 0;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
