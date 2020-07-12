import { Module, forwardRef } from '@nestjs/common';
import { Category } from 'entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryModule } from 'src/modules/sub-category/sub-category.module';
import { UploadImageService } from 'src/helpers/upload-image/upload-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => SubCategoryModule)],
  controllers: [CategoryController],
  providers: [CategoryService, UploadImageService],
  exports: [CategoryService],
})
export class CategoryModule {}
