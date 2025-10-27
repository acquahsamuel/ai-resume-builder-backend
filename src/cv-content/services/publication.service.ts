import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication, PublicationDocument } from '../entities/publication.entity';
import { CreatePublicationDto } from '../dto/create-publication.dto';

@Injectable()
export class PublicationService {
  constructor(@InjectModel(Publication.name) private readonly publicationModel: Model<PublicationDocument>) {}

  async create(userId: string, createPublicationDto: CreatePublicationDto): Promise<Publication> {
    const publication = new this.publicationModel({ ...createPublicationDto, userId });
    return await publication.save();
  }

  async findAllByUser(userId: string): Promise<Publication[]> {
    return await this.publicationModel.find({ userId }).sort({ order: 1, publicationDate: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Publication> {
    const publication = await this.publicationModel.findOne({ _id: id, userId }).exec();
    if (!publication) throw new NotFoundException('Publication not found');
    return publication;
  }

  async update(id: string, userId: string, updateData: Partial<CreatePublicationDto>): Promise<Publication> {
    const publication = await this.publicationModel.findOneAndUpdate({ _id: id, userId }, updateData, { new: true }).exec();
    if (!publication) throw new NotFoundException('Publication not found');
    return publication;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.publicationModel.findByIdAndDelete(id).exec();
  }
}

