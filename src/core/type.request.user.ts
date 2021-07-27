import { Request } from 'express';
export interface RequestCustom extends Request {
  user: DataToken;
}

export interface DataToken {
  name: string;
  picture: string;
  email: string;
}
