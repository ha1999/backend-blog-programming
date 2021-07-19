import {
  IsString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  img: string;

  @IsString()
  overview: string;

  @IsString()
  content: string;

  @IsString()
  tags: string;
}

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  img: string;

  @IsString()
  overview: string;

  @IsString()
  content: string;

  @IsString()
  tags: string;
}
