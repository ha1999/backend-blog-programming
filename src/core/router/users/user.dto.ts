import {
  IsString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}

export class CreateUserDtoGH {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  work: string;

  @IsOptional()
  @IsString()
  github: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}

export class UpdateUserDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsInt()
  lastName: number;

  @IsBoolean()
  is_active: boolean;
}
