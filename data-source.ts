import { DataSource } from 'typeorm';

import { envs } from './src/config/envs';
import { Report } from './src/reports/entities/report.entity';
import { User } from './src/auth/entities/user.entity';

export default new DataSource({
  type: 'postgres',

  host: envs.dbHost,
  port: envs.dbPort,

  username: envs.dbUsername,
  password: envs.dbPassword,

  database: envs.dbDatabase,

  entities: [
    Report,
    User,
  ],

  migrations: [
    'migrations/*.ts',
  ],

  synchronize: false,
});