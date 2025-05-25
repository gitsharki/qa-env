import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async findAll(query: any = {}): Promise<Blog[]> {
    const filter: any = {};

    // Only show published posts by default unless explicitly requested
    if (query.published !== undefined) {
      filter.published = query.published;
    } else {
      filter.published = true;
    }

    // Filter by tag if provided
    if (query.tag) {
      filter.tags = { $in: [query.tag] };
    }

    const limit = query.limit ? parseInt(query.limit, 10) : 10;
    const skip = query.page ? (parseInt(query.page, 10) - 1) * limit : 0;

    return this.blogModel
      .find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = new this.blogModel(createBlogDto);

    if (newBlog.published) {
      newBlog.publishedAt = new Date();
    }

    return newBlog.save();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const updates: any = { ...updateBlogDto };

    // If setting to published and no publishedAt date exists, set it
    if (updates.published === true) {
      const blog = await this.blogModel.findById(id).exec();
      if (!blog?.publishedAt) {
        updates.publishedAt = new Date();
      }
    }

    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();

    if (!updatedBlog) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    return updatedBlog;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.blogModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }).exec();
  }
}
