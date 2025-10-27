import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ReferenceService } from '../../cv-content/services/reference.service';
import { CreateReferenceDto } from '../../cv-content/dto/create-reference.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/references')
@UseGuards(JwtAuthGuard)
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createReferenceDto: CreateReferenceDto) {
    return await this.referenceService.create(req.user.userId, createReferenceDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.referenceService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.referenceService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateReferenceDto: Partial<CreateReferenceDto>) {
    return await this.referenceService.update(id, req.user.userId, updateReferenceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.referenceService.remove(id, req.user.userId);
    return { message: 'Reference deleted successfully' };
  }
}

