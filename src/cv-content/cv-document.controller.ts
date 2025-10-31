import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CvDocumentService } from './cv-document.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('cv-content')
@ApiBearerAuth('JWT-auth')
@Controller('api/v1/cvs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user', 'admin')
export class CvDocumentController {
  constructor(private readonly cvDocumentService: CvDocumentService) { }

  @Get()
  findAll(@Request() req) {
    return this.cvDocumentService.findAllCV(req.user.userId);
  }

  @Get('generate')
  generateCV(@Request() req) {
    return this.cvDocumentService.generateCV(req.user.userId);
  }

  @Get('generate/:id')
  generateCVById(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.generateCV(req.user.userId, id);
  }

  @Get('my-cvs')
  getAllUserCV(@Request() req) {
    return this.cvDocumentService.getAllUserCV(req.user.userId);
  }

  @Get('default')
  getDefaultCV(@Request() req) {
    return this.cvDocumentService.getDefaultCV(req.user.userId);
  }

  @Get('template/:templateId')
  getCVsByTemplate(@Param('templateId') templateId: string, @Request() req) {
    return this.cvDocumentService.getCVsByTemplate(req.user.userId, templateId);
  }

  @Get(':id')
  findCVById(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.findCV(id, req.user.userId);
  }

  @Delete(':id')
  deleteCV(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.deleteCV(id, req.user.userId);
  }

  @Patch(':id/set-default')
  setDefaultCV(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.setDefaultCV(id, req.user.userId);
  }

  @Post(':id/duplicate')
  duplicateCV(@Param('id') id: string, @Body() body: { title?: string }, @Request() req) {
    return this.cvDocumentService.duplicateCV(id, req.user.userId, body.title);
  }

  @Patch(':id/section-order')
  updateSectionOrder(@Param('id') id: string, @Body() body: { sectionOrder: string[] }, @Request() req) {
    return this.cvDocumentService.updateSectionOrder(id, req.user.userId, body.sectionOrder);
  }

  @Patch(':id/enabled-sections')
  updateEnabledSections(@Param('id') id: string, @Body() body: { enabledSections: string[] }, @Request() req) {
    return this.cvDocumentService.updateEnabledSections(id, req.user.userId, body.enabledSections);
  }

  @Patch(':id/template')
  updateTemplate(@Param('id') id: string, @Body() body: { templateId: string }, @Request() req) {
    return this.cvDocumentService.updateTemplate(id, req.user.userId, body.templateId);
  }

}
