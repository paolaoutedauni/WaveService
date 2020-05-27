import { Injectable } from '@nestjs/common';
import { User } from "entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { RegisterDto } from "../../dto/register.dto";

@Injectable()
export class RegisterService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }
    
    async findEmail(email:string): Promise<User> {
        return await this.userRepository.findOne({where: {email} })
    }

    async createUser(userRegister: RegisterDto) {
        await this.userRepository.save(userRegister)
        return userRegister
    }


}
