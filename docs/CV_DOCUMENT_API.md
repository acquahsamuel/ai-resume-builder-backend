# CV Document API Documentation

## Overview

The CV Document API enables users to create and manage multiple CVs (resumes) with different templates, sections, and custom ordering. Each user can have multiple CV documents, each with its own configuration including:

- **Title**: A custom name for each CV
- **Template**: Different template designs
- **Enabled Sections**: Choose which sections to include/exclude
- **Section Order**: Customize the display order of sections
- **Default CV**: Mark one CV as the default

## Base URL

```
/api/v1/cvs
```

## Authentication

All endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Create CV Document

Create a new CV document with custom configuration.

**Endpoint:** `POST /api/v1/cvs`

**Request Body:**

```json
{
  "title": "Software Engineer Resume",
  "description": "My professional resume for software engineering positions",
  "templateId": "template-id-123",
  "isDefault": true,
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Skills"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Skills"
  ],
  "HeaderProfileInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "title": "Software Engineer",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "country": "United States",
    "socialMedia": [
      {
        "platform": "LinkedIn",
        "link": "https://linkedin.com/in/johndoe"
      }
    ]
  },
  "ProfessionalSummary": {
    "summary": "Experienced software engineer with 5+ years...",
    "summaryType": "summary"
  },
  "Experience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "employmentType": "full-time",
      "startDate": "2020-01-01",
      "endDate": "2023-12-31",
      "isCurrent": false,
      "description": "Led development of...",
      "responsibilities": ["Developed features", "Mentored junior developers"],
      "technologies": ["JavaScript", "React", "Node.js"]
    }
  ],
  "Education": [
    {
      "institution": "University of Technology",
      "degree": "Bachelor of Science",
      "fieldOfStudy": "Computer Science",
      "startDate": "2015-09-01",
      "endDate": "2019-05-31",
      "isOngoing": false
    }
  ],
  "Skills": [
    {
      "name": "JavaScript",
      "category": "technical",
      "proficiencyLevel": 9,
      "proficiencyLabel": "expert"
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "_id": "cv-document-id-123",
  "userId": "user-id-123",
  "title": "Software Engineer Resume",
  "description": "My professional resume for software engineering positions",
  "templateId": "template-id-123",
  "isDefault": true,
  "enabledSections": ["HeaderProfileInfo", "ProfessionalSummary", "Experience", "Education", "Skills"],
  "sectionOrder": ["HeaderProfileInfo", "ProfessionalSummary", "Experience", "Education", "Skills"],
  "HeaderProfileInfo": { ... },
  "ProfessionalSummary": { ... },
  "Experience": [ ... ],
  "Education": [ ... ],
  "Skills": [ ... ],
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

**Field Descriptions:**

- `title` (optional): Name of the CV. Defaults to "My Resume" if not provided
- `description` (optional): Description or notes about the CV
- `templateId` (required): ID of the template to use
- `isDefault` (optional): Set to `true` to mark as default. Only one CV per user can be default
- `enabledSections` (optional): Array of section keys to include. Available sections:
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
  - `AdditionalSections`
- `sectionOrder` (optional): Array defining the order sections should appear

---

### 2. Get All CV Documents

Get all CV documents for the authenticated user.

**Endpoint:** `GET /api/v1/cvs`

**Response:** `200 OK`

```json
[
  {
    "_id": "cv-document-id-123",
    "title": "Software Engineer Resume",
    "templateId": "template-id-123",
    "isDefault": true,
    "createdAt": "2024-01-15T10:00:00.000Z"
  },
  {
    "_id": "cv-document-id-456",
    "title": "Data Scientist Resume",
    "templateId": "template-id-456",
    "isDefault": false,
    "createdAt": "2024-01-20T10:00:00.000Z"
  }
]
```

---

### 3. Get All User CVs (Detailed)

Get all CV documents with full details, sorted by creation date (newest first).

**Endpoint:** `GET /api/v1/cvs/my-cvs`

**Response:** `200 OK`

```json
[
  {
    "_id": "cv-document-id-123",
    "userId": "user-id-123",
    "title": "Software Engineer Resume",
    "description": "My professional resume",
    "templateId": "template-id-123",
    "isDefault": true,
    "enabledSections": ["HeaderProfileInfo", "ProfessionalSummary"],
    "sectionOrder": ["HeaderProfileInfo", "ProfessionalSummary"],
    "HeaderProfileInfo": { ... },
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

---

### 4. Get CV by ID

Get a specific CV document by ID.

**Endpoint:** `GET /api/v1/cvs/:id`

**Path Parameters:**

- `id` (string, required): CV document ID

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "userId": "user-id-123",
  "title": "Software Engineer Resume",
  "templateId": "template-id-123",
  "isDefault": true,
  "enabledSections": ["HeaderProfileInfo", "ProfessionalSummary", "Experience"],
  "sectionOrder": ["HeaderProfileInfo", "ProfessionalSummary", "Experience"],
  "HeaderProfileInfo": { ... },
  "ProfessionalSummary": { ... },
  "Experience": [ ... ],
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 5. Get Default CV

Get the user's default CV document.

**Endpoint:** `GET /api/v1/cv-document/default`

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "userId": "user-id-123",
  "title": "Software Engineer Resume",
  "templateId": "template-id-123",
  "isDefault": true,
  ...
}
```

**Response:** `200 OK` (if no default CV exists)

```json
null
```

---

### 6. Get CVs by Template

Get all CV documents using a specific template.

**Endpoint:** `GET /api/v1/cvs/template/:templateId`

**Path Parameters:**

- `templateId` (string, required): Template ID

**Response:** `200 OK`

```json
[
  {
    "_id": "cv-document-id-123",
    "title": "Software Engineer Resume",
    "templateId": "template-id-123",
    ...
  },
  {
    "_id": "cv-document-id-789",
    "title": "Alternative Resume",
    "templateId": "template-id-123",
    ...
  }
]
```

---

### 7. Generate CV (Generic)

Generate a CV document from user's profile data without specific CV configuration.

**Endpoint:** `GET /api/v1/cv-document/generate`

**Response:** `200 OK`

Returns all available sections from the user's profile in default order.

```json
{
  "userId": "user-id-123",
  "HeaderProfileInfo": { ... },
  "ProfessionalSummary": { ... },
  "Experience": [ ... ],
  "Education": [ ... ],
  "Skills": [ ... ],
  ...
}
```

---

### 8. Generate CV by ID

Generate a CV document respecting the specific CV's configuration (enabled sections and section order).

**Endpoint:** `GET /api/v1/cv-document/generate/:id`

**Path Parameters:**

- `id` (string, required): CV document ID

**Response:** `200 OK`

Returns CV data filtered and ordered according to the CV's configuration.

```json
{
  "userId": "user-id-123",
  "templateId": "template-id-123",
  "title": "Software Engineer Resume",
  "description": "My professional resume",
  "enabledSections": ["HeaderProfileInfo", "ProfessionalSummary", "Experience"],
  "sectionOrder": ["HeaderProfileInfo", "ProfessionalSummary", "Experience"],
  "HeaderProfileInfo": { ... },
  "ProfessionalSummary": { ... },
  "Experience": [ ... ]
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 9. Update CV Document

Update an existing CV document.

**Endpoint:** `PATCH /api/v1/cv-document/:id`

**Path Parameters:**

- `id` (string, required): CV document ID

**Request Body:**

All fields are optional. Only include fields you want to update.

```json
{
  "title": "Updated Resume Title",
  "description": "Updated description",
  "ProfessionalSummary": {
    "summary": "Updated summary text..."
  }
}
```

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "title": "Updated Resume Title",
  "description": "Updated description",
  ...
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 10. Set Default CV

Set a CV as the default for the user. This sets all other CVs to non-default.

**Endpoint:** `PATCH /api/v1/cv-document/:id/set-default`

**Path Parameters:**

- `id` (string, required): CV document ID

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "title": "Software Engineer Resume",
  "isDefault": true,
  ...
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 11. Duplicate CV

Create a copy of an existing CV document.

**Endpoint:** `POST /api/v1/cv-document/:id/duplicate`

**Path Parameters:**

- `id` (string, required): CV document ID to duplicate

**Request Body:**

```json
{
  "title": "Software Engineer Resume (Copy)"
}
```

**Response:** `201 Created`

```json
{
  "_id": "cv-document-id-456",
  "title": "Software Engineer Resume (Copy)",
  "templateId": "template-id-123",
  "isDefault": false,
  ...
}
```

**Notes:**

- The duplicated CV will have `isDefault: false`
- If `title` is not provided, defaults to `"{original title} (Copy)"`
- All sections and configuration are copied

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 12. Update Section Order

Update the order in which sections appear in a CV.

**Endpoint:** `PATCH /api/v1/cv-document/:id/section-order`

**Path Parameters:**

- `id` (string, required): CV document ID

**Request Body:**

```json
{
  "sectionOrder": [
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Skills",
    "HeaderProfileInfo"
  ]
}
```

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "sectionOrder": ["ProfessionalSummary", "Experience", "Education", "Skills", "HeaderProfileInfo"],
  ...
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 13. Update Enabled Sections

Update which sections are enabled/visible in a CV.

**Endpoint:** `PATCH /api/v1/cv-document/:id/enabled-sections`

**Path Parameters:**

- `id` (string, required): CV document ID

**Request Body:**

```json
{
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Skills"
  ]
}
```

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "enabledSections": ["HeaderProfileInfo", "ProfessionalSummary", "Experience", "Skills"],
  ...
}
```

**Available Section Keys:**

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
- `AdditionalSections`

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 14. Update Template

Change the template used by a CV document.

**Endpoint:** `PATCH /api/v1/cv-document/:id/template`

**Path Parameters:**

- `id` (string, required): CV document ID

**Request Body:**

```json
{
  "templateId": "new-template-id-456"
}
```

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "templateId": "new-template-id-456",
  ...
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

### 15. Delete CV Document

Delete a CV document.

**Endpoint:** `DELETE /api/v1/cv-document/:id`

**Path Parameters:**

- `id` (string, required): CV document ID

**Response:** `200 OK`

```json
{
  "_id": "cv-document-id-123",
  "title": "Software Engineer Resume",
  ...
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

---

## Use Cases

### Use Case 1: Create Multiple CVs for Different Purposes

A user wants to create different CVs for software engineering and data science positions.

```bash
# Create Software Engineering CV
POST /api/v1/cv-document
{
  "title": "Software Engineer Resume",
  "templateId": "modern-template",
  "enabledSections": ["HeaderProfileInfo", "ProfessionalSummary", "Experience", "Skills"],
  "Experience": [ ... software-focused experience ... ]
}

# Create Data Science CV
POST /api/v1/cv-document
{
  "title": "Data Scientist Resume",
  "templateId": "classic-template",
  "enabledSections": ["HeaderProfileInfo", "ProfessionalSummary", "Experience", "Education", "Projects"],
  "Experience": [ ... data science-focused experience ... ]
}
```

### Use Case 2: Customize Section Order

A user wants to reorder sections to highlight experience first.

```bash
PATCH /api/v1/cv-document/:id/section-order
{
  "sectionOrder": [
    "HeaderProfileInfo",
    "Experience",
    "ProfessionalSummary",
    "Education",
    "Skills"
  ]
}
```

### Use Case 3: Create Focused CV for Specific Industry

A user creates a simplified CV with only essential sections for a specific job application.

```bash
POST /api/v1/cv-document
{
  "title": "Focused Resume - Tech Company X",
  "templateId": "minimal-template",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Skills"
  ]
}
```

### Use Case 4: Duplicate and Customize

A user duplicates an existing CV and modifies it for a different position.

```bash
# Duplicate the CV
POST /api/v1/cv-document/:id/duplicate
{
  "title": "Software Engineer Resume - Startup Version"
}

# Update the duplicated CV
PATCH /api/v1/cv-document/:new-id
{
  "ProfessionalSummary": {
    "summary": "Startup-focused summary highlighting agility and innovation..."
  }
}
```

---

## Section Keys Reference

| Key | Description |
|-----|-------------|
| `HeaderProfileInfo` | Personal information, contact details, social media |
| `ProfessionalSummary` | Professional summary or objective |
| `Experience` | Work experience entries |
| `Education` | Educational background |
| `Skills` | Technical and soft skills |
| `Certifications` | Professional certifications |
| `Courses` | Online courses and training |
| `Awards` | Awards and recognitions |
| `Volunteer` | Volunteer work |
| `Publications` | Published papers and articles |
| `Patents` | Patents filed or granted |
| `Projects` | Personal or professional projects |
| `Languages` | Language proficiencies |
| `Hobbies` | Hobbies and interests |
| `References` | Professional references |
| `AdditionalSections` | Custom sections |

---

## Error Responses

All endpoints may return the following error responses:

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "CV not found"
}
```

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": [
    "templateId must be a string",
    "title must be a string"
  ]
}
```

---

## Notes

1. **Default CV**: When creating a CV with `isDefault: true`, all other CVs for that user are automatically set to `isDefault: false`.

2. **Section Filtering**: When generating a CV with `enabledSections`, only those sections are included. If `enabledSections` is empty or not provided, all sections with data are included.

3. **Section Ordering**: Sections are ordered according to `sectionOrder` if provided. Sections not in the order list are appended at the end.

4. **CV Generation**: The `generateCV` endpoint respects the CV's configuration (enabled sections and order) when a CV ID is provided.

5. **User Isolation**: Users can only access and modify their own CV documents. All endpoints validate user ownership.

---

## Examples

### Complete Workflow: Create and Customize a CV

```bash
# Step 1: Create a new CV
POST /api/v1/cv-document
{
  "title": "My Professional Resume",
  "templateId": "template-123",
  "isDefault": true,
  "enabledSections": ["HeaderProfileInfo", "Experience", "Education"],
  "sectionOrder": ["HeaderProfileInfo", "Experience", "Education"]
}

# Response includes CV ID: "cv-456"

# Step 2: Update section order
PATCH /api/v1/cv-document/cv-456/section-order
{
  "sectionOrder": ["HeaderProfileInfo", "Education", "Experience"]
}

# Step 3: Add more sections
PATCH /api/v1/cv-document/cv-456/enabled-sections
{
  "enabledSections": ["HeaderProfileInfo", "Experience", "Education", "Skills", "Projects"]
}

# Step 4: Generate the final CV
GET /api/v1/cv-document/generate/cv-456

# Response includes CV with sections in the specified order
```

---

## Support

For additional support or questions, please refer to the main API documentation or contact the development team.

