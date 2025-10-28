import { Controller,  Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CvDocumentService } from './cv-document.service';
import { CreateCvDocumentDto } from './dto/create-cv-document.dto';
import { UpdateCvDocumentDto } from './dto/update-cv-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv-document')
@UseGuards(JwtAuthGuard)
export class CvDocumentController {
  constructor(private readonly cvDocumentService: CvDocumentService) { }

  @Post()
  create(@Body() createCvDocumentDto: CreateCvDocumentDto, @Request() req) {
    // Add userId from JWT token
    createCvDocumentDto.userId = req.user.userId;
    return this.cvDocumentService.createCV(createCvDocumentDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.cvDocumentService.findAllCV(req.user.userId);
  }

  @Get(':id')
  findCVById(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.findCV(id, req.user.userId);
  }

  @Patch(':id')
  updateCV(@Param('id') id: string, @Body() updateCvDocumentDto: UpdateCvDocumentDto, @Request() req) {
    return this.cvDocumentService.updateCV(id, req.user.userId, updateCvDocumentDto);
  }

  @Delete(':id')
  deleteCV(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.deleteCV(id, req.user.userId);
  }

  @Get('my-cvs')
  getAllUserCV(@Request() req) {
    return this.cvDocumentService.getAllUserCV(req.user.userId);
  }
}
