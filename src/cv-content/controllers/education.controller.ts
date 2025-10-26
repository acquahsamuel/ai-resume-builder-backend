import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe, Put } from '@nestjs/common';
import { EducationService } from '../services/education.service';
import { CreateEducationDto } from '../dto/create-education.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/education')
@UseGuards(JwtAuthGuard)
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createEducationDto: CreateEducationDto) {
    return await this.educationService.create(req.user.userId, createEducationDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.educationService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.educationService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateEducationDto: Partial<CreateEducationDto>) {
    return await this.educationService.update(id, req.user.userId, updateEducationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.educationService.remove(id, req.user.userId);
    return { message: 'Education deleted successfully' };
  }

  @Post('reorder')
  async reorder(@Request() req, @Body() body: { educationIds: string[] }) {
    await this.educationService.reorder(req.user.userId, body.educationIds);
    return { message: 'Education reordered successfully' };
  }
}

