import { Connection } from 'typeorm';
import { Action } from './action.entity';

export const actionProviders = [
  {
    provide: 'ACTION_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Action),
    inject: ['DATABASE_CONNECTION'],
  },
];
