import { Controller, Body, Request, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService} from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {}

    @Post('login')
    async login(@Body() body: LoginDto) {
        const {email, password} = await this.userService.findByEmailAndPassword(body);
        if(email){
            return {
                accessToken: this.jwtService.sign({email, password}),
              };
        }else{
            throw new HttpException('Este usuario no existe', HttpStatus.NOT_FOUND);
        }
    }
}
