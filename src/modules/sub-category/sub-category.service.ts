import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from 'entities/subCategory.entity';
import { Repository, UpdateResult } from 'typeorm';
import { FavoriteSubCategoryDto } from 'src/dto/favoriteSubCategory.dto';
import { User } from 'entities/user.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoriesRepository: Repository<SubCategory>,
  ) {}

  findAllByCategory(id: number): Promise<SubCategory[]> {
    return this.subCategoriesRepository.find({
      where: { category: id },
    });
  }

  findByUser(email: string): Promise<SubCategory[]> {
    return this.subCategoriesRepository
      .createQueryBuilder('subCategory')
      .innerJoin('subCategory.users', 'user', 'user.email IN (:userEmail)', {
        userEmail: email,
      })
      .getMany();
  }

  saveSubCategory(subCategory: SubCategory): Promise<SubCategory> {
    return this.subCategoriesRepository.save(subCategory);
  }

  findByIds(ids: number[]): Promise<SubCategory[]> {
    return this.subCategoriesRepository
      .createQueryBuilder('subCategory')
      .leftJoinAndSelect('subCategory.users', 'user')
      .where('subCategory.id IN (:ids)', { ids })
      .getMany();
  }

  findById(id: number): Promise<SubCategory> {
    return this.subCategoriesRepository.findOne(id, {
      relations: ['users', 'category'],
    });
  }

  findByIdWithForums(id: number): Promise<SubCategory> {
    return this.subCategoriesRepository.findOne(id, {
      relations: ['users', 'forums'],
    });
  }

  savePhoto(id: number, url: string): Promise<UpdateResult> {
    return this.subCategoriesRepository
      .createQueryBuilder()
      .update(SubCategory)
      .set({
        image: url,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  findByName(name: string): Promise<SubCategory> {
    return this.subCategoriesRepository.findOne({
      where: { name: name },
    });
  }
}
