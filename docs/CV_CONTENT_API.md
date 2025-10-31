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



# Postman Collection - CV Content API

This Postman collection contains all endpoints for the CV Content Management API (`/api/v1/cvs`).

## 📦 Import Instructions

1. Open Postman
2. Click **Import** button (top left)
3. Select **File** tab
4. Choose `Cleansheet_AI_CV_Content_API.postman_collection.json`
5. Click **Import**

## 🔧 Setup

### 1. Configure Environment Variables

The collection uses the following variables:
- `base_url` - Base URL of your API (default: `http://localhost:4200`)
- `jwt_token` - JWT authentication token (required for all requests)
- `cv_id` - CV document ID (for endpoints that require a CV ID)
- `template_id` - Template ID (for template-related endpoints)

### 2. Get Authentication Token

Before using the CV endpoints, you need to authenticate:

**Login Request:**
```
POST {{base_url}}/api/v1/auth/login
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

Copy the `token` value and set it as the `jwt_token` variable in Postman.

### 3. Set Collection Variables

1. Click on the collection name
2. Go to the **Variables** tab
3. Update the values:
   - `base_url`: Your API base URL (e.g., `http://localhost:4200` or `https://api.yourdomain.com`)
   - `jwt_token`: Paste your JWT token from the login response

## 📋 Available Endpoints

### GET Requests

1. **Get All CVs** - `GET /api/v1/cvs`
   - Returns all CVs for the authenticated user

2. **Get My CVs** - `GET /api/v1/cvs/my-cvs`
   - Returns all CVs belonging to the authenticated user

3. **Get Default CV** - `GET /api/v1/cvs/default`
   - Returns the default CV for the authenticated user

4. **Get CV by ID** - `GET /api/v1/cvs/:id`
   - Returns a specific CV by its ID
   - Requires `cv_id` variable

5. **Get CVs by Template** - `GET /api/v1/cvs/template/:templateId`
   - Returns all CVs using a specific template
   - Requires `template_id` variable

6. **Generate CV** - `GET /api/v1/cvs/generate`
   - Generates CV using the default CV

7. **Generate CV by ID** - `GET /api/v1/cvs/generate/:id`
   - Generates a specific CV by its ID
   - Requires `cv_id` variable

### POST Requests

1. **Duplicate CV** - `POST /api/v1/cvs/:id/duplicate`
   - Duplicates an existing CV with optional new title
   - **Payload:**
     ```json
     {
       "title": "My Duplicated CV"
     }
     ```
   - **Note:** `title` is optional. If not provided, the original title will be used with a suffix.

### PATCH Requests

1. **Set Default CV** - `PATCH /api/v1/cvs/:id/set-default`
   - Sets a CV as the default CV for the user
   - Requires `cv_id` variable

2. **Update Section Order** - `PATCH /api/v1/cvs/:id/section-order`
   - Updates the order of sections in a CV
   - **Payload:**
     ```json
     {
       "sectionOrder": [
         "personal-info",
         "professional-summary",
         "work-experience",
         "education",
         "skills"
       ]
     }
     ```
   - Valid section names: `personal-info`, `professional-summary`, `work-experience`, `education`, `skills`, `certifications`, `projects`, `languages`, `volunteer`, `publications`, `awards`, `references`, `hobbies`, `patents`, `courses`

3. **Update Enabled Sections** - `PATCH /api/v1/cvs/:id/enabled-sections`
   - Updates which sections are enabled/visible in a CV
   - **Payload:**
     ```json
     {
       "enabledSections": [
         "personal-info",
         "professional-summary",
         "work-experience",
         "education",
         "skills"
       ]
     }
     ```
   - Valid section names: Same as section order

4. **Update CV Template** - `PATCH /api/v1/cvs/:id/template`
   - Updates the template used by a CV
   - **Payload:**
     ```json
     {
       "templateId": "507f1f77bcf86cd799439011"
     }
     ```
   - Requires a valid template ID

### DELETE Requests

1. **Delete CV** - `DELETE /api/v1/cvs/:id`
   - Deletes a CV by its ID
   - Requires `cv_id` variable

## 🔐 Authentication

All endpoints require JWT authentication. The token should be set in the collection variable `jwt_token` and will be automatically included in the `Authorization` header as:
```
Authorization: Bearer {{jwt_token}}
```

## 🔑 How to Get CV ID

The CV ID (`cv_id`) is required for endpoints like `/api/v1/cvs/generate/:id`, `/api/v1/cvs/:id`, etc.

### Method 1: From Generate Endpoint (Recommended)
When you call `GET /api/v1/cvs/generate`, the response now includes the `_id` field:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "...",
  "templateId": "...",
  "title": "My Resume",
  "isDefault": true,
  "HeaderProfileInfo": { ... },
  "ProfessionalSummary": { ... },
  ...
}
```

Copy the `_id` value and set it as the `cv_id` variable in Postman.

### Method 2: From Get My CVs
1. Call `GET /api/v1/cvs/my-cvs`
2. The response returns an array of CV documents:
   ```json
   [
     {
       "_id": "507f1f77bcf86cd799439011",
       "title": "My Resume",
       "isDefault": true,
       ...
     },
     {
       "_id": "507f1f77bcf86cd799439012",
       "title": "Software Engineer CV",
       "isDefault": false,
       ...
     }
   ]
   ```
3. Copy the `_id` from any CV in the array
4. Set it as the `cv_id` variable

### Method 3: From Get Default CV
1. Call `GET /api/v1/cvs/default`
2. The response includes the `_id`:
   ```json
   {
     "_id": "507f1f77bcf86cd799439011",
     "title": "My Resume",
     "isDefault": true,
     ...
   }
   ```
3. Copy the `_id` value

### Method 4: After Creating/Duplicating
When you duplicate a CV using `POST /api/v1/cvs/:id/duplicate`, the response returns the new CV with its `_id`:
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "My Duplicated CV",
  ...
}
```

## 📝 Sample Workflows

### Workflow 1: Get CV ID and Use It
1. Ensure `jwt_token` is set
2. Run **Generate CV** request (`GET /api/v1/cvs/generate`)
3. Copy the `_id` from the response
4. Set it as `cv_id` variable in Postman collection variables
5. Now you can use it in other requests like:
   - `GET /api/v1/cvs/generate/:id`
   - `GET /api/v1/cvs/:id`
   - `PATCH /api/v1/cvs/:id/set-default`
   - etc.

### Workflow 2: Get All Your CVs
1. Ensure `jwt_token` is set
2. Run **Get My CVs** request
3. Copy a CV ID from the response array
4. Set it as `cv_id` variable for other requests

### Workflow 3: Duplicate and Customize a CV
1. Get a CV ID using **Get My CVs**
2. Set `cv_id` variable
3. Run **Duplicate CV** with a new title
4. Use the returned CV ID to customize sections
5. Run **Update Section Order** or **Update Enabled Sections**

### Workflow 4: Change CV Template
1. Get a CV ID using **Get My CVs**
2. Get a template ID from `/api/v1/template` endpoint
3. Set `cv_id` and `template_id` variables
4. Run **Update CV Template**

## 🚨 Common Issues

### 401 Unauthorized
- **Solution:** Check that `jwt_token` is set correctly
- Token may have expired - login again to get a new token

### 404 Not Found
- **Solution:** Verify that `cv_id` or `template_id` variables are set correctly
- Ensure the IDs exist in your database

### 400 Bad Request
- **Solution:** Check the payload format matches the examples
- Verify all required fields are included

## 📚 Related Documentation

- Full API Documentation: `/api-docs` (Swagger UI)
- API Overview: `docs/API_OVERVIEW.md`
- CV Content API Details: `docs/CV_CONTENT_API.md`
- Payload Samples: `docs/API_PAYLOAD_SAMPLES.md`

## 🔄 Updating the Collection

When new endpoints are added or existing ones change:
1. Update the collection JSON file
2. Re-import into Postman
3. Or update directly in Postman and export to sync changes

---

**Note:** All endpoints require authentication and are scoped to the authenticated user. You can only access and modify CVs that belong to your account.

