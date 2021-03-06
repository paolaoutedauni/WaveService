import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ForumModule } from './modules/forum/forum.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostModule } from './modules/post/post.module';
import { ContentCategoryModule } from './modules/content-category/content-category.module';
import { SubscriberModule } from './modules/subscriber/subscriber.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    CategoryModule,
    ForumModule,
    SubCategoryModule,
    PostModule,
    ContentCategoryModule,
    SubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
