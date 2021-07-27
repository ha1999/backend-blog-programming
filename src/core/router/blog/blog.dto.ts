import {
  IsString,
  IsNotEmpty
} from 'class-validator';

export class CreateBlogDtoBody {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  overview: string;

  @IsString()
  content: string;

  @IsString()
  tags: string;
}



export class CreateBlogDto extends CreateBlogDtoBody {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  img: string;
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
