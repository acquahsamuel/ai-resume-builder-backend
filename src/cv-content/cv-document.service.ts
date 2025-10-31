import { Injectable, NotFoundException } from '@nestjs/common';
import { CvDocument, CvDocumentDocument } from './entities/cv-document.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CvTemplate, CvTemplateDocument } from '../template/entities/cv-template.entity';
import { PersonalInfoService } from './services/personal-info.service';
import { ProfessionalSummaryService } from './services/professional-summary.service';
import { WorkExperienceService } from './services/work-experience.service';
import { EducationService } from './services/education.service';
import { SkillService } from './services/skill.service';
import { CertificationService } from './services/certification.service';
import { CourseService } from './services/course.service';
import { AwardService } from './services/award.service';
import { VolunteerService } from './services/volunteer.service';
import { PublicationService } from './services/publication.service';
import { PatentService } from './services/patent.service';
import { ProjectService } from './services/project.service';
import { LanguageService } from './services/language.service';
import { HobbyService } from './services/hobby.service';
import { ReferenceService } from './services/reference.service';

@Injectable()
export class CvDocumentService {

  constructor(
    @InjectModel(CvDocument.name)
    private readonly cvDocumentModel: Model<CvDocumentDocument>,
    @InjectModel(CvTemplate.name)
    private readonly templateModel: Model<CvTemplateDocument>,
    private readonly personalInfoService: PersonalInfoService,
    private readonly professionalSummaryService: ProfessionalSummaryService,
    private readonly workExperienceService: WorkExperienceService,
    private readonly educationService: EducationService,
    private readonly skillService: SkillService,
    private readonly certificationService: CertificationService,
    private readonly courseService: CourseService,
    private readonly awardService: AwardService,
    private readonly volunteerService: VolunteerService,
    private readonly publicationService: PublicationService,
    private readonly patentService: PatentService,
    private readonly projectService: ProjectService,
    private readonly languageService: LanguageService,
    private readonly hobbyService: HobbyService,
    private readonly referenceService: ReferenceService,
  ) { }

  async findCV(id: string, userId: string): Promise<Partial<CvDocument>> {
    const cv = await this.cvDocumentModel.findOne({ _id: id, userId }).exec();
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    // Return generated CV with all sections
    return this.generateCV(userId, id);
  }

  async createCV(
    userId: string,
    templateId: string,
    title?: string,
    description?: string,
    enabledSections?: string[],
    sectionOrder?: string[],
    isDefault?: boolean,
  ): Promise<Partial<CvDocument>> {
    // If setting as default, unset all other defaults for this user
    if (isDefault) {
      await this.cvDocumentModel.updateMany(
        { userId },
        { $set: { isDefault: false } }
      ).exec();
    }

    // Create new CV document
    const newCV = new this.cvDocumentModel({
      userId,
      templateId,
      title: title || 'My Resume',
      description: description || '',
      enabledSections: enabledSections || [],
      sectionOrder: sectionOrder || [],
      isDefault: isDefault || false,
    });

    const savedCV = await newCV.save();

    // Return generated CV with all sections populated
    return this.generateCV(userId, savedCV._id.toString());
  }

  async deleteCV(id: string, userId: string) {
    const result = await this.cvDocumentModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!result) {
      throw new NotFoundException('CV not found');
    }
    return result;
  }

  async getAllUserCV(userId: string): Promise<Partial<CvDocument>[]> {
    const cvs = await this.cvDocumentModel.find({ userId }).sort({ createdAt: -1 }).exec();
    // Generate each CV to include all sections
    const generatedCVs = await Promise.all(
      cvs.map(cv => this.generateCV(userId, cv._id.toString()))
    );
    return generatedCVs;
  }

  async generateCV(userId: string, cvId?: string): Promise<Partial<CvDocument>> {
    try {
      // If cvId is provided, get the specific CV to check its configuration
      let cvConfig: CvDocument | null = null;
      if (cvId) {
        cvConfig = await this.cvDocumentModel.findOne({ _id: cvId, userId }).exec();
        if (!cvConfig) {
          throw new NotFoundException('CV not found');
        }
      } else {
        // If no cvId, check if user has a default CV, if not create one
        cvConfig = await this.cvDocumentModel.findOne({ userId, isDefault: true }).exec();
        if (!cvConfig) {
          // Check if user has any CVs at all
          const existingCVs = await this.cvDocumentModel.find({ userId }).exec();
          if (existingCVs.length === 0) {
            // Get the first available template or create with a default
            const defaultTemplate = await this.templateModel.findOne().exec();
            const templateId = defaultTemplate?._id?.toString() || 'default-template';

            // Create a default CV
            const newCV = new this.cvDocumentModel({
              userId,
              templateId,
              title: 'My Resume',
              isDefault: true,
            });
            cvConfig = await newCV.save();
          } else {
            // User has CVs but no default, use the first one or set the first as default
            cvConfig = existingCVs[0];
            if (!cvConfig.isDefault) {
              const updatedCV = await this.cvDocumentModel.findOneAndUpdate(
                { _id: (cvConfig as any)._id },
                { $set: { isDefault: true } },
                { new: true }
              ).exec();
              if (updatedCV) {
                cvConfig = updatedCV;
              }
            }
          }
        }
      }

      // Fetch all sections in parallel using Promise.allSettled
      // Promise.allSettled returns an array of objects with:
      // - status: 'fulfilled' (success) or 'rejected' (failed)
      // - value: the actual data (if fulfilled)
      // - reason: the error (if rejected)
      // This allows us to handle errors gracefully - if one section fails, others still work
      const [
        personalInfo,
        professionalSummary,
        workExperiences,
        educations,
        skills,
        certifications,
        courses,
        awards,
        volunteer,
        publications,
        patents,
        projects,
        languages,
        hobbies,
        references,
      ] = await Promise.allSettled([
        this.personalInfoService.findOne(userId).catch(() => null),
        this.professionalSummaryService.findOne(userId).catch(() => null),
        this.workExperienceService.findAllByUser(userId).catch(() => []),
        this.educationService.findAllByUser(userId).catch(() => []),
        this.skillService.findAllByUser(userId).catch(() => []),
        this.certificationService.findAllByUser(userId).catch(() => []),
        this.courseService.findAllByUser(userId).catch(() => []),
        this.awardService.findAllByUser(userId).catch(() => []),
        this.volunteerService.findAllByUser(userId).catch(() => []),
        this.publicationService.findAllByUser(userId).catch(() => []),
        this.patentService.findAllByUser(userId).catch(() => []),
        this.projectService.findAllByUser(userId).catch(() => []),
        this.languageService.findAllByUser(userId).catch(() => []),
        this.hobbyService.findAllByUser(userId).catch(() => []),
        this.referenceService.findAllByUser(userId).catch(() => []),
      ]);

      // Map PersonalInfo to HeaderProfileInfo
      // Check: personalInfo.status === 'fulfilled' means the promise succeeded
      // AND personalInfo.value exists (not null) means we actually got data
      const headerProfileInfo = personalInfo.status === 'fulfilled' && personalInfo.value ? {
        firstName: personalInfo.value.firstName,
        lastName: personalInfo.value.lastName,
        otherName: personalInfo.value.otherName,
        fullName: personalInfo.value.otherName
          ? `${personalInfo.value.firstName} ${personalInfo.value.otherName} ${personalInfo.value.lastName}`
          : `${personalInfo.value.firstName} ${personalInfo.value.lastName}`,
        title: personalInfo.value.title,
        email: personalInfo.value.email,
        phone: personalInfo.value.phone,
        address: personalInfo.value.address,
        city: personalInfo.value.city,
        state: personalInfo.value.state,
        country: personalInfo.value.country,
        zipCode: personalInfo.value.zipCode,
        postalCode: personalInfo.value.zipCode,
        dateOfBirth: personalInfo.value.dateOfBirth?.toISOString().split('T')[0],
        nationality: personalInfo.value.nationality,
        profilePhoto: personalInfo.value.profilePhoto,
        socialMedia: personalInfo.value.socialMedia || {},
      } : undefined;

      // Map ProfessionalSummary
      const professionalSummaryData = professionalSummary.status === 'fulfilled' && professionalSummary.value ? {
        summary: professionalSummary.value.summary || professionalSummary.value.content,
        summaryType: professionalSummary.value.summaryType,
        keywords: professionalSummary.value.keywords,
      } : undefined;

      // Map WorkExperience to Experience
      const experience = workExperiences.status === 'fulfilled' && workExperiences.value
        ? workExperiences.value.map(exp => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          location: exp.location,
          employmentType: exp.employmentType,
          startDate: exp.startDate.toISOString().split('T')[0],
          endDate: exp.endDate?.toISOString().split('T')[0],
          isCurrent: exp.isCurrent,
          description: exp.description,
          responsibilities: exp.responsibilities,
          achievements: exp.achievements,
          technologies: exp.technologies,
        }))
        : undefined;

      // Map Education
      const education = educations.status === 'fulfilled' && educations.value
        ? educations.value.map(edu => ({
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          location: edu.location,
          startDate: edu.startDate.toISOString().split('T')[0],
          endDate: edu.endDate?.toISOString().split('T')[0],
          isOngoing: edu.isOngoing,
          gpa: edu.gpa,
          gpaScale: edu.gpaScale,
          honors: edu.honors,
          relevantCoursework: edu.relevantCoursework,
          activities: edu.activities,
          thesis: edu.thesis,
        }))
        : undefined;

      // Map Skills
      const skillsData = skills.status === 'fulfilled' && skills.value
        ? skills.value.map(skill => ({
          name: skill.name,
          category: skill.category,
          proficiencyLevel: skill.proficiencyLevel,
          proficiencyLabel: skill.proficiencyLabel,
          yearsOfExperience: skill.yearsOfExperience,
          certifications: skill.certifications,
          isHighlighted: skill.isHighlighted,
        }))
        : undefined;

      // Map Certifications
      const certificationsData = certifications.status === 'fulfilled' && certifications.value
        ? certifications.value.map(cert => ({
          name: cert.name,
          issuingOrganization: cert.issuingOrganization,
          issueDate: cert.issueDate.toISOString().split('T')[0],
          expiryDate: cert.expiryDate?.toISOString().split('T')[0],
          doesNotExpire: cert.doesNotExpire,
          credentialId: cert.credentialId,
          credentialUrl: cert.credentialUrl,
          description: cert.description,
          logo: cert.logo,
        }))
        : undefined;

      // Map Courses
      const coursesData = courses.status === 'fulfilled' && courses.value
        ? courses.value.map(course => ({
          name: course.name,
          provider: course.provider,
          completionDate: course.completionDate.toISOString().split('T')[0],
          certificateUrl: course.certificateUrl,
          hours: course.hours,
          skills: course.skills,
        }))
        : undefined;

      // Map Awards
      const awardsData = awards.status === 'fulfilled' && awards.value
        ? awards.value.map(award => ({
          title: award.title,
          issuer: award.issuer,
          date: award.date.toISOString().split('T')[0],
          description: award.description,
        }))
        : undefined;

      // Map Volunteer
      const volunteerData = volunteer.status === 'fulfilled' && volunteer.value
        ? volunteer.value.map(vol => ({
          role: vol.role,
          organization: vol.organization,
          location: vol.location,
          cause: vol.cause,
          startDate: vol.startDate.toISOString().split('T')[0],
          endDate: vol.endDate?.toISOString().split('T')[0],
          isOngoing: vol.isOngoing,
          description: vol.description,
          achievements: vol.achievements,
          hoursPerWeek: vol.hoursPerWeek,
        }))
        : undefined;

      // Map Publications
      const publicationsData = publications.status === 'fulfilled' && publications.value
        ? publications.value.map(pub => ({
          title: pub.title,
          authors: pub.authors,
          publication: pub.publication,
          publisher: pub.publisher,
          publicationDate: pub.publicationDate.toISOString().split('T')[0],
          doi: pub.doi,
          url: pub.url,
          description: pub.description,
          citations: pub.citations,
        }))
        : undefined;

      // Map Patents
      const patentsData = patents.status === 'fulfilled' && patents.value
        ? patents.value.map(pat => ({
          title: pat.title,
          patentNumber: pat.patentNumber,
          issueDate: pat.issueDate.toISOString().split('T')[0],
          inventors: pat.inventors,
          description: pat.description,
          url: pat.url,
        }))
        : undefined;

      // Map Projects
      const projectsData = projects.status === 'fulfilled' && projects.value
        ? projects.value.map(proj => ({
          name: proj.name,
          role: proj.role,
          description: proj.description,
          startDate: proj.startDate?.toISOString().split('T')[0],
          endDate: proj.endDate?.toISOString().split('T')[0],
          isOngoing: proj.isOngoing,
          projectUrl: proj.projectUrl,
          liveUrl: proj.liveUrl,
          technologies: proj.technologies,
          achievements: proj.achievements,
          teamSize: proj.teamSize,
          images: proj.images,
        }))
        : undefined;

      // Map Languages
      const languagesData = languages.status === 'fulfilled' && languages.value
        ? languages.value.map(lang => ({
          language: lang.language,
          proficiency: lang.proficiency,
          proficiencyLevel: lang.proficiencyLevel,
          canRead: lang.canRead,
          canWrite: lang.canWrite,
          canSpeak: lang.canSpeak,
          certifications: lang.certifications,
        }))
        : undefined;

      // Map Hobbies
      const hobbiesData = hobbies.status === 'fulfilled' && hobbies.value
        ? hobbies.value.map(hobby => ({
          name: hobby.name,
          description: hobby.description,
          relevance: hobby.relevance,
        }))
        : undefined;

      // Map References
      const referencesData = references.status === 'fulfilled' && references.value
        ? references.value.map(ref => ({
          name: ref.name,
          title: ref.title,
          company: ref.company,
          email: ref.email,
          phone: ref.phone,
          relationship: ref.relationship,
        }))
        : undefined;

      // Build aggregated CV document with all sections
      const allSections: Record<string, any> = {
        HeaderProfileInfo: headerProfileInfo,
        ProfessionalSummary: professionalSummaryData,
        Experience: experience,
        Education: education,
        Skills: skillsData,
        Certifications: certificationsData,
        Courses: coursesData,
        Awards: awardsData,
        Volunteer: volunteerData,
        Publications: publicationsData,
        Patents: patentsData,
        Projects: projectsData,
        Languages: languagesData,
        Hobbies: hobbiesData,
        References: referencesData,
      };

      // If CV config exists, filter and reorder sections based on configuration
      if (cvConfig) {
        let finalSections: Record<string, any> = {};
        let sectionOrder: string[] = [];

        // Filter by enabled sections if specified
        if (cvConfig.enabledSections && cvConfig.enabledSections.length > 0) {
          cvConfig.enabledSections.forEach(sectionKey => {
            if (allSections[sectionKey] !== undefined && allSections[sectionKey] !== null) {
              finalSections[sectionKey] = allSections[sectionKey];
            }
          });
        } else {
          // If no enabledSections, include all sections that have data
          Object.keys(allSections).forEach(key => {
            if (allSections[key] !== undefined && allSections[key] !== null) {
              finalSections[key] = allSections[key];
            }
          });
        }

        // Reorder based on sectionOrder if specified
        if (cvConfig.sectionOrder && cvConfig.sectionOrder.length > 0) {
          sectionOrder = cvConfig.sectionOrder;
        } else {
          sectionOrder = Object.keys(finalSections);
        }

        // Create ordered result
        const orderedSections: Record<string, any> = {};
        sectionOrder.forEach(key => {
          if (finalSections[key] !== undefined) {
            orderedSections[key] = finalSections[key];
          }
        });

        // Add any remaining sections not in order list
        Object.keys(finalSections).forEach(key => {
          if (!orderedSections[key]) {
            orderedSections[key] = finalSections[key];
          }
        });

        return {
          _id: (cvConfig as any)._id?.toString(),
          userId,
          templateId: cvConfig.templateId,
          title: cvConfig.title,
          description: cvConfig.description,
          enabledSections: cvConfig.enabledSections,
          sectionOrder: cvConfig.sectionOrder,
          isDefault: cvConfig.isDefault,
          ...orderedSections,
        } as any;
      }

      // If no CV config, return all sections in default order
      // Note: cvConfig will always exist here since we create it if it doesn't
      return {
        _id: cvConfig ? (cvConfig as any)._id?.toString() : undefined,
        userId,
        templateId: cvConfig?.templateId,
        title: cvConfig?.title || 'My Resume',
        isDefault: cvConfig?.isDefault || false,
        ...allSections,
      } as any;
    } catch (error) {
      throw new NotFoundException('Error generating CV document');
    }
  }

  // Set a CV as default for a user
  async setDefaultCV(id: string, userId: string): Promise<CvDocument> {
    // Unset all other defaults for this user
    await this.cvDocumentModel.updateMany(
      { userId },
      { $set: { isDefault: false } }
    ).exec();

    // Set this CV as default
    const cv = await this.cvDocumentModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: { isDefault: true } },
      { new: true }
    ).exec();

    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    return cv;
  }

  // Duplicate a CV
  async duplicateCV(id: string, userId: string, newTitle?: string): Promise<Partial<CvDocument>> {
    const originalCV = await this.cvDocumentModel.findOne({ _id: id, userId }).exec();

    if (!originalCV) {
      throw new NotFoundException('CV not found');
    }

    // Create a new CV document from the original, excluding _id and timestamps
    const cvData = originalCV.toObject();
    delete cvData._id;
    delete cvData.createdAt;
    delete cvData.updatedAt;
    cvData.title = newTitle || `${originalCV.title} (Copy)`;
    cvData.isDefault = false; 

    const duplicatedCV = new this.cvDocumentModel(cvData);
    const savedCV = await duplicatedCV.save();

    // Generate and return the full CV with all sections populated
    return this.generateCV(userId, savedCV._id.toString());
  }

  // Update section order for a CV
  async updateSectionOrder(id: string, userId: string, sectionOrder: string[]): Promise<CvDocument> {
    const cv = await this.cvDocumentModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: { sectionOrder } },
      { new: true }
    ).exec();

    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    return cv;
  }

  // Update enabled sections for a CV
  async updateEnabledSections(id: string, userId: string, enabledSections: string[]): Promise<CvDocument> {
    const cv = await this.cvDocumentModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: { enabledSections } },
      { new: true }
    ).exec();

    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    return cv;
  }

  // Get all CVs for a user by template
  async getCVsByTemplate(userId: string, templateId: string): Promise<Partial<CvDocument>[]> {
    const cvs = await this.cvDocumentModel.find({ userId, templateId }).sort({ createdAt: -1 }).exec();
    // Generate each CV to include all sections
    const generatedCVs = await Promise.all(
      cvs.map(cv => this.generateCV(userId, cv._id.toString()))
    );
    return generatedCVs;
  }


  // Update template for a CV
  async updateTemplate(id: string, userId: string, templateId: string): Promise<CvDocument> {
    const cv = await this.cvDocumentModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: { templateId } },
      { new: true }
    ).exec();

    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    return cv;
  }
}
