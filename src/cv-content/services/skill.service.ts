import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../entities/skill.entity';
import { CreateSkillDto } from '../dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name)
    private readonly skillModel: Model<SkillDocument>,
  ) {}

  async create(userId: string, createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = new this.skillModel({
      ...createSkillDto,
      userId,
    });

    return await skill.save();
  }

  async findAllByUser(userId: string): Promise<Skill[]> {
    return await this.skillModel.find({ userId })
      .sort({ order: 1, name: 1 })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Skill> {
    const skill = await this.skillModel.findOne({
      _id: id,
      userId,
    }).exec();

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return skill;
  }

  async update(id: string, userId: string, updateData: Partial<CreateSkillDto>): Promise<Skill> {
    const skill = await this.skillModel.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    ).exec();
    
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return skill;
  }

  async remove(id: string, userId: string): Promise<void> {
    const skill = await this.findOne(id, userId);
    await this.skillModel.findByIdAndDelete(id).exec();
  }

  async reorder(userId: string, skillIds: string[]): Promise<void> {
    const updates = skillIds.map((id, index) => 
      this.skillModel.updateOne(
        { _id: id, userId },
        { order: index }
      ).exec()
    );
    await Promise.all(updates);
  }
}

