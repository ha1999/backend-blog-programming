import * as mongoose from 'mongoose';
import { url_mongo } from 'config/configuration';
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(url_mongo),
  },
];
