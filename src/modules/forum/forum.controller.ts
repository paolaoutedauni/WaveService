import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('subcategory/:id')
  async findAll(@Param() params) {
    return { forums: await this.forumService.findAllBySubCategory(params.id) };
  }
}
