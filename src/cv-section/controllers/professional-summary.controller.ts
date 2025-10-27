import { Controller, Get, Post, Body, Patch, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ProfessionalSummaryService } from '../../cv-content/services/professional-summary.service';
import { CreateProfessionalSummaryDto } from '../../cv-content/dto/create-professional-summary.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/professional-summary')
@UseGuards(JwtAuthGuard)
export class ProfessionalSummaryController {
  constructor(private readonly professionalSummaryService: ProfessionalSummaryService) {}

  @Post()
  async createOrUpdate(@Request() req, @Body(ValidationPipe) createProfessionalSummaryDto: CreateProfessionalSummaryDto) {
    return await this.professionalSummaryService.createOrUpdate(req.user.userId, createProfessionalSummaryDto);
  }

  @Get()
  async findOne(@Request() req) {
    return await this.professionalSummaryService.findOne(req.user.userId);
  }

  @Patch()
  async update(@Request() req, @Body(ValidationPipe) updateProfessionalSummaryDto: Partial<CreateProfessionalSummaryDto>) {
    return await this.professionalSummaryService.update(req.user.userId, updateProfessionalSummaryDto);
  }
}

