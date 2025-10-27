import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volunteer, VolunteerDocument } from '../entities/volunteer.entity';
import { CreateVolunteerDto } from '../dto/create-volunteer.dto';

@Injectable()
export class VolunteerService {
  constructor(@InjectModel(Volunteer.name) private readonly volunteerModel: Model<VolunteerDocument>) {}

  async create(userId: string, createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
    const volunteer = new this.volunteerModel({ ...createVolunteerDto, userId });
    return await volunteer.save();
  }

  async findAllByUser(userId: string): Promise<Volunteer[]> {
    return await this.volunteerModel.find({ userId }).sort({ order: 1, startDate: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Volunteer> {
    const volunteer = await this.volunteerModel.findOne({ _id: id, userId }).exec();
    if (!volunteer) throw new NotFoundException('Volunteer experience not found');
    return volunteer;
  }

  async update(id: string, userId: string, updateData: Partial<CreateVolunteerDto>): Promise<Volunteer> {
    const volunteer = await this.volunteerModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!volunteer) throw new NotFoundException('Volunteer experience not found');
    return volunteer;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.volunteerModel.findByIdAndDelete(id).exec();
  }
}

