import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { PatentService } from '../../cv-content/services/patent.service';
import { CreatePatentDto } from '../../cv-content/dto/create-patent.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/patents')
@UseGuards(JwtAuthGuard)
export class PatentController {
  constructor(private readonly patentService: PatentService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createPatentDto: CreatePatentDto) {
    return await this.patentService.create(req.user.userId, createPatentDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.patentService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.patentService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updatePatentDto: Partial<CreatePatentDto>) {
    return await this.patentService.update(id, req.user.userId, updatePatentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.patentService.remove(id, req.user.userId);
    return { message: 'Patent deleted successfully' };
  }
}

