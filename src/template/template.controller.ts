import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('api/v1/template')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user', 'admin')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) { }

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  // @Post()
  // @Roles('admin') // Only admin can create templates
  // create(@Body() createTemplateDto: CreateTemplateDto) {
  //   return this.templateService.create(createTemplateDto);
  // }

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin') 
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @Roles('admin') 
  remove(@Param('id') id: string) {
    return this.templateService.remove(id);
  }
}
