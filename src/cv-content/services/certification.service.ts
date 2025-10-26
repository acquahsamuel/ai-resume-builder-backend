import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Certification, CertificationDocument } from '../entities/certification.entity';
import { CreateCertificationDto } from '../dto/create-certification.dto';

@Injectable()
export class CertificationService {
  constructor(
    @InjectModel(Certification.name)
    private readonly certificationModel: Model<CertificationDocument>,
  ) {}

  async create(userId: string, createCertificationDto: CreateCertificationDto): Promise<Certification> {
    const certification = new this.certificationModel({
      ...createCertificationDto,
      userId,
    });
    return await certification.save();
  }

  async findAllByUser(userId: string): Promise<Certification[]> {
    return await this.certificationModel.find({ userId }).sort({ order: 1, issueDate: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Certification> {
    const certification = await this.certificationModel.findOne({ _id: id, userId }).exec();
    if (!certification) throw new NotFoundException('Certification not found');
    return certification;
  }

  async update(id: string, userId: string, updateData: Partial<CreateCertificationDto>): Promise<Certification> {
    const certification = await this.certificationModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!certification) throw new NotFoundException('Certification not found');
    return certification;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.certificationModel.findByIdAndDelete(id).exec();
  }
}

