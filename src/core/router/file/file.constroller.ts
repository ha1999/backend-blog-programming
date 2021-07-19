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
@Controller('file')
export class FileController {
  constructor(private readonly fireBaseService: FireBaseService) {}
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.fireBaseService.uploadFileToFirebase(file);
    } catch (err) {
      console.log('error upload file', err);
      return { err: err.message };
    }
  }
  @UseInterceptors(FilesInterceptor('files'))
  @Post('/multiple')
  async uploadMultipleFile(@UploadedFiles() files: Express.Multer.File[]) {
    try {
      return this.fireBaseService.uploadMultipleFileToFirebase(files);
    } catch (err) {
      return { err: err.message };
    }
  }
  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    return this.fireBaseService.deleteFileOnFirebase(fileName);
  }

  @Get(':prefix')
  async getListFile(@Param('prefix') prefix: string) {
    const pathPrefix = prefix === 'all' ? '' : prefix;
    return this.fireBaseService.getFileOnFirebase(pathPrefix);
  }
}
