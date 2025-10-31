import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AwardService } from '../../cv-content/services/award.service';
import { CreateAwardDto } from '../../cv-content/dto/create-award.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/v1/cv/awards')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user', 'admin')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createAwardDto: CreateAwardDto) {
    return await this.awardService.create(req.user.userId, createAwardDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.awardService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.awardService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateAwardDto: Partial<CreateAwardDto>) {
    return await this.awardService.update(id, req.user.userId, updateAwardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.awardService.remove(id, req.user.userId);
    return { message: 'Award deleted successfully' };
  }
}

