import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CvTemplate, CvTemplateSchema } from './entities/cv-template.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CvTemplate.name, schema: CvTemplateSchema }]),
    AuthModule,
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})

export class TemplateModule {}