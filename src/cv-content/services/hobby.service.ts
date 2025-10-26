import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hobby, HobbyDocument } from '../entities/hobby.entity';
import { CreateHobbyDto } from '../dto/create-hobby.dto';

@Injectable()
export class HobbyService {
  constructor(@InjectModel(Hobby.name) private readonly hobbyModel: Model<HobbyDocument>) {}

  async create(userId: string, createHobbyDto: CreateHobbyDto): Promise<Hobby> {
    const hobby = new this.hobbyModel({ ...createHobbyDto, userId });
    return await hobby.save();
  }

  async findAllByUser(userId: string): Promise<Hobby[]> {
    return await this.hobbyModel.find({ userId }).sort({ order: 1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Hobby> {
    const hobby = await this.hobbyModel.findOne({ _id: id, userId }).exec();
    if (!hobby) throw new NotFoundException('Hobby not found');
    return hobby;
  }

  async update(id: string, userId: string, updateData: Partial<CreateHobbyDto>): Promise<Hobby> {
    const hobby = await this.hobbyModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!hobby) throw new NotFoundException('Hobby not found');
    return hobby;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.hobbyModel.findByIdAndDelete(id).exec();
  }
}

