import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { VolunteerService } from '../services/volunteer.service';
import { CreateVolunteerDto } from '../dto/create-volunteer.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/volunteer')
@UseGuards(JwtAuthGuard)
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createVolunteerDto: CreateVolunteerDto) {
    return await this.volunteerService.create(req.user.userId, createVolunteerDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.volunteerService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.volunteerService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateVolunteerDto: Partial<CreateVolunteerDto>) {
    return await this.volunteerService.update(id, req.user.userId, updateVolunteerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.volunteerService.remove(id, req.user.userId);
    return { message: 'Volunteer experience deleted successfully' };
  }
}

