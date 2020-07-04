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

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({
      relations: ['subCategories', 'contentCategories'],
    });
  }

  findWithSubCategories(
    options: IPaginationOptions,
  ): Promise<Pagination<Category>> {
    const queryBuilder = this.categoriesRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.subCategories', 'subCategory')
      .innerJoinAndSelect('category.contentCategories', 'contentCategories');
    return paginate<Category>(queryBuilder, options);
  }

  findById(id: number): Promise<Category> {
    return this.categoriesRepository.findOne(id, {
      relations: ['color', 'contentCategories'],
    });
  }

  disableCategory(id: number): Promise<UpdateResult> {
    return this.categoriesRepository
      .createQueryBuilder()
      .update(Category)
      .set({
        isActive: false,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  activateCategory(id: number): Promise<UpdateResult> {
    return this.categoriesRepository
      .createQueryBuilder()
      .update(Category)
      .set({
        isActive: true,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  saveCategory(category: Category): Promise<Category> {
    return this.categoriesRepository.save(category);
  }
}
