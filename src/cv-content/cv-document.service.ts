import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDocumentDto } from './dto/create-cv-document.dto';
import { UpdateCvDocumentDto } from './dto/update-cv-document.dto';
import { CvDocument, CvDocumentDocument } from './entities/cv-document.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CvDocumentService {

  constructor(
    @InjectModel(CvDocument.name)
    private readonly cvDocumentModel: Model<CvDocumentDocument>,
  ) { }

  async createCV(createCvDocumentDto: CreateCvDocumentDto) {
    const document = new this.cvDocumentModel(createCvDocumentDto);
    return document.save();
  }

  async findAllCV(userId: string): Promise<CvDocument[]> {
    return await this.cvDocumentModel.find({ userId }).exec();
  }

  async findCV(id: string, userId: string): Promise<CvDocument> {
    const cv = await this.cvDocumentModel.findOne({ _id: id, userId }).exec();
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    return cv;
  }

  async updateCV(id: string, userId: string, updateCvDocumentDto: UpdateCvDocumentDto) {
    const cv = await this.cvDocumentModel.findOneAndUpdate(
      { _id: id, userId },
      updateCvDocumentDto,
      { new: true }
    ).exec();
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    return cv;
  }

  async deleteCV(id: string, userId: string) {
    const result = await this.cvDocumentModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!result) {
      throw new NotFoundException('CV not found');
    }
    return result;
  }

  async getAllUserCV(userId: string): Promise<CvDocument[]> {
    return await this.cvDocumentModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
