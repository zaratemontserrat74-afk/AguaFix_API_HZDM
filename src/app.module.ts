import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { Report } from './reports/entities/report.entity';
import { User } from './auth/entities/user.entity';
import { StorageService } from './storage/storage.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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

      synchronize: false,
    }),
    ReportsModule,
    AuthModule,
    StorageModule,
  ],
  providers: [StorageService],
})
export class AppModule {}