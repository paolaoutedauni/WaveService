import { Controller, Body, Request, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        console.log(req)
        return req.user;
    }
}
