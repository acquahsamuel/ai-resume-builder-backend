import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {}

  async create(userId: string, createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel({ ...createProjectDto, userId });
    return await project.save();
  }

  async findAllByUser(userId: string): Promise<Project[]> {
    return await this.projectModel.find({ userId }).sort({ order: 1, startDate: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findOne({ _id: id, userId }).exec();
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, userId: string, updateData: Partial<CreateProjectDto>): Promise<Project> {
    const project = await this.projectModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.projectModel.findByIdAndDelete(id).exec();
  }
}

