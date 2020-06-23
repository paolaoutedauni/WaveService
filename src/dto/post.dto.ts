import {IsString, IsNotEmpty } from "class-validator";

export class PostDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    foroId: number;

    @IsNotEmpty()
    userEmail: string;
}