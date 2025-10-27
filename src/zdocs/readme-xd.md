# CV Builder - Complete Sections & Fields Structure

## 📋 Top 10 Most Vital CV Sections

---

## 1️⃣ Personal Information
**Purpose**: Core identity and contact details  
**Display Priority**: Header (Top of CV)  
**Required**: Yes

### Fields:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `firstName` | String | ✅ Yes | 2-50 chars | John |
| `lastName` | String | ✅ Yes | 2-50 chars | Doe |
| `email` | String | ✅ Yes | Valid email | john.doe@email.com |
| `phone` | String | ✅ Yes | International format | +1-234-567-8900 |
| `profilePhoto` | File/URL | ❌ No | Image (2MB max) | /uploads/photo.jpg |
| `title` | String | ✅ Yes | Professional title | Senior Software Engineer |
| `address` | Object | ❌ No | - | See below |
| `city` | String | ❌ No | 2-100 chars | San Francisco |
| `state` | String | ❌ No | 2-100 chars | California |
| `country` | String | ✅ Yes | 2-100 chars | United States |
| `zipCode` | String | ❌ No | Postal code | 94102 |
| `dateOfBirth` | Date | ❌ No | Valid date | 1990-05-15 |
| `nationality` | String | ❌ No | 2-100 chars | American |
| `linkedIn` | String | ❌ No | Valid URL | linkedin.com/in/johndoe |
| `portfolio` | String | ❌ No | Valid URL | johndoe.com |
| `github` | String | ❌ No | Valid URL | github.com/johndoe |
| `twitter` | String | ❌ No | Valid URL | twitter.com/johndoe |
| `website` | String | ❌ No | Valid URL | mywebsite.com |

---

## 2️⃣ Professional Summary / Objective
**Purpose**: Elevator pitch - who you are professionally  
**Display Priority**: Below personal info  
**Required**: Recommended

### Fields:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `summaryType` | Enum | ✅ Yes | 'summary' \| 'objective' | summary |
| `content` | Text | ✅ Yes | 50-500 chars | Results-driven software engineer with 5+ years... |
| `aiGenerated` | Boolean | ❌ No | true/false | false |
| `keywords` | Array | ❌ No | String array | ['leadership', 'agile', 'python'] |

---

## 3️⃣ Work Experience
**Purpose**: Employment history and achievements  
**Display Priority**: After summary  
**Required**: Yes (at least 1 entry)

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `jobTitle` | String | ✅ Yes | 2-100 chars | Senior Software Engineer |
| `company` | String | ✅ Yes | 2-100 chars | Tech Corp Inc. |
| `location` | String | ❌ No | City, Country | San Francisco, USA |
| `employmentType` | Enum | ❌ No | full-time, part-time, contract, freelance, internship | full-time |
| `startDate` | Date | ✅ Yes | Valid date | 2020-01-15 |
| `endDate` | Date | ❌ No | Valid date or null | 2023-05-30 |
| `isCurrent` | Boolean | ✅ Yes | true/false | false |
| `description` | Text | ❌ No | Max 2000 chars | Led a team of 5 developers... |
| `achievements` | Array | ❌ No | String array | ['Increased performance by 40%', 'Led migration to cloud'] |
| `responsibilities` | Array | ❌ No | String array | ['Code reviews', 'Architecture design'] |
| `technologies` | Array | ❌ No | String array | ['React', 'Node.js', 'AWS'] |
| `order` | Number | ✅ Yes | Integer | 1 |
| `aiGenerated` | Boolean | ❌ No | true/false | false |

---

## 4️⃣ Education
**Purpose**: Academic background and qualifications  
**Display Priority**: After work experience  
**Required**: Yes (at least 1 entry)

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `institution` | String | ✅ Yes | 2-200 chars | Stanford University |
| `degree` | String | ✅ Yes | 2-100 chars | Bachelor of Science |
| `fieldOfStudy` | String | ✅ Yes | 2-100 chars | Computer Science |
| `location` | String | ❌ No | City, Country | Stanford, CA, USA |
| `startDate` | Date | ✅ Yes | Valid date | 2012-09-01 |
| `endDate` | Date | ❌ No | Valid date or null | 2016-06-15 |
| `isOngoing` | Boolean | ✅ Yes | true/false | false |
| `gpa` | Number | ❌ No | 0.0-4.0 or 0-100 | 3.8 |
| `gpaScale` | Enum | ❌ No | '4.0' \| '5.0' \| '100' | 4.0 |
| `honors` | Array | ❌ No | String array | ['Magna Cum Laude', 'Dean\'s List'] |
| `relevantCoursework` | Array | ❌ No | String array | ['Data Structures', 'Machine Learning'] |
| `activities` | Text | ❌ No | Max 500 chars | President of Computer Science Club |
| `thesis` | String | ❌ No | Max 200 chars | Deep Learning for Image Recognition |
| `order` | Number | ✅ Yes | Integer | 1 |

---

## 5️⃣ Skills
**Purpose**: Technical and soft skills with proficiency levels  
**Display Priority**: Sidebar or after experience  
**Required**: Yes (at least 3 skills)

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `name` | String | ✅ Yes | 2-100 chars | JavaScript |
| `category` | Enum | ✅ Yes | technical, soft, language, tool, framework, other | technical |
| `proficiencyLevel` | Number | ✅ Yes | 1-10 or enum | 8 |
| `proficiencyLabel` | Enum | ❌ No | beginner, intermediate, advanced, expert | advanced |
| `yearsOfExperience` | Number | ❌ No | 0-50 | 5 |
| `lastUsed` | Date | ❌ No | Valid date | 2023-10-01 |
| `certifications` | Array | ❌ No | String array | ['AWS Certified Developer'] |
| `endorsements` | Number | ❌ No | Integer | 45 |
| `order` | Number | ✅ Yes | Integer | 1 |
| `isHighlighted` | Boolean | ❌ No | true/false | true |

### Skill Categories Detail:

**Technical Skills**: Programming languages, frameworks, databases
**Soft Skills**: Communication, Leadership, Problem-solving
**Language Skills**: English (Native), Spanish (Fluent)
**Tools**: Git, Docker, Jira, Figma
**Frameworks**: React, Angular, Django
**Other**: Domain-specific skills

---

## 6️⃣ Certifications
**Purpose**: Professional certifications and licenses  
**Display Priority**: After education or sidebar  
**Required**: No

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `name` | String | ✅ Yes | 2-200 chars | AWS Certified Solutions Architect |
| `issuingOrganization` | String | ✅ Yes | 2-200 chars | Amazon Web Services |
| `issueDate` | Date | ✅ Yes | Valid date | 2022-06-15 |
| `expiryDate` | Date | ❌ No | Valid date or null | 2025-06-15 |
| `doesNotExpire` | Boolean | ✅ Yes | true/false | false |
| `credentialId` | String | ❌ No | Max 100 chars | AWS-12345-ABCDE |
| `credentialUrl` | String | ❌ No | Valid URL | credly.com/badges/123 |
| `description` | Text | ❌ No | Max 500 chars | Validates expertise in designing... |
| `logo` | String | ❌ No | Image URL | /logos/aws.png |
| `order` | Number | ✅ Yes | Integer | 1 |

---

## 7️⃣ Projects
**Purpose**: Portfolio projects and notable work  
**Display Priority**: After work experience  
**Required**: No (Recommended for developers/creatives)

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `name` | String | ✅ Yes | 2-200 chars | E-commerce Platform |
| `role` | String | ✅ Yes | 2-100 chars | Lead Developer |
| `description` | Text | ✅ Yes | 50-1000 chars | Built a scalable e-commerce platform... |
| `startDate` | Date | ❌ No | Valid date | 2022-01-01 |
| `endDate` | Date | ❌ No | Valid date or null | 2022-06-30 |
| `isOngoing` | Boolean | ✅ Yes | true/false | false |
| `projectUrl` | String | ❌ No | Valid URL | github.com/user/project |
| `liveUrl` | String | ❌ No | Valid URL | myproject.com |
| `technologies` | Array | ✅ Yes | String array | ['React', 'Node.js', 'MongoDB'] |
| `achievements` | Array | ❌ No | String array | ['Handled 10k+ users', 'Reduced load time by 60%'] |
| `teamSize` | Number | ❌ No | Integer | 4 |
| `images` | Array | ❌ No | Image URLs | ['/project1.png', '/project2.png'] |
| `order` | Number | ✅ Yes | Integer | 1 |

---

## 8️⃣ Languages
**Purpose**: Language proficiency for international opportunities  
**Display Priority**: Sidebar or separate section  
**Required**: No (Recommended)

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `language` | String | ✅ Yes | 2-100 chars | Spanish |
| `proficiency` | Enum | ✅ Yes | native, fluent, professional, intermediate, basic | fluent |
| `proficiencyLevel` | Enum | ❌ No | A1, A2, B1, B2, C1, C2 (CEFR) | C1 |
| `canRead` | Boolean | ❌ No | true/false | true |
| `canWrite` | Boolean | ❌ No | true/false | true |
| `canSpeak` | Boolean | ❌ No | true/false | true |
| `certifications` | Array | ❌ No | String array | ['DELE C1'] |
| `order` | Number | ✅ Yes | Integer | 1 |

---

## 9️⃣ Volunteer Experience / Activities
**Purpose**: Community involvement and character demonstration  
**Display Priority**: After projects or separate section  
**Required**: No

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `role` | String | ✅ Yes | 2-100 chars | Volunteer Teacher |
| `organization` | String | ✅ Yes | 2-200 chars | Code for Good |
| `location` | String | ❌ No | City, Country | San Francisco, USA |
| `cause` | String | ❌ No | 2-100 chars | Education, Technology Access |
| `startDate` | Date | ✅ Yes | Valid date | 2021-03-01 |
| `endDate` | Date | ❌ No | Valid date or null | 2023-03-01 |
| `isOngoing` | Boolean | ✅ Yes | true/false | false |
| `description` | Text | ✅ Yes | Max 1000 chars | Taught programming basics to underprivileged youth... |
| `achievements` | Array | ❌ No | String array | ['Trained 50+ students', 'Developed curriculum'] |
| `hoursPerWeek` | Number | ❌ No | 1-168 | 4 |
| `order` | Number | ✅ Yes | Integer | 1 |

---

## 🔟 Publications / Research
**Purpose**: Academic contributions and thought leadership  
**Display Priority**: After education  
**Required**: No (For academics/researchers)

### Fields per Entry:

| Field Name | Type | Required | Validation | Example |
|------------|------|----------|------------|---------|
| `title` | String | ✅ Yes | 2-300 chars | Machine Learning in Healthcare |
| `authors` | Array | ✅ Yes | String array | ['John Doe', 'Jane Smith'] |
| `publication` | String | ✅ Yes | 2-200 chars | Journal of AI Research |
| `publisher` | String | ❌ No | 2-200 chars | IEEE |
| `publicationDate` | Date | ✅ Yes | Valid date | 2023-05-15 |
| `doi` | String | ❌ No | DOI format | 10.1234/example.doi |
| `url` | String | ❌ No | Valid URL | researchgate.net/publication/123 |
| `description` | Text | ❌ No | Max 500 chars | This paper explores the application of ML... |
| `citations` | Number | ❌ No | Integer | 45 |
| `order` | Number | ✅ Yes | Integer | 1 |

---

## 📊 Additional Sections (Optional)

### 11. Awards & Honors

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `title` | String | ✅ Yes | Employee of the Year |
| `issuer` | String | ✅ Yes | Tech Corp Inc. |
| `date` | Date | ✅ Yes | 2023-12-01 |
| `description` | Text | ❌ No | Recognized for outstanding performance... |
| `order` | Number | ✅ Yes | 1 |

### 12. References

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `name` | String | ✅ Yes | Dr. Jane Smith |
| `title` | String | ✅ Yes | Senior Manager |
| `company` | String | ✅ Yes | Tech Corp Inc. |
| `email` | String | ✅ Yes | jane.smith@techcorp.com |
| `phone` | String | ❌ No | +1-234-567-8900 |
| `relationship` | String | ❌ No | Direct Supervisor |
| `order` | Number | ✅ Yes | 1 |

### 13. Hobbies & Interests

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `name` | String | ✅ Yes | Photography |
| `description` | Text | ❌ No | Landscape and portrait photography |
| `relevance` | Text | ❌ No | Develops attention to detail |
| `order` | Number | ✅ Yes | 1 |

### 14. Patents

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `title` | String | ✅ Yes | Method for Data Compression |
| `patentNumber` | String | ✅ Yes | US-1234567-B2 |
| `issueDate` | Date | ✅ Yes | 2022-08-15 |
| `inventors` | Array | ✅ Yes | ['John Doe', 'Jane Smith'] |
| `description` | Text | ❌ No | Novel approach to lossless compression... |
| `url` | String | ❌ No | patents.google.com/patent/123 |
| `order` | Number | ✅ Yes | 1 |

### 15. Courses & Training

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `name` | String | ✅ Yes | Advanced React Patterns |
| `provider` | String | ✅ Yes | Udemy |
| `completionDate` | Date | ✅ Yes | 2023-04-20 |
| `certificateUrl` | String | ❌ No | udemy.com/certificate/123 |
| `hours` | Number | ❌ No | 40 |
| `skills` | Array | ❌ No | ['React', 'TypeScript'] |
| `order` | Number | ✅ Yes | 1 |

---

## 🎨 CV Metadata & Settings

These fields control the overall CV configuration:

| Field Name | Type | Required | Example |
|------------|------|----------|---------|
| `cvTitle` | String | ✅ Yes | Software Engineer Resume |
| `templateId` | ObjectId | ✅ Yes | 507f1f77bcf86cd799439011 |
| `primaryColor` | String | ❌ No | #2563eb |
| `accentColor` | String | ❌ No | #0ea5e9 |
| `fontFamily` | String | ❌ No | Inter, sans-serif |
| `fontSize` | Enum | ❌ No | small, medium, large |
| `lineSpacing` | Enum | ❌ No | compact, normal, relaxed |
| `margins` | String | ❌ No | 1in 0.75in |
| `sectionOrder` | Array | ✅ Yes | ['summary', 'experience', 'education', 'skills'] |
| `visibility` | Object | ✅ Yes | {profilePhoto: true, dateOfBirth: false} |
| `isPublic` | Boolean | ✅ Yes | false |
| `shareToken` | String | ❌ No | abc123xyz |
| `atsScore` | Number | ❌ No | 85 |
| `lastModified` | Date | ✅ Yes | 2023-10-26T10:30:00Z |

---

## 📋 Summary Table: Section Priority

| Section | Priority | Free Tier | Premium | Professional |
|---------|----------|-----------|---------|--------------|
| Personal Info | Critical | ✅ | ✅ | ✅ |
| Summary | Critical | ✅ | ✅ | ✅ |
| Work Experience | Critical | ✅ (3 max) | ✅ Unlimited | ✅ Unlimited |
| Education | Critical | ✅ (2 max) | ✅ Unlimited | ✅ Unlimited |
| Skills | Critical | ✅ (10 max) | ✅ Unlimited | ✅ Unlimited |
| Certifications | Important | ❌ | ✅ | ✅ |
| Projects | Important | ❌ | ✅ | ✅ |
| Languages | Important | ✅ (3 max) | ✅ Unlimited | ✅ Unlimited |
| Volunteer | Optional | ❌ | ✅ | ✅ |
| Publications | Optional | ❌ | ✅ | ✅ |

---

## 🔄 Field Relationships & Dependencies

### Conditional Fields:

1. **If `isCurrent = true`** → `endDate` should be null
2. **If `doesNotExpire = true`** → `expiryDate` should be null
3. **If `summaryType = 'objective'`** → Focus on future goals (validation hint)
4. **If `employmentType = 'internship'`** → Might skip some achievement fields
5. **If `gpaScale = '4.0'`** → `gpa` max value = 4.0

### Auto-Generated Fields:

- `order`: Auto-increment within each section
- `createdAt`: Timestamp on creation
- `updatedAt`: Timestamp on modification
- `aiGenerated`: Flag when AI assists with content

---

## 💾 Data Validation Rules

### Common Validations:

```typescript
// Date Validation
startDate < endDate (if endDate exists)
startDate <= currentDate
endDate <= currentDate (unless isCurrent/isOngoing)

// String Lengths
firstName, lastName: 2-50 chars
email: Valid email format
phone: International format (+1-234-567-8900)
URLs: Valid URL format with http/https

// Numbers
proficiencyLevel: 1-10
gpa: 0-4.0 or 0-100 (depends on gpaScale)
yearsOfExperience: 0-50

// Arrays
achievements: Min 0, Max 10 items
technologies: Min 1, Max 20 items
```

---

## 🎯 Recommended Field Combinations

### For Entry-Level Candidates:
✅ Personal Info + Summary + Education + Skills + Projects + Volunteer

### For Mid-Level Professionals:
✅ Personal Info + Summary + Work Experience + Education + Skills + Certifications

### For Senior Executives:
✅ Personal Info + Summary + Work Experience + Education + Publications + Awards

### For Academics/Researchers:
✅ Personal Info + Summary + Education + Publications + Research + Teaching Experience

---

This structure provides comprehensive data capture while maintaining flexibility for different career stages and industries.