import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAllByForum(id: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { forum: id },
      relations: ['user'],
    });
  }

  createPost(post: any): Promise<Post> {
    return this.postsRepository.save(post);
  }
}
