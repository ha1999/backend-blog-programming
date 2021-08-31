import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL_PG,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // synchronize: true,
        logging: true,
        // autoLoadEntities: true
      }),
  },
];
