import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createProjectDto: CreateProjectDto) {
    return await this.projectService.create(req.user.userId, createProjectDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.projectService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.projectService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateProjectDto: Partial<CreateProjectDto>) {
    return await this.projectService.update(id, req.user.userId, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.projectService.remove(id, req.user.userId);
    return { message: 'Project deleted successfully' };
  }
}

