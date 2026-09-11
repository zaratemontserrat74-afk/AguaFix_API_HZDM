import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const envs = {
  port: env.get('PORT').default('3000').asPortNumber(),

  dbHost: env.get('DB_HOST').required().asString(),
  dbPort: env.get('DB_PORT').required().asPortNumber(),
  dbUsername: env.get('DB_USERNAME').required().asString(),
  dbPassword: env.get('DB_PASSWORD').required().asString(),
  dbDatabase: env.get('DB_DATABASE').required().asString(),

  mailHost: env.get('MAIL_HOST').required().asString(),
  mailPort: env.get('MAIL_PORT').required().asPortNumber(),
  mailUser: env.get('MAIL_USER').required().asString(),
  mailPassword: env.get('MAIL_PASSWORD').required().asString(),

  maintenanceEmail: env
    .get('MAINTENANCE_EMAIL')
    .required()
    .asString(),
};