import { Module } from '@nestjs/common';
import { CvContentService } from './cv-content.service';
import { CvContentController } from './cv-content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CvContent, CvContentSchema } from './entities/cv-content.entity';
import { WorkExperience, WorkExperienceSchema } from './entities/work-experience.entity';
import { Education, EducationSchema } from './entities/education.entity';
import { Skill, SkillSchema } from './entities/skill.entity';
import { WorkExperienceService } from './services/work-experience.service';
import { WorkExperienceController } from './controllers/work-experience.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvContent.name, schema: CvContentSchema },
      { name: WorkExperience.name, schema: WorkExperienceSchema },
      { name: Education.name, schema: EducationSchema },
      { name: Skill.name, schema: SkillSchema }
    ]),
    AuthModule,
  ],
  controllers: [CvContentController, WorkExperienceController],
  providers: [CvContentService, WorkExperienceService],
  exports: [CvContentService, WorkExperienceService],
})
export class CvContentModule {}
