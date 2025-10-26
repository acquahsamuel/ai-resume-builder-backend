import { Controller, Get, Post, Body, Patch, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { PersonalInfoService } from '../services/personal-info.service';
import { CreatePersonalInfoDto } from '../dto/create-personal-info.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/personal-info')
@UseGuards(JwtAuthGuard)
export class PersonalInfoController {
  constructor(private readonly personalInfoService: PersonalInfoService) {}

  @Post()
  async createOrUpdate(@Request() req, @Body(ValidationPipe) createPersonalInfoDto: CreatePersonalInfoDto) {
    return await this.personalInfoService.createOrUpdate(req.user.userId, createPersonalInfoDto);
  }

  @Get()
  async findOne(@Request() req) {
    return await this.personalInfoService.findOne(req.user.userId);
  }

  @Patch()
  async update(@Request() req, @Body(ValidationPipe) updatePersonalInfoDto: Partial<CreatePersonalInfoDto>) {
    return await this.personalInfoService.update(req.user.userId, updatePersonalInfoDto);
  }
}

