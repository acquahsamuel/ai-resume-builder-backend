import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvContentService } from './cv-content.service';
import { CreateCvContentDto } from './dto/create-cv-content.dto';
import { UpdateCvContentDto } from './dto/update-cv-content.dto';

@Controller('api/v1/cv-content')
export class CvContentController {
  constructor(private readonly cvContentService: CvContentService) { }

  @Post()
  create(@Body() createCvContentDto: CreateCvContentDto) {
    return this.cvContentService.createCV(createCvContentDto);
  }

  @Get()
  findAll() {
    return this.cvContentService.findAllCV();
  }

  @Get(':id')
  findCVById(@Param('id') id: string) {
    return this.cvContentService.findCV(id);
  }

  @Patch(':id')
  updateCV(@Param('id') id: string, @Body() updateCvContentDto: UpdateCvContentDto) {
    return this.cvContentService.updateCV(id, updateCvContentDto);
  }

  @Delete(':id')
  deleteCV(@Param('id') id: string) {
    return this.cvContentService.deleteCV(id);
  }


  @Get('my-cvs')
  getAllUserCV() {
    return this.cvContentService.getAllUserCV();
  }


}
