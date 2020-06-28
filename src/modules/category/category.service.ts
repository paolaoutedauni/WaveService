import { Injectable } from '@nestjs/common';
import { Category } from 'entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, UpdateResult } from 'typeorm';
import { ContentCategory } from 'entities/contentCategory.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(options: IPaginationOptions): Promise<Pagination<Category>> {
    return paginate(this.categoriesRepository, options);
  }

  findWithSubCategories(): Promise<Category[]> {
    return this.categoriesRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.subCategories', 'subCategory')
      .leftJoinAndSelect('category.contentCategories', 'contentCategories')
      .getMany();
  }

  findById(id: number): Promise<Category> {
    return this.categoriesRepository.findOne(id, {
      relations: ['color', 'contentCategories'],
    });
  }

  savePhoto(id: number, url: string): Promise<UpdateResult> {
    return this.categoriesRepository
      .createQueryBuilder()
      .update(ContentCategory)
      .set({
        imagen: url,
      })
      .where('id = :id', { id: id })
      .execute();
  }
}
