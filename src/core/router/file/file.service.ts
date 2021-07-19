import { Injectable } from '@nestjs/common';
import FireBaseClass from '../../../utils/fireBase';
@Injectable()
export class FireBaseService {
  constructor() {}
  async uploadFileToFirebase(file: Express.Multer.File) {
    return FireBaseClass.uploadFileWithBuffer(
      file.originalname,
      file.buffer,
      file.mimetype,
    );
  }
  async deleteFileOnFirebase(pathFile: string) {
    return FireBaseClass.deleteFileonFirebase(pathFile);
  }
  async getFileOnFirebase(prefix: string) {
    return FireBaseClass.getListFileonFirebase(prefix);
  }
  async uploadMultipleFileToFirebase(files: Express.Multer.File[]) {
    const listFiles = files.map((file) => ({
      originalname: file.originalname,
      mimetype: file.mimetype,
      buffer: file.buffer,
    }));
    return FireBaseClass.uploadMultipleFile(listFiles);
  }
}
