import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  title: string;
  constructor(title: string) {
    this.title = title;
  }

  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. ${this.title.replace(
          this.title[0],
          this.title[0].toUpperCase(),
        )} have to Numberic`,
      );
    }
    return val;
  }
}
