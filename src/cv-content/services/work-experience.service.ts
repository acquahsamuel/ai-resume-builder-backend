import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkExperience } from '../entities/work-experience.entity';
import { CreateWorkExperienceDto } from '../dto/create-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private readonly workExperienceRepository: Repository<WorkExperience>,
  ) {}

  async create(userId: number, createWorkExperienceDto: CreateWorkExperienceDto): Promise<WorkExperience> {
    const workExperience = this.workExperienceRepository.create({
      ...createWorkExperienceDto,
      userId,
    });

    return await this.workExperienceRepository.save(workExperience);
  }

  async findAllByUser(userId: number): Promise<WorkExperience[]> {
    return await this.workExperienceRepository.find({
      where: { userId },
      order: { sortOrder: 'ASC', startDate: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<WorkExperience> {
    const workExperience = await this.workExperienceRepository.findOne({
      where: { id, userId },
    });

    if (!workExperience) {
      throw new NotFoundException('Work experience not found');
    }

    return workExperience;
  }

  async update(id: number, userId: number, updateData: Partial<CreateWorkExperienceDto>): Promise<WorkExperience> {
    const workExperience = await this.findOne(id, userId);
    
    Object.assign(workExperience, updateData);
    return await this.workExperienceRepository.save(workExperience);
  }

  async remove(id: number, userId: number): Promise<void> {
    const workExperience = await this.findOne(id, userId);
    await this.workExperienceRepository.remove(workExperience);
  }

  async reorderExperiences(userId: number, experienceIds: number[]): Promise<void> {
    for (let i = 0; i < experienceIds.length; i++) {
      await this.workExperienceRepository.update(
        { id: experienceIds[i], userId },
        { sortOrder: i }
      );
    }
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