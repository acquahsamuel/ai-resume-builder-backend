import { Module } from '@nestjs/common';
import { CvDocumentService } from './cv-document.service';
import { CvDocumentController } from './cv-document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Entities
import { CvDocument, CvDocumentSchema } from './entities/cv-document.entity';
import { WorkExperience, WorkExperienceSchema } from './entities/work-experience.entity';
import { Education, EducationSchema } from './entities/education.entity';
import { Skill, SkillSchema } from './entities/skill.entity';
import { Certification, CertificationSchema } from './entities/certification.entity';
import { Project, ProjectSchema } from './entities/project.entity';
import { Language, LanguageSchema } from './entities/language.entity';
import { Volunteer, VolunteerSchema } from './entities/volunteer.entity';
import { Publication, PublicationSchema } from './entities/publication.entity';
import { Award, AwardSchema } from './entities/award.entity';
import { Reference, ReferenceSchema } from './entities/reference.entity';
import { Hobby, HobbySchema } from './entities/hobby.entity';
import { Patent, PatentSchema } from './entities/patent.entity';
import { Course, CourseSchema } from './entities/course.entity';
import { PersonalInfo, PersonalInfoSchema } from './entities/personal-info.entity';
import { ProfessionalSummary, ProfessionalSummarySchema } from './entities/professional-summary.entity';

// Services
import { WorkExperienceService } from './services/work-experience.service';
import { EducationService } from './services/education.service';
import { SkillService } from './services/skill.service';
import { CertificationService } from './services/certification.service';
import { ProjectService } from './services/project.service';
import { LanguageService } from './services/language.service';
import { VolunteerService } from './services/volunteer.service';
import { PublicationService } from './services/publication.service';
import { AwardService } from './services/award.service';
import { ReferenceService } from './services/reference.service';
import { HobbyService } from './services/hobby.service';
import { PatentService } from './services/patent.service';
import { CourseService } from './services/course.service';
import { PersonalInfoService } from './services/personal-info.service';
import { ProfessionalSummaryService } from './services/professional-summary.service';

// Controllers
import { WorkExperienceController } from '../cv-section/controllers/work-experience.controller';
import { EducationController } from '../cv-section/controllers/education.controller';
import { SkillController } from '../cv-section/controllers/skill.controller';
import { CertificationController } from '../cv-section/controllers/certification.controller';
import { ProjectController } from '../cv-section/controllers/project.controller';
import { LanguageController } from '../cv-section/controllers/language.controller';
import { VolunteerController } from '../cv-section/controllers/volunteer.controller';
import { PublicationController } from '../cv-section/controllers/publication.controller';
import { AwardController } from '../cv-section/controllers/award.controller';
import { ReferenceController } from '../cv-section/controllers/reference.controller';
import { HobbyController } from '../cv-section/controllers/hobby.controller';
import { PatentController } from '../cv-section/controllers/patent.controller';
import { CourseController } from '../cv-section/controllers/course.controller';
import { PersonalInfoController } from '../cv-section/controllers/personal-info.controller';
import { ProfessionalSummaryController } from '../cv-section/controllers/professional-summary.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvDocument.name, schema: CvDocumentSchema },
      { name: WorkExperience.name, schema: WorkExperienceSchema },
      { name: Education.name, schema: EducationSchema },
      { name: Skill.name, schema: SkillSchema },
      { name: Certification.name, schema: CertificationSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Language.name, schema: LanguageSchema },
      { name: Volunteer.name, schema: VolunteerSchema },
      { name: Publication.name, schema: PublicationSchema },
      { name: Award.name, schema: AwardSchema },
      { name: Reference.name, schema: ReferenceSchema },
      { name: Hobby.name, schema: HobbySchema },
      { name: Patent.name, schema: PatentSchema },
      { name: Course.name, schema: CourseSchema },
      { name: PersonalInfo.name, schema: PersonalInfoSchema },
      { name: ProfessionalSummary.name, schema: ProfessionalSummarySchema },
    ]),
    AuthModule,
  ],
  controllers: [
    CvDocumentController,
    WorkExperienceController,
    EducationController,
    SkillController,
    CertificationController,
    ProjectController,
    LanguageController,
    VolunteerController,
    PublicationController,
    AwardController,
    ReferenceController,
    HobbyController,
    PatentController,
    CourseController,
    PersonalInfoController,
    ProfessionalSummaryController,
  ],
  providers: [
    CvDocumentService,
    WorkExperienceService,
    EducationService,
    SkillService,
    CertificationService,
    ProjectService,
    LanguageService,
    VolunteerService,
    PublicationService,
    AwardService,
    ReferenceService,
    HobbyService,
    PatentService,
    CourseService,
    PersonalInfoService,
    ProfessionalSummaryService,
  ],
  exports: [
    CvDocumentService,
    WorkExperienceService,
    EducationService,
    SkillService,
    CertificationService,
    ProjectService,
    LanguageService,
    VolunteerService,
    PublicationService,
    AwardService,
    ReferenceService,
    HobbyService,
    PatentService,
    CourseService,
    PersonalInfoService,
    ProfessionalSummaryService,
  ],
})
export class CvContentModule { }
