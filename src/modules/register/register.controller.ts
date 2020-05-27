import { Controller, Post, Body, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { RegisterDto } from "../../dto/register.dto";
import { RegisterService } from "./register.service";
import { sha1 } from 'object-hash';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';


@Controller('user/register')
export class RegisterController {
    constructor(private registerService: RegisterService, private jwtService: JwtService) {}

    @Post()
    async register(@Body() body: RegisterDto) {
        const encrytedPass= sha1(body.password);
        const emailExist = this.registerService.findEmail(body.email)
        if (emailExist) {
            throw new HttpException('Usuario Existente: ' + !!emailExist, HttpStatus.FOUND)
        }
        else{
            const user= this.registerService.createUser({
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            email: body.email,
            birthday: "1988-06-05",
            isActive: true,
            password: encrytedPass
            })
            throw new HttpException('Usuario creado ', HttpStatus.OK)
        }
    }
}
