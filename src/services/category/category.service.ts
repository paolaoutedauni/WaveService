import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find()
    }

    async findCategory(category:string): Promise<Category> {
        return await this.categoryRepository.findOne(category)
    }
}
