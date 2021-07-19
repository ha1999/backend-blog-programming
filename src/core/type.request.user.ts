import { Request } from 'express';
export interface RequestCustom extends Request {
  user: DataToken;
}

export interface DataToken {
  id: number;
  role: string;
  email: string;
}
