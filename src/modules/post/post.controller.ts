import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'entities/user.entity';
import { PostDto } from 'src/dto/post.dto';
import { UserService } from '../user/user.service';
import { Post as PostEntity } from '../../../entities/post.entity';
import { ForumService } from '../forum/forum.service';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private forumService: ForumService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all/forum/:id')
  async findByForumId(@Param('id') id: number) {
    const posts = await this.postService.findAllByForum(id);
    return { posts };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('latest/:id')
  async findLatestPosts(@Param('id') id: number) {
    const posts = await this.postService.findLatestPosts(id);
    return { posts };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('publish')
  async createPost(@Body() body: PostDto) {
    /*
      Todos los datos del usuario los puedes tomar del request, no los necesoitas en el body
      Para publicar un comentario solo necesitas: el texto del comentario y el id del Foro
    */
    const user = await this.userService.findByEmailOrUsername(
      body.userEmail,
      body.userEmail,
    );
    const forum = await this.forumService.findById(body.foroId);
    const post: PostEntity = new PostEntity({
      ...body,
      user: user,
      forum: forum,
    });
    this.postService.createPost(post);
    return 'lo logre';
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('like/:id')
  async likePost(@Param('id') id: number, @Request() { user }: { user: User }) {
    const post = await this.postService.findOne(id);
    if (post.users) {
      post.users.push(user);
    } else {
      const users = [user];
      post.users = users;
    }
    await this.postService.like(post);
    return {
      message: 'Like succeeded',
    };
  }
}
