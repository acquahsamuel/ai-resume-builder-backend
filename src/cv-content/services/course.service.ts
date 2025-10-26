import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../entities/course.entity';
import { CreateCourseDto } from '../dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>) {}

  async create(userId: string, createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel({ ...createCourseDto, userId });
    return await course.save();
  }

  async findAllByUser(userId: string): Promise<Course[]> {
    return await this.courseModel.find({ userId }).sort({ order: 1, completionDate: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Course> {
    const course = await this.courseModel.findOne({ _id: id, userId }).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, userId: string, updateData: Partial<CreateCourseDto>): Promise<Course> {
    const course = await this.courseModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.courseModel.findByIdAndDelete(id).exec();
  }
}

