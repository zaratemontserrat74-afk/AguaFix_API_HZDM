import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { CreateReportDto } from './dto/create-report.dto';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';
 
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}
 
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  )

  async create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    if (!photo) {
      throw new BadRequestException(
        'La foto de la fuga (campo "photo") es obligatoria',
      );
    }
 
    if (!photo.mimetype.startsWith('image/')) {
      throw new BadRequestException(
        'El archivo "photo" debe ser una imagen',
      );
    }
 
    const photoUrl = await this.storageService.uploadFile(
      photo,
      'reports',
    );
 
    const report = await this.reportsService.create(
      createReportDto,
      photoUrl,
    );
 
    const template = generateReportTemplate(
      createReportDto,
      photoUrl,
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
 