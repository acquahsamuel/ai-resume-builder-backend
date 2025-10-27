import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reference, ReferenceDocument } from '../entities/reference.entity';
import { CreateReferenceDto } from '../dto/create-reference.dto';

@Injectable()
export class ReferenceService {
  constructor(@InjectModel(Reference.name) private readonly referenceModel: Model<ReferenceDocument>) {}

  async create(userId: string, createReferenceDto: CreateReferenceDto): Promise<Reference> {
    const reference = new this.referenceModel({ ...createReferenceDto, userId });
    return await reference.save();
  }

  async findAllByUser(userId: string): Promise<Reference[]> {
    return await this.referenceModel.find({ userId }).sort({ order: 1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Reference> {
    const reference = await this.referenceModel.findOne({ _id: id, userId }).exec();
    if (!reference) throw new NotFoundException('Reference not found');
    return reference;
  }

  async update(id: string, userId: string, updateData: Partial<CreateReferenceDto>): Promise<Reference> {
    const reference = await this.referenceModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!reference) throw new NotFoundException('Reference not found');
    return reference;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.referenceModel.findByIdAndDelete(id).exec();
  }
}

