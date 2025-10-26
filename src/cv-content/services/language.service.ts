import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language, LanguageDocument } from '../entities/language.entity';
import { CreateLanguageDto } from '../dto/create-language.dto';

@Injectable()
export class LanguageService {
  constructor(@InjectModel(Language.name) private readonly languageModel: Model<LanguageDocument>) {}

  async create(userId: string, createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = new this.languageModel({ ...createLanguageDto, userId });
    return await language.save();
  }

  async findAllByUser(userId: string): Promise<Language[]> {
    return await this.languageModel.find({ userId }).sort({ order: 1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Language> {
    const language = await this.languageModel.findOne({ _id: id, userId }).exec();
    if (!language) throw new NotFoundException('Language not found');
    return language;
  }

  async update(id: string, userId: string, updateData: Partial<CreateLanguageDto>): Promise<Language> {
    const language = await this.languageModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!language) throw new NotFoundException('Language not found');
    return language;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.languageModel.findByIdAndDelete(id).exec();
  }
}

