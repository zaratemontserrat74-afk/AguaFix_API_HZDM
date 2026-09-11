import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { ReportsService } from './reports.service';
import { EmailService } from '../email/email.service';

import { CreateReportDto } from './dto/create-report.dto';

import { generateReportTemplate } from './templates/report.template';

import { envs } from '../config/envs';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(
    @Body() createReportDto: CreateReportDto,
  ) {
    const report =
      await this.reportsService.create(
        createReportDto,
      );

    const template =
      generateReportTemplate(
        createReportDto,
      );

    await this.emailService.sendEmail(
      envs.maintenanceEmail,
      'Nuevo reporte de fuga de agua',
      template,
    );

    return report;
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}