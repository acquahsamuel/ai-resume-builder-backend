import { Injectable } from '@nestjs/common';
import { CreateCvContentDto } from './dto/create-cv-content.dto';
import { UpdateCvContentDto } from './dto/update-cv-content.dto';
import { CvContent, CvContentDocument } from './entities/cv-content.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CvContentService {

  constructor(
    @InjectModel(CvContent.name)
    private readonly cvContentModel: Model<CvContentDocument>,
  ) {}


  async createCV(createCvContentDto: CreateCvContentDto) {
    const template = new this.cvContentModel(createCvContentDto);
    return template.save();
  }


  async findAllCV() : Promise<CvContent[]> {
    return await this.cvContentModel.find().exec();
  }

  async findCV(id: string) : Promise<CvContent> {
    return await this.cvContentModel.findById(id).exec();
  }

  async updateCV(id: string, updateCvContentDto: UpdateCvContentDto) {
    return await this.cvContentModel.findByIdAndUpdate(id, updateCvContentDto, { new: true }).exec();
  }

  async deleteCV(id: string) {
     return await this.cvContentModel.findByIdAndDelete(id).exec();
  }


 // Get user cv by token
  async getAllUserCV(){
    return;
  }

}
