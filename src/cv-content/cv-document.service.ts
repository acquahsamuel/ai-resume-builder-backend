import { Injectable } from '@nestjs/common';
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
  ) {}

  async createCV(createCvDocumentDto: CreateCvDocumentDto) {
    const document = new this.cvDocumentModel(createCvDocumentDto);
    return document.save();
  }

  async findAllCV() : Promise<CvDocument[]> {
    return await this.cvDocumentModel.find().exec();
  }

  async findCV(id: string) : Promise<CvDocument> {
    return await this.cvDocumentModel.findById(id).exec();
  }

  async updateCV(id: string, updateCvDocumentDto: UpdateCvDocumentDto) {
    return await this.cvDocumentModel.findByIdAndUpdate(id, updateCvDocumentDto, { new: true }).exec();
  }

  async deleteCV(id: string) {
     return await this.cvDocumentModel.findByIdAndDelete(id).exec();
  }

  async getAllUserCV() {
    return await this.cvDocumentModel.find().exec();
  }

}
