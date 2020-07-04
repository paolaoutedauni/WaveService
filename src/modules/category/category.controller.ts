import {
  Controller,
  Get,
  UseGuards,
  Param,
  Request,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'entities/user.entity';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { ContentCategoryService } from '../content-category/content-category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async findAll() {
    return await this.categoryService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('favorites')
  async findByUser(@Request() { user }: { user: User }) {
    const categories = await this.categoryService.findAll();
    const subcategories = await this.subCategoryService.findByUser(user.email);
    const filterCategories = categories.filter(category => {
      const subCategoriesFiltradas = subcategories.filter(subcategory =>
        category.subCategories.some(sub => sub.id === subcategory.id),
      );
      if (subCategoriesFiltradas.length > 0) {
        category.subCategories = subCategoriesFiltradas;
        return category;
      } else {
        return false;
      }
    });
    return {
      categories: filterCategories,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all/with/subcategories')
  async findWithSubcategories(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.categoryService.findWithSubCategories({
      page,
      limit,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.categoryService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('disable/:id')
  async disableCategory(@Param('id') id:number) {
    const category = this.categoryService.findById(id)
    if (!category) {
      throw new HttpException('La Categoria no existe', HttpStatus.NOT_FOUND);
    }
    this.categoryService.disableCategory(id)
    return {
      message: 'Category Disabled'
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('active/:id')
  async activeCategory(@Param('id') id:number) {
    const category = this.categoryService.findById(id)
    if (!category) {
      throw new HttpException('La Categoria no existe', HttpStatus.NOT_FOUND);
    }
    this.categoryService.activeCategory(id)
    return {
      message: 'Category Activated'
    }
  }
}
