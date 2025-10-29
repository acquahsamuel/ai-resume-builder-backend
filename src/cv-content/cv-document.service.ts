import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDocumentDto } from './dto/create-cv-document.dto';
import { UpdateCvDocumentDto } from './dto/update-cv-document.dto';
import { CvDocument, CvDocumentDocument } from './entities/cv-document.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async createCV(createCvDocumentDto: CreateCvDocumentDto) {
    const document = new this.cvDocumentModel(createCvDocumentDto);
    return document.save();
  }

  async findAllCV(userId: string): Promise<CvDocument[]> {
    return await this.cvDocumentModel.find({ userId }).exec();
  }

  async findCV(id: string, userId: string): Promise<CvDocument> {
    const cv = await this.cvDocumentModel.findOne({ _id: id, userId }).exec();
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    return cv;
  }

  async updateCV(id: string, userId: string, updateCvDocumentDto: UpdateCvDocumentDto) {
    const cv = await this.cvDocumentModel.findOneAndUpdate(
      { _id: id, userId },
      updateCvDocumentDto,
      { new: true }
    ).exec();
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    return cv;
  }

  async deleteCV(id: string, userId: string) {
    const result = await this.cvDocumentModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!result) {
      throw new NotFoundException('CV not found');
    }
    return result;
  }

  async getAllUserCV(userId: string): Promise<CvDocument[]> {
    return await this.cvDocumentModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async generateCV(userId: string): Promise<Partial<CvDocument>> {
    try {
      // Fetch all sections in parallel
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
        socialMedia: [
          personalInfo.value.linkedIn && { platform: 'LinkedIn', link: personalInfo.value.linkedIn },
          personalInfo.value.github && { platform: 'GitHub', link: personalInfo.value.github },
          personalInfo.value.twitter && { platform: 'Twitter', link: personalInfo.value.twitter },
          personalInfo.value.portfolio && { platform: 'Portfolio', link: personalInfo.value.portfolio },
          personalInfo.value.website && { platform: 'Website', link: personalInfo.value.website },
        ].filter(Boolean),
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

      // Build aggregated CV document
      const aggregatedCV: Partial<CvDocument> = {
        userId,
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

      return aggregatedCV;
    } catch (error) {
      throw new NotFoundException('Error generating CV document');
    }
  }
}
