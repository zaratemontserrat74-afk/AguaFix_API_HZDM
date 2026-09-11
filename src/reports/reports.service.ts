import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import {
  Report,
} from './entities/report.entity';

import {
  CreateReportDto,
} from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async create(
    createReportDto: CreateReportDto,
  ): Promise<Report> {
    const report =
      this.reportRepository.create(createReportDto);

    return this.reportRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}