import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from 'entities/forum.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumsRepository: Repository<Forum>,
  ) {}

  findAll(options: IPaginationOptions): Promise<Pagination<Forum>> {
    return paginate<Forum>(this.forumsRepository, options);
  }

  findAllBySubCategory(
    id: number,
    options: IPaginationOptions,
  ): Promise<Pagination<Forum>> {
    return paginate<Forum>(this.forumsRepository, options, {
      where: { subCategory: id },
    });
  }

  findById(id: number): Promise<Forum> {
    return this.forumsRepository.findOne(id, {
      relations: ['subCategory', 'users'],
    });
  }

  findByUserAndSubCategory(
    email: string,
    subCategoryId: number,
  ): Promise<Forum[]> {
    console.log(subCategoryId);
    return this.forumsRepository
      .createQueryBuilder('forum')
      .innerJoinAndSelect('forum.users', 'user', 'user.email IN (:userEmail)', {
        userEmail: email,
      })
      .where('forum.subCategory = :subCategoryId', { subCategoryId })
      .getMany();
  }

  findByUserAndSubCategoryWithUsers(
    email: string,
    subCategoryId: number,
  ): Promise<Forum[]> {
    return this.forumsRepository
      .createQueryBuilder('forum')
      .innerJoin('forum.users', 'user', 'user.email IN (:userEmail)', {
        userEmail: email,
      })
      .leftJoinAndSelect('forum.users', 'users')
      .where('forum.subCategory = :subCategoryId', { subCategoryId })
      .getMany();
  }

  saveForum(forum: Forum): Promise<Forum> {
    return this.forumsRepository.save(forum);
  }

  savePhoto(id: number, url: string): Promise<UpdateResult> {
    return this.forumsRepository
      .createQueryBuilder()
      .update(Forum)
      .set({
        image: url,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  findByName(title: string): Promise<Forum> {
    return this.forumsRepository.findOne({ where: { title } });
  }
  
  deleteForum(forum : Forum): Promise<Forum> {
    return this.forumsRepository.remove(forum)
  } 
}
