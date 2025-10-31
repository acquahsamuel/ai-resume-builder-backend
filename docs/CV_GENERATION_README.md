# CV Generation - Complete Use Case Documentation

This guide explains how CV generation works in the Cleansheet AI Builder API, including how to create multiple CVs and manage sections.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Understanding CVs and Sections](#understanding-cvs-and-sections)
3. [Getting Started](#getting-started)
4. [Adding Content Sections](#adding-content-sections)
5. [Creating Multiple CVs](#creating-multiple-cvs)
6. [Customizing Each CV](#customizing-each-cv)
7. [Generating CVs](#generating-cvs)
8. [Complete Workflows](#complete-workflows)
9. [Examples](#examples)
10. [Best Practices](#best-practices)

---

## Overview

The CV Builder API works with two main concepts:

1. **CV Documents** - Container/configuration for a resume
   - Each CV document has its own template, title, and section configuration
   - You can create multiple CV documents from the same content sections
   - Each CV can have different enabled sections and ordering

2. **Content Sections** - Your actual resume data
   - Personal information, work experience, education, skills, etc.
   - These are shared across all your CV documents
   - Each section type has its own API endpoints

### Key Insight

**You create content sections once, but can use them in multiple CV documents with different configurations.**

---

## Understanding CVs and Sections

### CV Document Structure

A CV document (`CvDocument`) contains:
- **Metadata**: `title`, `description`, `templateId`, `isDefault`
- **Configuration**: `enabledSections`, `sectionOrder`
- **Content**: References to your section data (personal info, work experience, etc.)

### Available Sections

1. **Personal Information** (`personal-info`) - One per user
2. **Professional Summary** (`professional-summary`) - One per user
3. **Work Experience** (`work-experience`) - Multiple entries
4. **Education** (`education`) - Multiple entries
5. **Skills** (`skills`) - Multiple entries
6. **Certifications** (`certifications`) - Multiple entries
7. **Courses** (`courses`) - Multiple entries
8. **Awards** (`awards`) - Multiple entries
9. **Volunteer Experience** (`volunteer`) - Multiple entries
10. **Publications** (`publications`) - Multiple entries
11. **Patents** (`patents`) - Multiple entries
12. **Projects** (`projects`) - Multiple entries
13. **Languages** (`languages`) - Multiple entries
14. **Hobbies** (`hobbies`) - Multiple entries
15. **References** (`references`) - Multiple entries

---

## Getting Started

### Step 1: Authenticate

First, log in to get your JWT token:

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

Set this token in your `Authorization` header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 2: Create Your First CV (Auto-Created)

When you call the generate endpoint for the first time, a default CV is automatically created:

```bash
GET /api/v1/cvs/generate
Authorization: Bearer <your-token>
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "user123",
  "templateId": "template456",
  "title": "My Resume",
  "isDefault": true,
  "HeaderProfileInfo": null,
  "ProfessionalSummary": null,
  "Experience": [],
  "Education": [],
  ...
}
```

**Important:** Save the `_id` - this is your CV document ID!

---

## Adding Content Sections

Before generating meaningful CVs, you need to add your content. Each section type has its own endpoint.

### 1. Add Personal Information

**One-time setup** - Personal info is shared across all CVs:

```bash
POST /api/v1/cv/personal-info
Authorization: Bearer <your-token>
Content-Type: application/json

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
  "github": "github.com/johndoe"
}
```

### 2. Add Professional Summary

**One-time setup**:

```bash
POST /api/v1/cv/professional-summary
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "summaryType": "summary",
  "content": "Results-driven software engineer with 5+ years of experience...",
  "aiGenerated": false,
  "keywords": ["leadership", "agile", "python"]
}
```

### 3. Add Work Experience

**Multiple entries allowed**:

```bash
POST /api/v1/cv/work-experience
Authorization: Bearer <your-token>
Content-Type: application/json

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

**Add more work experiences** by calling the same endpoint multiple times.

### 4. Add Education

```bash
POST /api/v1/cv/education
Authorization: Bearer <your-token>
Content-Type: application/json

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
  "honors": ["Magna Cum Laude", "Dean's List"]
}
```

### 5. Add Skills

```bash
POST /api/v1/cv/skills
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "name": "JavaScript",
  "category": "technical",
  "proficiencyLevel": 8,
  "proficiencyLabel": "advanced",
  "yearsOfExperience": 5,
  "isHighlighted": true
}
```

**Repeat for each skill** you want to add.

### 6. Add Other Sections

Similar pattern for:
- Certifications: `POST /api/v1/cv/certifications`
- Projects: `POST /api/v1/cv/projects`
- Languages: `POST /api/v1/cv/languages`
- Volunteer: `POST /api/v1/cv/volunteer`
- Publications: `POST /api/v1/cv/publications`
- Awards: `POST /api/v1/cv/awards`
- References: `POST /api/v1/cv/references`
- Hobbies: `POST /api/v1/cv/hobbies`
- Patents: `POST /api/v1/cv/patents`
- Courses: `POST /api/v1/cv/courses`

**See** `docs/CV_CONTENT_API.md` for complete payload examples.

---

## Creating Multiple CVs

Now that you have content sections, you can create multiple CV documents that use different configurations of these sections.

### Method 1: Generate Creates Default CV

The first time you call generate, it creates a default CV automatically. To create additional CVs, you need to duplicate or create new ones.

### Method 2: Duplicate an Existing CV

This is the easiest way to create a new CV with a different configuration:

```bash
POST /api/v1/cvs/:id/duplicate
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "title": "Software Engineer CV"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "user123",
  "templateId": "template456",
  "title": "Software Engineer CV",
  "isDefault": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  ...
}
```

**Save this new `_id`** - this is your second CV document!

### Method 3: List All Your CVs

```bash
GET /api/v1/cvs/my-cvs
Authorization: Bearer <your-token>
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My Resume",
    "isDefault": true,
    "templateId": "template456"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Software Engineer CV",
    "isDefault": false,
    "templateId": "template456"
  }
]
```

---

## Customizing Each CV

Each CV document can have different:
1. **Enabled sections** - Which sections to show
2. **Section order** - How sections are arranged
3. **Template** - Visual design/layout

### Update Enabled Sections

Control which sections appear in a specific CV:

```bash
PATCH /api/v1/cvs/:id/enabled-sections
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Skills",
    "Certifications"
  ]
}
```

**Available section keys:**
- `HeaderProfileInfo`
- `ProfessionalSummary`
- `Experience`
- `Education`
- `Skills`
- `Certifications`
- `Courses`
- `Awards`
- `Volunteer`
- `Publications`
- `Patents`
- `Projects`
- `Languages`
- `Hobbies`
- `References`

### Update Section Order

Control the order sections appear in:

```bash
PATCH /api/v1/cvs/:id/section-order
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Skills",
    "Experience",
    "Education",
    "Certifications",
    "Projects"
  ]
}
```

**Example Use Cases:**
- **Technical CV**: Put Skills and Projects first
- **Academic CV**: Put Education and Publications first
- **Creative CV**: Put Projects and Awards prominently

### Change Template

Apply a different visual template to a CV:

```bash
PATCH /api/v1/cvs/:id/template
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "templateId": "507f1f77bcf86cd799439099"
}
```

First, get available templates:
```bash
GET /api/v1/template
Authorization: Bearer <your-token>
```

### Set as Default CV

Mark a CV as your default:

```bash
PATCH /api/v1/cvs/:id/set-default
Authorization: Bearer <your-token>
```

---

## Generating CVs

Once you have content sections and CV documents configured, generate the final CV output.

### Generate Default CV

```bash
GET /api/v1/cvs/generate
Authorization: Bearer <your-token>
```

This generates your default CV with all sections based on its configuration.

### Generate Specific CV by ID

```bash
GET /api/v1/cvs/generate/:id
Authorization: Bearer <your-token>
```

Replace `:id` with your CV document ID (e.g., `507f1f77bcf86cd799439011`).

**Response includes:**
- All enabled sections in the configured order
- Only sections you've enabled for this CV
- All your content data for those sections

---

## Complete Workflows

### Workflow 1: Create Your First CV

1. **Authenticate**
   ```bash
   POST /api/v1/auth/login
   ```

2. **Add Personal Information**
   ```bash
   POST /api/v1/cv/personal-info
   ```

3. **Add Professional Summary**
   ```bash
   POST /api/v1/cv/professional-summary
   ```

4. **Add Work Experience** (repeat for each job)
   ```bash
   POST /api/v1/cv/work-experience
   ```

5. **Add Education**
   ```bash
   POST /api/v1/cv/education
   ```

6. **Add Skills** (repeat for each skill)
   ```bash
   POST /api/v1/cv/skills
   ```

7. **Generate CV** (creates default CV automatically)
   ```bash
   GET /api/v1/cvs/generate
   ```
   - Save the `_id` from the response

### Workflow 2: Create Multiple CVs for Different Roles

**Scenario:** You want a CV for Software Engineer and another for DevOps Engineer, each highlighting different skills and experiences.

1. **Ensure you have all sections added** (from Workflow 1)

2. **Create Second CV by Duplicating**
   ```bash
   POST /api/v1/cvs/:first-cv-id/duplicate
   {
     "title": "DevOps Engineer CV"
   }
   ```
   - Save the new `_id`

3. **Customize Software Engineer CV**
   ```bash
   # Enable sections relevant to software engineering
   PATCH /api/v1/cvs/:software-cv-id/enabled-sections
   {
     "enabledSections": [
       "HeaderProfileInfo",
       "ProfessionalSummary",
       "Experience",
       "Education",
       "Skills",
       "Projects"
     ]
   }
   
   # Order: Skills and Projects first
   PATCH /api/v1/cvs/:software-cv-id/section-order
   {
     "sectionOrder": [
       "HeaderProfileInfo",
       "ProfessionalSummary",
       "Skills",
       "Projects",
       "Experience",
       "Education"
     ]
   }
   ```

4. **Customize DevOps Engineer CV**
   ```bash
   # Enable different sections
   PATCH /api/v1/cvs/:devops-cv-id/enabled-sections
   {
     "enabledSections": [
       "HeaderProfileInfo",
       "ProfessionalSummary",
       "Experience",
       "Certifications",
       "Skills",
       "Education"
     ]
   }
   
   # Order: Certifications first (important for DevOps)
   PATCH /api/v1/cvs/:devops-cv-id/section-order
   {
     "sectionOrder": [
       "HeaderProfileInfo",
       "ProfessionalSummary",
       "Certifications",
       "Skills",
       "Experience",
       "Education"
     ]
   }
   ```

5. **Generate Both CVs**
   ```bash
   GET /api/v1/cvs/generate/:software-cv-id
   GET /api/v1/cvs/generate/:devops-cv-id
   ```

### Workflow 3: Create Academic CV vs Professional CV

**Scenario:** Academic CV needs Publications and Education prominently, while Professional CV focuses on Work Experience.

1. **Add Academic Sections**
   ```bash
   POST /api/v1/cv/publications  # Add your papers
   POST /api/v1/cv/education     # Add all degrees
   ```

2. **Create Academic CV**
   ```bash
   POST /api/v1/cvs/:default-cv-id/duplicate
   {
     "title": "Academic CV"
   }
   ```

3. **Configure Academic CV**
   ```bash
   PATCH /api/v1/cvs/:academic-cv-id/enabled-sections
   {
     "enabledSections": [
       "HeaderProfileInfo",
       "Education",
       "Publications",
       "ProfessionalSummary",
       "Experience",
       "Awards",
       "Patents"
     ]
   }
   
   PATCH /api/v1/cvs/:academic-cv-id/section-order
   {
     "sectionOrder": [
       "HeaderProfileInfo",
       "Education",
       "Publications",
       "Awards",
       "ProfessionalSummary",
       "Experience",
       "Patents"
     ]
   }
   ```

4. **Configure Professional CV** (use default or create new)
   ```bash
   PATCH /api/v1/cvs/:professional-cv-id/enabled-sections
   {
     "enabledSections": [
       "HeaderProfileInfo",
       "ProfessionalSummary",
       "Experience",
       "Education",
       "Skills",
       "Certifications",
       "Projects"
     ]
   }
   ```

### Workflow 4: Create Industry-Specific CVs

**Scenario:** Create CVs tailored for different industries (e.g., Tech, Finance, Healthcare).

1. **Add Industry-Specific Content**
   - Add relevant work experiences
   - Add industry-specific certifications
   - Add relevant projects

2. **Create CV for Each Industry**
   ```bash
   POST /api/v1/cvs/:base-cv-id/duplicate
   { "title": "Tech Industry CV" }
   
   POST /api/v1/cvs/:base-cv-id/duplicate
   { "title": "Finance CV" }
   ```

3. **Customize Each**
   - Enable only relevant sections
   - Reorder to highlight industry-relevant content
   - Apply appropriate templates

---

## Examples

### Example 1: Entry-Level Developer CV

**Sections to Enable:**
- HeaderProfileInfo
- ProfessionalSummary
- Education
- Skills
- Projects
- Courses

**Section Order:**
1. HeaderProfileInfo
2. ProfessionalSummary
3. Education (prominent for entry-level)
4. Skills
5. Projects (showcase portfolio)
6. Courses

### Example 2: Senior Executive CV

**Sections to Enable:**
- HeaderProfileInfo
- ProfessionalSummary
- Experience (most important)
- Education
- Certifications
- Awards
- References

**Section Order:**
1. HeaderProfileInfo
2. ProfessionalSummary
3. Experience (detailed)
4. Education
5. Certifications
6. Awards
7. References

### Example 3: Creative Professional CV

**Sections to Enable:**
- HeaderProfileInfo
- ProfessionalSummary
- Projects (showcase work)
- Experience
- Skills
- Education
- Awards

**Section Order:**
1. HeaderProfileInfo
2. Projects (portfolio first)
3. ProfessionalSummary
4. Experience
5. Skills
6. Awards
7. Education

---

## Best Practices

### 1. Content Management

- **Add all your content once** - Don't duplicate section data
- **Keep sections up-to-date** - Update work experience, skills, etc. as your career progresses
- **All CVs automatically use latest content** - When you update a section, all CVs using it reflect the change

### 2. CV Organization

- **Use descriptive titles** - "Software Engineer CV - Tech Focus" is better than "CV 2"
- **Set a default CV** - Mark your primary CV as default
- **Name CVs by purpose** - "Academic CV", "Industry CV", "Executive Summary"

### 3. Section Selection

- **Less is more** - Don't enable all sections; focus on what's relevant
- **Match the role** - Research what sections are important for the role/industry
- **Consider ATS** - Many employers use Applicant Tracking Systems; ensure key sections are enabled

### 4. Section Ordering

- **Most relevant first** - Put your strongest content at the top
- **Logical flow** - Personal Info → Summary → Experience → Education makes sense
- **Industry standards** - Research common CV formats for your industry

### 5. Template Selection

- **Professional templates** for corporate roles
- **Creative templates** for design/creative roles
- **Academic templates** for research/academic positions
- **Consistency** - Use similar templates if creating CVs for related roles

### 6. Maintenance

- **Regular updates** - Keep work experience and skills current
- **Version control** - You can duplicate CVs before making major changes
- **Review periodically** - Ensure all CVs reflect your current status

---

## API Endpoints Summary

### CV Document Management
- `GET /api/v1/cvs` - List all CVs
- `GET /api/v1/cvs/my-cvs` - Get user's CVs
- `GET /api/v1/cvs/default` - Get default CV
- `GET /api/v1/cvs/:id` - Get specific CV
- `GET /api/v1/cvs/generate` - Generate default CV
- `GET /api/v1/cvs/generate/:id` - Generate specific CV
- `POST /api/v1/cvs/:id/duplicate` - Duplicate CV
- `PATCH /api/v1/cvs/:id/set-default` - Set default CV
- `PATCH /api/v1/cvs/:id/enabled-sections` - Update enabled sections
- `PATCH /api/v1/cvs/:id/section-order` - Update section order
- `PATCH /api/v1/cvs/:id/template` - Update template
- `DELETE /api/v1/cvs/:id` - Delete CV

### Content Section Management
- `POST /api/v1/cv/personal-info` - Create/update personal info
- `POST /api/v1/cv/professional-summary` - Create/update summary
- `POST /api/v1/cv/work-experience` - Add work experience
- `POST /api/v1/cv/education` - Add education
- `POST /api/v1/cv/skills` - Add skill
- `POST /api/v1/cv/certifications` - Add certification
- `POST /api/v1/cv/projects` - Add project
- `POST /api/v1/cv/languages` - Add language
- `POST /api/v1/cv/volunteer` - Add volunteer experience
- `POST /api/v1/cv/publications` - Add publication
- `POST /api/v1/cv/awards` - Add award
- `POST /api/v1/cv/references` - Add reference
- `POST /api/v1/cv/hobbies` - Add hobby
- `POST /api/v1/cv/patents` - Add patent
- `POST /api/v1/cv/courses` - Add course

**For each section type, you also have:**
- `GET /api/v1/cv/{section}` - List all entries
- `GET /api/v1/cv/{section}/:id` - Get specific entry
- `PATCH /api/v1/cv/{section}/:id` - Update entry
- `DELETE /api/v1/cv/{section}/:id` - Delete entry

---

## Troubleshooting

### Issue: "my-cvs" returns empty array

**Solution:** Call `GET /api/v1/cvs/generate` first - it automatically creates a default CV if none exists.

### Issue: Generated CV has no content

**Solution:** Make sure you've added content sections first:
1. Add personal info
2. Add work experience, education, skills, etc.
3. Then generate the CV

### Issue: Section not appearing in generated CV

**Possible causes:**
1. Section not enabled for this CV - Check with `GET /api/v1/cvs/:id`
2. No content added for that section - Add content first
3. Section key mismatch - Ensure you're using correct section keys

### Issue: Want to use same content in different order

**Solution:** Create multiple CV documents and configure different `sectionOrder` for each.

---

## Quick Reference

### Creating a New CV
1. Add content sections (personal info, work experience, etc.)
2. Call `GET /api/v1/cvs/generate` to auto-create default CV
3. Or duplicate existing CV: `POST /api/v1/cvs/:id/duplicate`

### Customizing a CV
1. Get CV ID: `GET /api/v1/cvs/my-cvs`
2. Update enabled sections: `PATCH /api/v1/cvs/:id/enabled-sections`
3. Update section order: `PATCH /api/v1/cvs/:id/section-order`
4. Change template: `PATCH /api/v1/cvs/:id/template`

### Generating Final CV
1. Generate default: `GET /api/v1/cvs/generate`
2. Generate specific: `GET /api/v1/cvs/generate/:id`

---

**For detailed API reference, see:**
- `docs/CV_CONTENT_API.md` - Complete section API documentation
- `docs/API_PAYLOAD_SAMPLES.md` - Sample request/response payloads
- `postman/README.md` - Postman collection guide

