import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FireBaseService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { handlerError } from 'src/utils/handError';
@Controller('file')
export class FileController {
  constructor(private readonly fireBaseService: FireBaseService) {}
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.fireBaseService.uploadFileToFirebase(file);
    } catch (err) {
      handlerError(err)
    }
  }
  @UseInterceptors(FilesInterceptor('files'))
  @Post('/multiple')
  async uploadMultipleFile(@UploadedFiles() files: Express.Multer.File[]) {
    try {
      return this.fireBaseService.uploadMultipleFileToFirebase(files);
    } catch (err) {
      handlerError(err)
    }
  }
  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    try {
      return this.fireBaseService.deleteFileOnFirebase(fileName);
    } catch (error) {
      handlerError(error)
    }
    
  }

  @Get(':prefix')
  async getListFile(@Param('prefix') prefix: string) {
    const pathPrefix = prefix === 'all' ? '' : prefix;
    try {
      return this.fireBaseService.getFileOnFirebase(pathPrefix);
    } catch (error) {
      handlerError(error)
    }
  }
}
