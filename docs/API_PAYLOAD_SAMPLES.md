# API Payload Samples

Complete sample payloads for all CleanSheet AI API endpoints.

## Authentication Endpoints

### 1. Register User
**POST** `/api/v1/auth/register`

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john.doe@example.com",
  "firstname": null,
  "lastname": null,
  "role": "user",
  "isVerified": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. Login
**POST** `/api/v1/auth/login`

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwic3ViIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDExIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDU0MTIyMDB9.signature",
  "message": "Login successful"
}
```

### 3. Refresh Token
**POST** `/api/v1/auth/refresh-token`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwic3ViIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDExIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDU0MTIyMDB9.signature"
}
```

**Response:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwic3ViIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDExIiwiaWF0IjoxNzA1MzI1ODgwMCwiZXhwIjoxNzA1NDEyODgwMH0.signature",
  "message": "Token refreshed successfully"
}
```

### 4. Forgot Password
**POST** `/api/v1/auth/forgot-password`

```json
{
  "email": "john.doe@example.com"
}
```

**Response:**
```json
{
  "message": "Reset password link sent to your email"
}
```

### 5. Reset Password
**POST** `/api/v1/auth/reset-password`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDUzMjk0MDB9.signature",
  "newPassword": "NewSecurePassword456!"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

### 6. Verify Email
**POST** `/api/v1/auth/verify-email`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5c Running6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDUzMjk0MDB9.signature"
}
```

**Response:**
```json
{
  "message": "Email verified successfully"
}
```

### 7. Resend Email Verification
**POST** `/api/v1/auth/resend-verification`

```json
{
  "email": "john.doe@example.com"
}
```

**Response:**
```json
{
  "message": "Verification email resent"
}
```

### 8. Get User Profile (Protected)
**GET** `/api/v1/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "role": "user",
  "photo": "https://example.com/photos/john.jpg",
  "phone": "+1234567890",
  "city": "New York",
  "country": "United States",
  "postalCode": "10001",
  "address": "123 Main St, Apt 4B",
  "title": "Senior Software Engineer",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "socialMedia": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com/in/johndoe"
    },
    {
      "platform": "GitHub",
      "link": "https://github.com/johndoe"
    }
  ],
  "googleId": null,
  "isVerified": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z"
}
```

---

## User Management Endpoints

### 1. Create User (Admin)
**POST** `/api/v1/user`

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "phone": "+1234567890",
  "city": "New York",
  "country": "United States",
  "postalCode": "10001",
  "address": "123 Main St, Apt 4B",
  "title": "Senior Software Engineer",
  "dateOfBirth": "1990-05-15",
  "socialMedia": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com/in/johndoe"
    },
    {
      "platform": "GitHub",
      "link": "https://github.com/johndoe"
    },
    {
      "platform": "Twitter",
      "link": "https://twitter.com/johndoe"
    }
  ]
}
```

**Minimal Required Fields:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "_id": "507f1 slaves不断提升77bcf86cd799439011",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "role": "user",
  "phone": "+1234567890",
  "city": "New York",
  "country": "United States",
  "postalCode": "10001",
  "address": "123 Main St, Apt 4B",
  "title": "Senior Software Engineer",
  "dateOfBirth": "1990-05-15T00:00:00.000Z",
  "socialMedia": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com/in/johndoe"
    },
    {
      "platform": "GitHub",
      "link": "https://github.com/johndoe"
    },
    {
      "platform": "Twitter",
      "link": "https://twitter.com/johndoe"
    }
  ],
  "isVerified": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. Update User (Partial)
**PATCH** `/api/v1/user/:id`

```json
{
  "firstname": "Jane",
  "photo": "https://example.com/photos/jane.jpg",
  "city": "San Francisco",
  "country": "United States",
  "title": "Lead Software Engineer",
  "socialMedia": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com/in/janedoe"
    }
  ]
}
```

**All Available Update Fields:**
```json
{
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane.smith@example.com",
  "password": "NewSecurePassword789!",
  "phone": "+1987654321",
  "photo": "https://example.com/photos/jane.jpg",
  "city": "San Francisco",
  "country": "United States",
  "postalCode": "94102",
  "address": "456 Market St, Suite 100",
  "title": "Lead Software Engineer",
  "dateOfBirth": "1992-08-20",
  "socialMedia": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com/in/janedoe"
    },
    {
      "platform": "Portfolio",
      "link": "https://janesmith.dev"
    }
  ]
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane.smith@example.com",
  "role": "user",
  "photo": "https://example.com/photos/jane.jpg",
  "phone": "+1987654321",
  "city": "San Francisco",
  "country": "United States",
  "postalCode": "94102",
  "address": "456 Market St, Suite 100",
  "title": "Lead Software Engineer",
  "dateOfBirth": "1992-08-20T00:00:00.000Z",
  "socialMedia": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com/in/janedoe"
    },
    {
      "platform": "Portfolio",
      "link": "https://janesmith.dev"
    }
  ],
  "isVerified": true,
  "updatedAt": "2024-01-15T15:20:00.000Z"
}
```

---

## Social Media Platforms

Supported platforms for `socialMedia` array:
- LinkedIn
- GitHub
- Twitter
- Portfolio
- Facebook
- Instagram
- Behance
- Dribbble
- Medium
- YouTube
- Custom platforms

**Example:**
```json
"socialMedia": [
  {
    "platform": "LinkedIn",
    "link": "https://linkedin.com/in/username"
  },
  {
    "platform": "GitHub",
    "link": "https://github.com/username"
  },
  {
    "platform": "Portfolio",
    "link": "https://yourwebsite.com"
  }
]
```

---

## Date Formats

- **dateOfBirth**: ISO 8601 date string format (YYYY-MM-DD)
  - Example: `"1990-05-15"`
  - Will be converted to Date object in the database

---

## Common Response Errors

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid or expired token",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User尸 not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

---

## Notes

1. **Protected Routes**: Include `Authorization: Bearer <token>` header
2. **Password**: Minimum 6 characters required
3. **Email**: Must be valid email format and unique
4. **Optional Fields**: All fields except `firstname`, `lastname`, `email`, and `password` are optional when creating a user
5. **Social Media**: Array of objects with `platform` and `link` properties
6. **Date Format**: Use ISO 8601 format (YYYY-MM-DD) for dateOfBirth



# CV Builder API Overview

## 🚀 Complete Backend Implementation

This CV Builder backend provides a comprehensive API for creating, managing, and customizing professional resumes/CVs. Built with NestJS, Mongoose, and MongoDB.

## ✅ Implemented Features

### 4. Template System
- **Multiple Layouts**: Modern, Classic, Creative, Minimalist styles
- **Customizable Design**: Colors, fonts, spacing, margins
- **Premium/Free Tiers**: Support for paid template features
- **Template Categories**: Organized by profession and style
- **Preview System**: Template preview images and metadata

### 5. File Management
- **Secure Uploads**: Profile photos and document uploads
- **File Validation**: Type, size, and format checking
- **Static File Serving**: Optimized file delivery
- **Storage Organization**: Structured file storage system


### Relationships
- **User → WorkExperience**: One-to-Many
- **User → Education**: One-to-Many
- **User → Skill**: One-to-Many
- **User → CvContent**: One-to-Many

## 🛠 API Endpoints

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/register` | User registration | ❌ |
| POST | `/login` | User login | ❌ |
| POST | `/logout` | User logout | ✅ |
| GET | `/profile` | Get user profile | ✅ |
| POST | `/refresh-token` | Refresh JWT token | ❌ |
| POST | `/forgot-password` | Password reset request | ❌ |
| POST | `/reset-password` | Reset password | ❌ |
| POST | `/verify-email` | Email verification | ❌ |
| POST | `/resend-verification` | Resend verification | ❌ |

### Work Experience (`/api/v1/cv/work-experience`)
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/` | Get user's experiences | ✅ |
| POST | `/` | Add new experience | ✅ |
| GET | `/:id` | Get specific experience | ✅ |
| PATCH | `/:id` | Update experience | ✅ |
| DELETE | `/:id` | Delete experience | ✅ |
| POST | `/reorder` | Reorder experiences | ✅ |
| POST | `/generate-description` | AI job descriptions | ✅ |

### File Upload (`/api/v1/upload`)
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/profile-photo` | Upload profile photo | ✅ |
| POST | `/document` | Upload document | ✅ |

### Users (`/api/v1/users`)
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/` | Get all users | ✅ |
| GET | `/:id` | Get user by ID | ✅ |
| POST | `/` | Create user | ✅ |
| PATCH | `/:id` | Update user | ✅ |
| DELETE | `/:id` | Delete user | ✅ |

 

## 📈 Future Enhancements

### Planned Features (Ready for Implementation)
1. **AI-Powered Features**
   - Job description generation
   - Content suggestions
   - Skill recommendations

2. **PDF Generation**
   - Template-based PDF export
   - Multiple format support
   - Custom styling options

3. **Advanced Templates**
   - More template categories
   - Custom template builder
   - Template marketplace

4. **Analytics & Insights**
   - CV performance tracking
   - User engagement metrics
   - Template popularity stats

5. **Collaboration Features**
   - CV sharing and feedback
   - Recruiter dashboard
   - Application tracking

 
This CV Builder backend provides a solid foundation for building a comprehensive resume/CV management application with all essential features implemented and ready for production use.



Bug

Get all work experience **



# POST /api/v1/cvs - Sample Payloads

Complete sample payloads for creating new CV documents.

## Endpoint

```
POST /api/v1/cvs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

---

## 1. Minimal Payload (Required Fields Only)

Only `templateId` is required. All other fields are optional.

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46"
}
```

**Response:** Creates a CV with default title "My Resume", no description, all sections enabled, default section order.

---

## 2. Basic CV with Title

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Software Engineer CV"
}
```

---

## 3. Full Payload - Software Engineer CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Software Engineer CV",
  "description": "CV tailored for software engineering positions focusing on full-stack development",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "Certifications"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Skills",
    "Experience",
    "Projects",
    "Education",
    "Certifications"
  ],
  "isDefault": false
}
```

---

## 4. Academic CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Academic CV",
  "description": "CV for academic and research positions",
  "enabledSections": [
    "HeaderProfileInfo",
    "Education",
    "Publications",
    "ProfessionalSummary",
    "Experience",
    "Awards",
    "Patents",
    "References"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "Education",
    "Publications",
    "Awards",
    "ProfessionalSummary",
    "Experience",
    "Patents",
    "References"
  ],
  "isDefault": false
}
```

---

## 5. DevOps Engineer CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "DevOps Engineer CV",
  "description": "CV highlighting infrastructure and cloud expertise",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Certifications",
    "Skills",
    "Experience",
    "Projects",
    "Education"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Certifications",
    "Skills",
    "Experience",
    "Projects",
    "Education"
  ],
  "isDefault": false
}
```

---

## 6. Creative/Design CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Creative Designer CV",
  "description": "Portfolio-focused CV for design positions",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Projects",
    "Experience",
    "Skills",
    "Education",
    "Awards"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "Projects",
    "ProfessionalSummary",
    "Experience",
    "Skills",
    "Awards",
    "Education"
  ],
  "isDefault": false
}
```

---

## 7. Executive/Manager CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Executive Summary CV",
  "description": "Senior leadership position CV",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Certifications",
    "Awards",
    "References"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Certifications",
    "Awards",
    "References"
  ],
  "isDefault": false
}
```

---

## 8. Student/Entry-Level CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Entry-Level Software Developer CV",
  "description": "CV for recent graduate seeking first position",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Education",
    "Skills",
    "Projects",
    "Courses",
    "Volunteer"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Education",
    "Skills",
    "Projects",
    "Courses",
    "Volunteer"
  ],
  "isDefault": false
}
```

---

## 9. Default CV

Set the CV as default when creating:

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "My Primary Resume",
  "description": "Main CV for general use",
  "isDefault": true
}
```

**Note:** Setting `isDefault: true` will automatically unset all other CVs as default for your account.

---

## Valid Section Keys

Use these exact keys for `enabledSections` and `sectionOrder`:

- `HeaderProfileInfo` - Personal information
- `ProfessionalSummary` - Summary/Objective
- `Experience` - Work experience
- `Education` - Education history
- `Skills` - Technical and soft skills
- `Certifications` - Professional certifications
- `Courses` - Completed courses
- `Awards` - Awards and honors
- `Volunteer` - Volunteer experience
- `Publications` - Research publications
- `Patents` - Patents
- `Projects` - Projects portfolio
- `Languages` - Language proficiency
- `Hobbies` - Hobbies and interests
- `References` - Professional references

---

## Response Format

All endpoints return the generated CV with all sections populated:

```json
{
  "_id": "6904f123a6314376f7a15456",
  "userId": "6904dca6426eb4ea7289a06f",
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Software Engineer CV",
  "description": "CV tailored for software engineering positions",
  "isDefault": false,
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
    "Skills",
    "Experience",
    "Education"
  ],
  "HeaderProfileInfo": { ... },
  "ProfessionalSummary": { ... },
  "Experience": [ ... ],
  "Education": [ ... ],
  "Skills": [ ... ],
  ...
}
```

---

## Common Use Cases

### Quick Start - Minimal
```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "My CV"
}
```

### Customized for Role
```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Frontend Developer CV",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Skills",
    "Projects",
    "Experience",
    "Education"
  ],
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

### Full Customization
```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Senior Full-Stack Developer CV",
  "description": "CV for senior-level full-stack positions with 10+ years experience",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Skills",
    "Projects",
    "Certifications",
    "Education",
    "Languages"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Skills",
    "Projects",
    "Certifications",
    "Education",
    "Languages"
  ],
  "isDefault": true
}
```

---

## Error Responses

### 400 Bad Request - Invalid Template ID
```json
{
  "statusCode": 400,
  "message": ["templateId must be a string"],
  "error": "Bad Request"
}
```

### 400 Bad Request - Invalid Section Name
```json
{
  "statusCode": 400,
  "message": ["enabledSections must be an array of strings"],
  "error": "Bad Request"
}
```

---

## Tips

1. **Start Simple**: Use minimal payload first, then customize later using PATCH endpoints
2. **Section Order**: Order sections to highlight your strengths (e.g., put Skills first for technical roles)
3. **Default CV**: Only one CV can be default - setting a new one will unset the previous default
4. **Template ID**: Get available templates from `GET /api/v1/template`
5. **All Sections**: If `enabledSections` is empty or not provided, all sections with data will be included

