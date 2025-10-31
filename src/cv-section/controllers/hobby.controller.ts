import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { HobbyService } from '../../cv-content/services/hobby.service';
import { CreateHobbyDto } from '../../cv-content/dto/create-hobby.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/v1/cv/hobbies')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user', 'admin')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createHobbyDto: CreateHobbyDto) {
    return await this.hobbyService.create(req.user.userId, createHobbyDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.hobbyService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.hobbyService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateHobbyDto: Partial<CreateHobbyDto>) {
    return await this.hobbyService.update(id, req.user.userId, updateHobbyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.hobbyService.remove(id, req.user.userId);
    return { message: 'Hobby deleted successfully' };
  }
}

