import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patent, PatentDocument } from '../entities/patent.entity';
import { CreatePatentDto } from '../dto/create-patent.dto';

@Injectable()
export class PatentService {
  constructor(@InjectModel(Patent.name) private readonly patentModel: Model<PatentDocument>) {}

  async create(userId: string, createPatentDto: CreatePatentDto): Promise<Patent> {
    const patent = new this.patentModel({ ...createPatentDto, userId });
    return await patent.save();
  }

  async findAllByUser(userId: string): Promise<Patent[]> {
    return await this.patentModel.find({ userId }).sort({ order: 1, issueDate: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Patent> {
    const patent = await this.patentModel.findOne({ _id: id, userId }).exec();
    if (!patent) throw new NotFoundException('Patent not found');
    return patent;
  }

  async update(id: string, userId: string, updateData: Partial<CreatePatentDto>): Promise<Patent> {
    const patent = await this.patentModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!patent) throw new NotFoundException('Patent not found');
    return patent;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.patentModel.findByIdAndDelete(id).exec();
  }
}

