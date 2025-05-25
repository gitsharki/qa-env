import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogsDto: CreateBlogDto) {
    return this.blogsService.create(createBlogsDto);
  }

  @Get()
  findAll(@Query() query: string) {
    return this.blogsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogsDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }

  @Post(':id/view')
  @HttpCode(HttpStatus.NO_CONTENT)
  incrementViewCount(@Param('id') id: string) {
    return this.blogsService.incrementViewCount(id);
  }
}
