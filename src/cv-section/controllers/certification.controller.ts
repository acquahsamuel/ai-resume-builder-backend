import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { CertificationService } from '../../cv-content/services/certification.service';
import { CreateCertificationDto } from '../../cv-content/dto/create-certification.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/v1/cv/certifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user', 'admin')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createCertificationDto: CreateCertificationDto) {
    return await this.certificationService.create(req.user.userId, createCertificationDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.certificationService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.certificationService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateCertificationDto: Partial<CreateCertificationDto>) {
    return await this.certificationService.update(id, req.user.userId, updateCertificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.certificationService.remove(id, req.user.userId);
    return { message: 'Certification deleted successfully' };
  }
}

