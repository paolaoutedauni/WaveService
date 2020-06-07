import { Controller, UseGuards, Get, Param, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ForumService } from './forum.service';
import { User } from 'entities/user.entity';

@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async findAll() {
    return { forums: await this.forumService.findAll() };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('subcategory/:id')
  async findBySubcategory(@Param() params) {
    return { forums: await this.forumService.findAllBySubCategory(params.id) };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('favorites')
  async findByUser(@Request() { user }: { user: User }) {
    return {
      forums: await this.forumService.findByUser(user.email),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param('id') id: number) {
    return { forums: await this.forumService.findAllBySubCategory(id) };
  }
}
