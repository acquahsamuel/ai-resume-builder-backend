import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { LanguageService } from '../../cv-content/services/language.service';
import { CreateLanguageDto } from '../../cv-content/dto/create-language.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/languages')
@UseGuards(JwtAuthGuard)
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createLanguageDto: CreateLanguageDto) {
    return await this.languageService.create(req.user.userId, createLanguageDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.languageService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.languageService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateLanguageDto: Partial<CreateLanguageDto>) {
    return await this.languageService.update(id, req.user.userId, updateLanguageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.languageService.remove(id, req.user.userId);
    return { message: 'Language deleted successfully' };
  }
}

