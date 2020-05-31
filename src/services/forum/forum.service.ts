import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from 'entities/forum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForumService {
    constructor(@InjectRepository(Forum) private forumRepository: Repository<Forum>) {}

    async findAll(): Promise<Forum[]> {
        return await this.forumRepository.find()
    }

    async findForumsforName(forum:string): Promise<Forum[]> {
        return await this.forumRepository.find({where: "forum LIKE '%'" + forum + "'%'"})
    }

    async findForumforName(forum:string): Promise<Forum> {
        return await this.forumRepository.findOne()
    }

    async findForumsforCategory(category: string): Promise<Forum[]> {
        return await this.forumRepository.find({where: category})
    }

    async findForumsforSubcategory(subcategory: string): Promise<Forum[]> {
        return await this.forumRepository.find({where: subcategory})
    }
}
