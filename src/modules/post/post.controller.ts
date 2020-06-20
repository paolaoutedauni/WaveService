import { Controller, UseGuards, Get, Param, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all/forum/:id')
  async findByForumId(@Param('id') id: number) {
    const posts = await this.postService.findAllByForum(id);
    return { posts };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('publish')
  async createPost(@Body() body: any) {
    this.postService.createPost(body);
  }
}
