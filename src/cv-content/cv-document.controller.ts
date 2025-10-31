import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { CvDocumentService } from './cv-document.service';
import { CreateCvDocumentDto } from './dto/create-cv-document.dto';
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

  // POST - Create new CV
  @Post()
  @ApiOperation({ summary: 'Create a new CV document' })
  @ApiBody({ type: CreateCvDocumentDto })
  @ApiResponse({ status: 201, description: 'CV created successfully with all sections populated' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data' })
  createCV(@Body() createCvDto: CreateCvDocumentDto, @Request() req) {
    return this.cvDocumentService.createCV(
      req.user.userId,
      createCvDto.templateId,
      createCvDto.title,
      createCvDto.description,
      createCvDto.enabledSections,
      createCvDto.sectionOrder,
      createCvDto.isDefault,
    );
  }

  // GET - List all user's CVs (sorted by createdAt desc)
  @Get()
  @ApiOperation({ summary: 'Get all user CVs with all sections populated' })
  @ApiResponse({ status: 200, description: 'List of all CVs with sections' })
  getAllCVs(@Request() req) {
    return this.cvDocumentService.getAllUserCV(req.user.userId);
  }

  // GET - Generate default CV (creates one if doesn't exist)
  @Get('generate')
  @ApiOperation({ summary: 'Generate default CV (creates if not exists) with all sections' })
  @ApiResponse({ status: 200, description: 'Default CV generated successfully' })
  generateDefaultCV(@Request() req) {
    return this.cvDocumentService.generateCV(req.user.userId);
  }

  // GET - Get CVs by template
  @Get('template/:templateId')
  @ApiOperation({ summary: 'Get CVs by template with all sections populated' })
  @ApiParam({ name: 'templateId', description: 'Template ID' })
  @ApiResponse({ status: 200, description: 'List of CVs with sections' })
  getCVsByTemplate(@Param('templateId') templateId: string, @Request() req) {
    return this.cvDocumentService.getCVsByTemplate(req.user.userId, templateId);
  }

  // POST - Duplicate CV
  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a CV and return generated CV with all sections' })
  @ApiParam({ name: 'id', description: 'CV document ID to duplicate' })
  @ApiResponse({ status: 201, description: 'CV duplicated successfully' })
  @ApiResponse({ status: 404, description: 'CV not found' })
  duplicateCV(@Param('id') id: string, @Body() body: { title?: string }, @Request() req) {
    return this.cvDocumentService.duplicateCV(id, req.user.userId, body.title);
  }

  // PATCH - Update CV configuration
  @Patch(':id/set-default')
  @ApiOperation({ summary: 'Set a CV as default' })
  @ApiParam({ name: 'id', description: 'CV document ID' })
  @ApiResponse({ status: 200, description: 'CV set as default successfully' })
  @ApiResponse({ status: 404, description: 'CV not found' })
  setDefaultCV(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.setDefaultCV(id, req.user.userId);
  }

  @Patch(':id/section-order')
  @ApiOperation({ summary: 'Update section order for a CV' })
  @ApiParam({ name: 'id', description: 'CV document ID' })
  @ApiResponse({ status: 200, description: 'Section order updated successfully' })
  @ApiResponse({ status: 404, description: 'CV not found' })
  updateSectionOrder(@Param('id') id: string, @Body() body: { sectionOrder: string[] }, @Request() req) {
    return this.cvDocumentService.updateSectionOrder(id, req.user.userId, body.sectionOrder);
  }

  @Patch(':id/enabled-sections')
  @ApiOperation({ summary: 'Update enabled sections for a CV' })
  @ApiParam({ name: 'id', description: 'CV document ID' })
  @ApiResponse({ status: 200, description: 'Enabled sections updated successfully' })
  @ApiResponse({ status: 404, description: 'CV not found' })
  updateEnabledSections(@Param('id') id: string, @Body() body: { enabledSections: string[] }, @Request() req) {
    return this.cvDocumentService.updateEnabledSections(id, req.user.userId, body.enabledSections);
  }

  @Patch(':id/template')
  @ApiOperation({ summary: 'Update template for a CV' })
  @ApiParam({ name: 'id', description: 'CV document ID' })
  @ApiResponse({ status: 200, description: 'Template updated successfully' })
  @ApiResponse({ status: 404, description: 'CV not found' })
  updateTemplate(@Param('id') id: string, @Body() body: { templateId: string }, @Request() req) {
    return this.cvDocumentService.updateTemplate(id, req.user.userId, body.templateId);
  }

  // GET - Get specific CV by ID (MUST be last due to catch-all route)
  @Get(':id')
  @ApiOperation({ summary: 'Get CV by ID with all sections populated' })
  @ApiParam({ name: 'id', description: 'CV document ID' })
  @ApiResponse({ status: 200, description: 'CV with all sections' })
  @ApiResponse({ status: 404, description: 'CV not found' })
  getCVById(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.findCV(id, req.user.userId);
  }

  // DELETE - Delete CV
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a CV' })
  @ApiParam({ name: 'id', description: 'CV document ID' })
  @ApiResponse({ status: 200, description: 'CV deleted successfully' })
  @ApiResponse({ status: 404, description: 'CV not found' })
  deleteCV(@Param('id') id: string, @Request() req) {
    return this.cvDocumentService.deleteCV(id, req.user.userId);
  }
}
