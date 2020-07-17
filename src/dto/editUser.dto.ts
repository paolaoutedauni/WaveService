import { IsString, IsOptional } from 'class-validator';
export class EditUserDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  birthday: string;
}
