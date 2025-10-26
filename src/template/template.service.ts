import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './entities/template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
  ) {}

  
  /**
   * Create a new template and save it to the database.
   * @param createTemplateDto The template data to create.
   * @returns The created template.
   */
  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const template = new this.templateModel(createTemplateDto);
    return template.save();
  }

  /**
   * Retrieve all templates from the database.
   * @returns An array of templates.
   */
  async findAll(): Promise<Template[]> {
    return await this.templateModel.find().exec();
  }

  /**
   * Find a template by ID.
   * @param id The ID of the template to find.
   * @returns The template.
   */
  async findOne(id: string): Promise<Template> {
    return await this.templateModel.findById(id).exec();
  }

  /**
   * Update a template by its ID.
   * @param id The ID of the template to update.
   * @param updateTemplateDto The template data to update.
   * @returns The updated template.
   */
  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    return await this.templateModel.findByIdAndUpdate(id, updateTemplateDto, { new: true }).exec();
  }

  /**
   * Remove a template by its ID.
   * @param id The ID of the template to remove.
   */
  async remove(id: string): Promise<void> {
    await this.templateModel.findByIdAndDelete(id).exec();
  }
}
