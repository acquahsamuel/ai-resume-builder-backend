import { Module } from '@nestjs/common';
import { CvContentService } from './cv-content.service';
import { CvContentController } from './cv-content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvContent } from './entities/cv-content.entity';
import { WorkExperience } from './entities/work-experience.entity';
import { Education } from './entities/education.entity';
import { Skill } from './entities/skill.entity';
import { WorkExperienceService } from './services/work-experience.service';
import { WorkExperienceController } from './controllers/work-experience.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvContent, WorkExperience, Education, Skill]),
    AuthModule,
  ],
  controllers: [CvContentController, WorkExperienceController],
  providers: [CvContentService, WorkExperienceService],
  exports: [CvContentService, WorkExperienceService],
})
export class CvContentModule {}
