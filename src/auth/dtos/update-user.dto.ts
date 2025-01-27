import { IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly password?: string;

  @IsEnum(Role)
  @IsOptional()
  readonly role?: Role;
}
