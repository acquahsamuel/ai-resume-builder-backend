import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { PublicationService } from '../../cv-content/services/publication.service';
import { CreatePublicationDto } from '../../cv-content/dto/create-publication.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/publications')
@UseGuards(JwtAuthGuard)
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createPublicationDto: CreatePublicationDto) {
    return await this.publicationService.create(req.user.userId, createPublicationDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.publicationService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.publicationService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updatePublicationDto: Partial<CreatePublicationDto>) {
    return await this.publicationService.update(id, req.user.userId, updatePublicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.publicationService.remove(id, req.user.userId);
    return { message: 'Publication deleted successfully' };
  }
}

