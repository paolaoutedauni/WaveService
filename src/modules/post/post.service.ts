import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, UpdateResult } from 'typeorm';
import { PostPag } from 'entities/post.entity';
import { User } from 'entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostPag)
    private postsRepository: Repository<PostPag>,
  ) {}

  findOne(id: number): Promise<PostPag> {
    return this.postsRepository.findOne(id);
  }

  findAllByForum(id: number): Promise<PostPag[]> {
    return this.postsRepository.find({
      where: { forum: id },
      relations: ['user'],
    });
  }

  createPost(post: any): Promise<PostPag> {
    return this.postsRepository.save(post);
  }

  findLatestPosts(id: number): Promise<PostPag[]> {
    return this.postsRepository.find({
      where: { id: MoreThan(id) },
    });
  }

  like(post: PostPag): Promise<PostPag> {
    return this.postsRepository.save(post);
  }
}
