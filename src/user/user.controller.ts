import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async login(@Body() loginDto: LoginDto) {
        const user = await this.userService.findUserByEmailAndPassword(loginDto);
        return user;
    }
}
