import { IsString, IsNotEmpty } from 'class-validator';
export class EditUserNameDto {
  @IsNotEmpty()
  @IsString()
  userName: string;
}
