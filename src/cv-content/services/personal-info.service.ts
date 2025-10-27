import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonalInfo, PersonalInfoDocument } from '../entities/personal-info.entity';
import { CreatePersonalInfoDto } from '../dto/create-personal-info.dto';

@Injectable()
export class PersonalInfoService {
  constructor(
    @InjectModel(PersonalInfo.name) 
    private readonly personalInfoModel: Model<PersonalInfoDocument>
  ) {}

  async createOrUpdate(userId: string, createPersonalInfoDto: CreatePersonalInfoDto): Promise<PersonalInfo> {
    return await this.personalInfoModel.findOneAndUpdate(
      { userId },
      { ...createPersonalInfoDto, userId },
      { new: true, upsert: true }
    ).exec();
  }

  async findOne(userId: string): Promise<PersonalInfo> {
    const personalInfo = await this.personalInfoModel.findOne({ userId }).exec();
    if (!personalInfo) throw new NotFoundException('Personal information not found');
    return personalInfo;
  }

  async update(userId: string, updateData: Partial<CreatePersonalInfoDto>): Promise<PersonalInfo> {
    const personalInfo = await this.personalInfoModel.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    ).exec();
    if (!personalInfo) throw new NotFoundException('Personal information not found');
    return personalInfo;
  }
}

