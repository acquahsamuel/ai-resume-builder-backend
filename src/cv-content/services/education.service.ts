import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education, EducationDocument } from '../entities/education.entity';
import { CreateEducationDto } from '../dto/create-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education.name)
    private readonly educationModel: Model<EducationDocument>,
  ) {}

  async create(userId: string, createEducationDto: CreateEducationDto): Promise<Education> {
    const education = new this.educationModel({
      ...createEducationDto,
      userId,
    });

    return await education.save();
  }

  async findAllByUser(userId: string): Promise<Education[]> {
    return await this.educationModel.find({ userId })
      .sort({ order: 1, startDate: -1 })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Education> {
    const education = await this.educationModel.findOne({
      _id: id,
      userId,
    }).exec();

    if (!education) {
      throw new NotFoundException('Education not found');
    }

    return education;
  }

  async update(id: string, userId: string, updateData: Partial<CreateEducationDto>): Promise<Education> {
    const education = await this.educationModel.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    ).exec();
    
    if (!education) {
      throw new NotFoundException('Education not found');
    }

    return education;
  }

  async remove(id: string, userId: string): Promise<void> {
    const education = await this.findOne(id, userId);
    await this.educationModel.findByIdAndDelete(id).exec();
  }

  async reorder(userId: string, educationIds: string[]): Promise<void> {
    const updates = educationIds.map((id, index) => 
      this.educationModel.updateOne(
        { _id: id, userId },
        { order: index }
      ).exec()
    );
    await Promise.all(updates);
  }
}

