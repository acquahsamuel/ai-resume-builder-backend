# CV Content API Documentation

This document outlines all the API endpoints available for managing CV content sections.

**Base URL:** `/api/v1/cv`

All endpoints require JWT authentication via the `Authorization` header.

---

## 📋 Table of Contents

1. [Personal Information](#personal-information)
2. [Professional Summary](#professional-summary)
3. [Work Experience](#work-experience)
4. [Education](#education)
5. [Skills](#skills)
6. [Certifications](#certifications)
7. [Projects](#projects)
8. [Languages](#languages)

9. [Volunteer Experience](#volunteer-experience)
14. [Patents](#patents)
10. [Publications](#publications)
11. [Awards](#awards)
12. [References](#references)
13. [Hobbies](#hobbies)
15. [Courses](#courses)

---

## 🔐 Authentication

All endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Personal Information

**Endpoint:** `/api/v1/cv/personal-info`

### POST - Create or Update Personal Info
Creates or updates personal information (one per user)

```bash
POST /api/v1/cv/personal-info
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1-234-567-8900",
  "title": "Senior Software Engineer",
  "country": "United States",
  "city": "San Francisco",
  "state": "California",
  "zipCode": "94102",
  "linkedIn": "linkedin.com/in/johndoe",
  "portfolio": "johndoe.com",
  "github": "github.com/johndoe",
  "twitter": "twitter.com/johndoe"
}
```

### GET - Get Personal Info
```bash
GET /api/v1/cv/personal-info
```

### PATCH - Update Personal Info
```bash
PATCH /api/v1/cv/personal-info
```

---

## 2. Professional Summary

**Endpoint:** `/api/v1/cv/professional-summary`

### POST - Create or Update Summary
Creates or updates professional summary

```json
{
  "summaryType": "summary",
  "content": "Results-driven software engineer with 5+ years of experience...",
  "aiGenerated": false,
  "keywords": ["leadership", "agile", "python"]
}
```

**Summary Types:**
- `summary` - Professional summary
- `objective` - Career objective

---

## 3. Work Experience

**Endpoint:** `/api/v1/cv/work-experience`

### POST - Create Work Experience
```bash
POST /api/v1/cv/work-experience
```

**Body:**
```json
{
  "jobTitle": "Senior Software Engineer",
  "company": "Tech Corp Inc.",
  "location": "San Francisco, USA",
  "employmentType": "full-time",
  "startDate": "2020-01-15",
  "endDate": "2023-05-30",
  "isCurrent": false,
  "description": "Led a team of 5 developers...",
  "achievements": ["Increased performance by 40%", "Led migration to cloud"],
  "responsibilities": ["Code reviews", "Architecture design"],
  "technologies": ["React", "Node.js", "AWS"],
  "order": 1
}
```

**Employment Types:**
- `full-time`
- `part-time`
- `contract`
- `freelance`
- `internship`

### Get All Work Experiences
```bash
GET /api/v1/cv/work-experience
```

### Get Single Work Experience
```bash
GET /api/v1/cv/work-experience/:id
```

### Update Work Experience
```bash
PATCH /api/v1/cv/work-experience/:id
```

### Delete Work Experience
```bash
DELETE /api/v1/cv/work-experience/:id
```

### Reorder Work Experiences
```bash
POST /api/v1/cv/work-experience/reorder
```

**Body:**
```json
{
  "experienceIds": ["id1", "id2", "id3"]
}
```

---

## 4. Education

**Endpoint:** `/api/v1/cv/education`

### POST - Create Education
```json
{
  "institution": "Stanford University",
  "degree": "Bachelor of Science",
  "fieldOfStudy": "Computer Science",
  "location": "Stanford, CA, USA",
  "startDate": "2012-09-01",
  "endDate": "2016-06-15",
  "isOngoing": false,
  "gpa": 3.8,
  "gpaScale": "4.0",
  "honors": ["Magna Cum Laude", "Dean's List"],
  "relevantCoursework": ["Data Structures", "Machine Learning"],
  "activities": "President of Computer Science Club",
  "thesis": "Deep Learning for Image Recognition"
}
```

**GPA Scales:**
- `4.0`
- `5.0`
- `100`

---

## 5. Skills

**Endpoint:** `/api/v1/cv/skills`

### POST - Create Skill
```json
{
  "name": "JavaScript",
  "category": "technical",
  "proficiencyLevel": 8,
  "proficiencyLabel": "advanced",
  "yearsOfExperience": 5,
  "lastUsed": "2023-10-01",
  "certifications": ["AWS Certified Developer"],
  "endorsements": 45,
  "isHighlighted": true
}
```

**Categories:**
- `technical`
- `soft`
- `language`
- `tool`
- `framework`
- `other`

**Proficiency Labels:**
- `beginner`
- `intermediate`
- `advanced`
- `expert`

---

## 6. Certifications

**Endpoint:** `/api/v1/cv/certifications`

### POST - Create Certification
```json
{
  "name": "AWS Certified Solutions Architect",
  "issuingOrganization": "Amazon Web Services",
  "issueDate": "2022-06-15",
  "expiryDate": "2025-06-15",
  "doesNotExpire": false,
  "credentialId": "AWS-12345-ABCDE",
  "credentialUrl": "https://credly.com/badges/123",
  "description": "Validates expertise in designing...",
  "logo": "/logos/aws.png"
}
```

---

## 7. Projects

**Endpoint:** `/api/v1/cv/projects`

### POST - Create Project
```json
{
  "name": "E-commerce Platform",
  "role": "Lead Developer",
  "description": "Built a scalable e-commerce platform...",
  "startDate": "2022-01-01",
  "endDate": "2022-06-30",
  "isOngoing": false,
  "projectUrl": "https://github.com/user/project",
  "liveUrl": "https://myproject.com",
  "technologies": ["React", "Node.js", "MongoDB"],
  "achievements": ["Handled 10k+ users", "Reduced load time by 60%"],
  "teamSize": 4,
  "images": ["/project1.png", "/project2.png"]
}
```

---

## 8. Languages

**Endpoint:** `/api/v1/cv/languages`

### POST - Create Language
```json
{
  "language": "Spanish",
  "proficiency": "fluent",
  "proficiencyLevel": "C1",
  "canRead": true,
  "canWrite": true,
  "canSpeak": true,
  "certifications": ["DELE C1"]
}
```

**Proficiency Levels:**
- `native`
- `fluent`
- `professional`
- `intermediate`
- `basic`

**CEFR Levels:**
- `A1`, `A2`, `B1`, `B2`, `C1`, `C2`

---

## 9. Volunteer Experience

**Endpoint:** `/api/v1/cv/volunteer`

### POST - Create Volunteer Experience
```json
{
  "role": "Volunteer Teacher",
  "organization": "Code for Good",
  "location": "San Francisco, USA",
  "cause": "Education, Technology Access",
  "startDate": "2021-03-01",
  "endDate": "2023-03-01",
  "isOngoing": false,
  "description": "Taught programming basics to underprivileged youth...",
  "achievements": ["Trained 50+ students", "Developed curriculum"],
  "hoursPerWeek": 4
}
```

---

## 10. Publications

**Endpoint:** `/api/v1/cv/publications`

### POST - Create Publication
```json
{
  "title": "Machine Learning in Healthcare",
  "authors": ["John Doe", "Jane Smith"],
  "publication": "Journal of AI Research",
  "publisher": "IEEE",
  "publicationDate": "2023-05-15",
  "doi": "10.1234/example.doi",
  "url": "https://researchgate.net/publication/123",
  "description": "This paper explores the application of ML...",
  "citations": 45
}
```

---

## 11. Awards

**Endpoint:** `/api/v1/cv/awards`

### POST - Create Award
```json
{
  "title": "Employee of the Year",
  "issuer": "Tech Corp Inc.",
  "date": "2023-12-01",
  "description": "Recognized for outstanding performance..."
}
```

---

## 12. References

**Endpoint:** `/api/v1/cv/references`

### POST - Create Reference
```json
{
  "name": "Dr. Jane Smith",
  "title": "Senior Manager",
  "company": "Tech Corp Inc.",
  "email": "jane.smith@techcorp.com",
  "phone": "+1-234-567-8900",
  "relationship": "Direct Supervisor"
}
```

---

## 13. Hobbies

**Endpoint:** `/api/v1/cv/hobbies`

### POST - Create Hobby
```json
{
  "name": "Photography",
  "description": "Landscape and portrait photography",
  "relevance": "Develops attention to detail"
}
```

---

## 14. Patents

**Endpoint:** `/api/v1/cv/patents`

### POST - Create Patent
```json
{
  "title": "Method for Data Compression",
  "patentNumber": "US-1234567-B2",
  "issueDate": "2022-08-15",
  "inventors": ["John Doe", "Jane Smith"],
  "description": "Novel approach to lossless compression...",
  "url": "https://patents.google.com/patent/123"
}
```

---

## 15. Courses

**Endpoint:** `/api/v1/cv/courses`

### POST - Create Course
```json
{
  "name": "Advanced React Patterns",
  "provider": "Udemy",
  "completionDate": "2023-04-20",
  "certificateUrl": "https://udemy.com/certificate/123",
  "hours": 40,
  "skills": ["React", "TypeScript"]
}
```

---

## 📝 Common Patterns

### All Collection Endpoints Support:

1. **GET** - List all items for the authenticated user
2. **POST** - Create new item
3. **GET /:id** - Get single item
4. **PATCH /:id** - Update item
5. **DELETE /:id** - Delete item

### Response Format

**Success (200/201):**
```json
{
  "_id": "...",
  "userId": "...",
  "...": "...",
  "createdAt": "2023-10-26T10:30:00Z",
  "updatedAt": "2023-10-26T10:30:00Z"
}
```

**Error (400/404/403):**
```json
{
  "statusCode": 404,
  "message": "Item not found",
  "error": "Not Found"
}
```

---

## 🔍 Field Validation

- **Email**: Must be valid email format
- **URL**: Must be valid URL format
- **Date**: ISO 8601 format (YYYY-MM-DD)
- **String Length**: Most fields have min/max constraints
- **Enums**: Must match predefined values
- **Numbers**: Proficiency levels (1-10), GPA, etc.

---

## 📊 Ordering

All list endpoints return items ordered by:
1. `order` field (ascending)
2. Relevant date field (descending, e.g., startDate, issueDate)

---

**For detailed field specifications, refer to the entities in `src/cv-content/entities/`**

