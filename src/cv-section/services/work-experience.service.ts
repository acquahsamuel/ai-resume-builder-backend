import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkExperience, WorkExperienceDocument } from '../../cv-content/entities/work-experience.entity';
import { CreateWorkExperienceDto } from '../../cv-content/dto/create-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectModel(WorkExperience.name)
    private readonly workExperienceModel: Model<WorkExperienceDocument>,
  ) {}

  async create(userId: string, createWorkExperienceDto: CreateWorkExperienceDto): Promise<WorkExperience> {
    const workExperience = new this.workExperienceModel({
      ...createWorkExperienceDto,
      userId,
    });

    return await workExperience.save();
  }

  // async findAllByUser(userId: number): Promise<WorkExperience[]> {
  //   return await this.workExperienceModel.find({ userId })
  //     .sort({ sortOrder: 'ASC', startDate: 'DESC' })
  //     .exec();
  // }

  async findOne(id: string, userId: string): Promise<WorkExperience> {
    const workExperience = await this.workExperienceModel.findOne({
      _id: id,
      userId,
    }).exec();

    if (!workExperience) {
      throw new NotFoundException('Work experience not found');
    }

    return workExperience;
  }

  async update(id: string, userId: string, updateData: Partial<CreateWorkExperienceDto>): Promise<WorkExperience> {
    const workExperience = await this.workExperienceModel.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    ).exec();
    
    if (!workExperience) {
      throw new NotFoundException('Work experience not found');
    }

    return workExperience;
  }

  async remove(id: string, userId: string): Promise<void> {
    const workExperience = await this.findOne(id, userId);
    await this.workExperienceModel.findByIdAndDelete(id).exec();
  }

  async reorderExperiences(userId: string, experienceIds: string[]): Promise<void> {
    const updates = experienceIds.map((id, index) => 
      this.workExperienceModel.updateOne(
        { _id: id, userId },
        { order: index }
      ).exec()
    );
    await Promise.all(updates);
  }

  async generateJobDescription(jobTitle: string, company: string): Promise<string[]> {
    // TODO: Implement AI-powered job description generation
    // This is a placeholder that returns sample descriptions
    const sampleDescriptions = [
      `Managed and executed projects related to ${jobTitle} responsibilities`,
      `Collaborated with cross-functional teams to deliver high-quality solutions`,
      `Implemented best practices and improved efficiency in daily operations`,
      `Contributed to team success and company growth initiatives`,
    ];

    return sampleDescriptions;
  }
}