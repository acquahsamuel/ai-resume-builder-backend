import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { WorkExperienceService } from '../services/work-experience.service';
import { CreateWorkExperienceDto } from '../dto/create-work-experience.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/work-experience')
@UseGuards(JwtAuthGuard)
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  async create(
    @Request() req,
    @Body(ValidationPipe) createWorkExperienceDto: CreateWorkExperienceDto,
  ) {
    return await this.workExperienceService.create(req.user.userId, createWorkExperienceDto);
  }

  @Get()
  async findAll(@Request() req) {
    // return await this.workExperienceService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.workExperienceService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body(ValidationPipe) updateWorkExperienceDto: Partial<CreateWorkExperienceDto>,
  ) {
    return await this.workExperienceService.update(id, req.user.userId, updateWorkExperienceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.workExperienceService.remove(id, req.user.userId);
    return { message: 'Work experience deleted successfully' };
  }

  @Post('reorder')
  async reorder(@Request() req, @Body() body: { experienceIds: string[] }) {
    await this.workExperienceService.reorderExperiences(req.user.userId, body.experienceIds);
    return { message: 'Work experiences reordered successfully' };
  }

  @Post('generate-description')
  async generateJobDescription(@Body() body: { jobTitle: string; company: string }) {
    const descriptions = await this.workExperienceService.generateJobDescription(
      body.jobTitle,
      body.company,
    );
    return { descriptions };
  }
}