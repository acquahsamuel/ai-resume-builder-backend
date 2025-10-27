import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CvTemplate, CvTemplateSchema } from './entities/cv-template.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CvTemplate.name, schema: CvTemplateSchema }])
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})

export class TemplateModule {}