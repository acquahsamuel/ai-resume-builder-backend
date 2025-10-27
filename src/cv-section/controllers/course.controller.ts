import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { CourseService } from '../../cv-content/services/course.service';
import { CreateCourseDto } from '../../cv-content/dto/create-course.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/v1/cv/courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Request() req, @Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return await this.courseService.create(req.user.userId, createCourseDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.courseService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return await this.courseService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Request() req, @Body(ValidationPipe) updateCourseDto: Partial<CreateCourseDto>) {
    return await this.courseService.update(id, req.user.userId, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.courseService.remove(id, req.user.userId);
    return { message: 'Course deleted successfully' };
  }
}

