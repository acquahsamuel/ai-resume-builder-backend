import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfessionalSummary, ProfessionalSummaryDocument } from '../entities/professional-summary.entity';
import { CreateProfessionalSummaryDto } from '../dto/create-professional-summary.dto';

@Injectable()
export class ProfessionalSummaryService {
  constructor(
    @InjectModel(ProfessionalSummary.name) 
    private readonly professionalSummaryModel: Model<ProfessionalSummaryDocument>
  ) {}

  async createOrUpdate(userId: string, createProfessionalSummaryDto: CreateProfessionalSummaryDto): Promise<ProfessionalSummary> {
    return await this.professionalSummaryModel.findOneAndUpdate(
      { userId },
      { ...createProfessionalSummaryDto, userId },
      { new: true, upsert: true }
    ).exec();
  }

  async findOne(userId: string): Promise<ProfessionalSummary> {
    const summary = await this.professionalSummaryModel.findOne({ userId }).exec();
    if (!summary) throw new NotFoundException('Professional summary not found');
    return summary;
  }

  async update(userId: string, updateData: Partial<CreateProfessionalSummaryDto>): Promise<ProfessionalSummary> {
    const summary = await this.professionalSummaryModel.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    ).exec();
    if (!summary) throw new NotFoundException('Professional summary not found');
    return summary;
  }
}

