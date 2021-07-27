import { HttpException, HttpStatus } from "@nestjs/common";

export class CreatEntityException extends HttpException {
    constructor(details: string) {
      super(details, HttpStatus.BAD_REQUEST);
    }
  }
  