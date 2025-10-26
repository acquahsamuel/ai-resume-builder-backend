import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { SkillService } from '../services/skill.service';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/skills')
@UseGuards(JwtAuthGuard)
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createSkillDto: CreateSkillDto) {
    return await this.skillService.create(req.user.userId, createSkillDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.skillService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.skillService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateSkillDto: Partial<CreateSkillDto>) {
    return await this.skillService.update(id, req.user.userId, updateSkillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.skillService.remove(id, req.user.userId);
    return { message: 'Skill deleted successfully' };
  }

  @Post('reorder')
  async reorder(@Request() req, @Body() body: { skillIds: string[] }) {
    await this.skillService.reorder(req.user.userId, body.skillIds);
    return { message: 'Skills reordered successfully' };
  }
}

