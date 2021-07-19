import { Connection } from 'mongoose';
import { RoleAction, RoleActionSchema } from './role.action.schema';

export const roleActionProviders = [
  {
    provide: 'ROLE_ACTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model(RoleAction.name, RoleActionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
