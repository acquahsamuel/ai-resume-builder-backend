import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Award, AwardDocument } from '../entities/award.entity';
import { CreateAwardDto } from '../dto/create-award.dto';

@Injectable()
export class AwardService {
  constructor(@InjectModel(Award.name) private readonly awardModel: Model<AwardDocument>) {}

  async create(userId: string, createAwardDto: CreateAwardDto): Promise<Award> {
    const award = new this.awardModel({ ...createAwardDto, userId });
    return await award.save();
  }

  async findAllByUser(userId: string): Promise<Award[]> {
    return await this.awardModel.find({ userId }).sort({ order: 1, date: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Award> {
    const award = await this.awardModel.findOne({ _id: id, userId }).exec();
    if (!award) throw new NotFoundException('Award not found');
    return award;
  }

  async update(id: string, userId: string, updateData: Partial<CreateAwardDto>): Promise<Award> {
    const award = await this.awardModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!award) throw new NotFoundException('Award not found');
    return award;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.awardModel.findByIdAndDelete(id).exec();
  }
}

