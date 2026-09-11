import {
  IsIn,
  IsString,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsIn(['low', 'medium', 'high'])
  severity: string;

  @IsString()
  reporterPhone: string;
}