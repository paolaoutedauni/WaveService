import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ForumService } from './services/forum/forum.service';
import { CategoryService } from './services/category/category.service';
import { ForumService } from './services/forum/forum.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ForumService, CategoryService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
