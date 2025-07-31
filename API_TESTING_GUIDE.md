# CV Builder API Testing Guide

## 🚀 Getting Started

### 1. Start the Server
```bash
npm run start:dev
```
Server will run on: `http://localhost:3000`

### 2. Testing Tools
- **Postman** (Recommended): Import the collection below
- **curl**: Command line testing
- **REST Client** (VS Code Extension)
- **Insomnia**: Alternative to Postman

## 📋 Complete API Endpoints

### 🔐 Authentication Endpoints

#### 1. Register User
```http
POST http://localhost:3000/api/v1/auth/register
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "firstname": null,
  "lastname": null,
  "isVerified": false,
  "createdAt": "2024-01-31T10:00:00.000Z"
}
```

#### 2. Login User
```http
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

#### 3. Get User Profile (Protected)
```http
GET http://localhost:3000/api/v1/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 4. Refresh Token
```http
POST http://localhost:3000/api/v1/auth/refresh-token
Content-Type: application/json

{
  "token": "YOUR_JWT_TOKEN_HERE"
}
```

#### 5. Forgot Password
```http
POST http://localhost:3000/api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "john.doe@example.com"
}
```

#### 6. Reset Password
```http
POST http://localhost:3000/api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "RESET_TOKEN_FROM_EMAIL",
  "newPassword": "newpassword123"
}
```

#### 7. Logout (Protected)
```http
POST http://localhost:3000/api/v1/auth/logout
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 👤 User Management Endpoints

#### 8. Get All Users (Protected)
```http
GET http://localhost:3000/api/v1/users
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 9. Get User by ID (Protected)
```http
GET http://localhost:3000/api/v1/users/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 10. Update User Profile (Protected)
```http
PATCH http://localhost:3000/api/v1/users/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "phone": "+1-555-0123",
  "city": "New York",
  "country": "United States",
  "postalCode": "10001",
  "address": "123 Main Street",
  "title": "Software Engineer",
  "socialMedia": [
    {
      "platform": "LinkedIn",
      "link": "https://linkedin.com/in/johndoe"
    },
    {
      "platform": "GitHub",
      "link": "https://github.com/johndoe"
    }
  ]
}
```

#### 11. Delete User (Protected)
```http
DELETE http://localhost:3000/api/v1/users/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 💼 Work Experience Endpoints

#### 12. Get All Work Experiences (Protected)
```http
GET http://localhost:3000/api/v1/cv/work-experience
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 13. Add Work Experience (Protected)
```http
POST http://localhost:3000/api/v1/cv/work-experience
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "jobTitle": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "city": "New York",
  "country": "United States",
  "startDate": "2021-01-15",
  "endDate": null,
  "currentlyWorking": true,
  "jobDescriptions": [
    "Led development of microservices architecture serving 1M+ users",
    "Mentored junior developers and conducted code reviews",
    "Improved system performance by 40% through optimization initiatives"
  ],
  "summary": "Leading backend development initiatives",
  "sortOrder": 0
}
```

#### 14. Get Specific Work Experience (Protected)
```http
GET http://localhost:3000/api/v1/cv/work-experience/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 15. Update Work Experience (Protected)
```http
PATCH http://localhost:3000/api/v1/cv/work-experience/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "jobTitle": "Lead Software Engineer",
  "summary": "Updated summary of responsibilities"
}
```

#### 16. Delete Work Experience (Protected)
```http
DELETE http://localhost:3000/api/v1/cv/work-experience/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 17. Reorder Work Experiences (Protected)
```http
POST http://localhost:3000/api/v1/cv/work-experience/reorder
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "experienceIds": [3, 1, 2]
}
```

#### 18. Generate Job Description (AI-Ready)
```http
POST http://localhost:3000/api/v1/cv/work-experience/generate-description
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "jobTitle": "Software Engineer",
  "company": "TechCorp"
}
```

**Expected Response:**
```json
{
  "descriptions": [
    "Managed and executed projects related to Software Engineer responsibilities",
    "Collaborated with cross-functional teams to deliver high-quality solutions",
    "Implemented best practices and improved efficiency in daily operations",
    "Contributed to team success and company growth initiatives"
  ]
}
```

### 📁 File Upload Endpoints

#### 19. Upload Profile Photo (Protected)
```http
POST http://localhost:3000/api/v1/upload/profile-photo
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data

# Form data:
# file: [SELECT_IMAGE_FILE] (JPEG, PNG, GIF - Max 5MB)
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:3000/api/v1/upload/profile-photo \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -F "file=@/path/to/your/photo.jpg"
```

#### 20. Upload Document (Protected)
```http
POST http://localhost:3000/api/v1/upload/document
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: multipart/form-data

# Form data:
# file: [SELECT_DOCUMENT_FILE] (PDF, DOC, DOCX, TXT - Max 5MB)
```

### 📄 CV Content Endpoints (Legacy)

#### 21. Get All CVs (Protected)
```http
GET http://localhost:3000/api/v1/cv
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 22. Create CV (Protected)
```http
POST http://localhost:3000/api/v1/cv
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "templateId": "1",
  "HeaderProfileInfo": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "city": "New York",
    "country": "United States"
  }
}
```

#### 23. Get CV by ID (Protected)
```http
GET http://localhost:3000/api/v1/cv/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### 24. Update CV (Protected)
```http
PATCH http://localhost:3000/api/v1/cv/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json

{
  "HeaderProfileInfo": {
    "firstname": "John Updated",
    "lastname": "Doe Updated"
  }
}
```

#### 25. Delete CV (Protected)
```http
DELETE http://localhost:3000/api/v1/cv/1
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## 📋 Postman Collection

### Import this JSON into Postman:

```json
{
  "info": {
    "name": "CV Builder API",
    "description": "Complete API collection for CV Builder backend",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{jwt_token}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000",
      "type": "string"
    },
    {
      "key": "jwt_token",
      "value": "",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/v1/auth/register",
              "host": ["{{base_url}}"],
              "path": ["api", "v1", "auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/v1/auth/login",
              "host": ["{{base_url}}"],
              "path": ["api", "v1", "auth", "login"]
            }
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 200) {",
                  "    const response = pm.response.json();",
                  "    pm.collectionVariables.set('jwt_token', response.token);",
                  "}"
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## 🧪 Testing Workflow

### Step 1: Authentication Flow
1. **Register a new user** → Get user ID
2. **Login** → Get JWT token (save this!)
3. **Get profile** → Verify authentication works

### Step 2: User Profile Management
1. **Update user profile** → Add personal information
2. **Upload profile photo** → Test file upload
3. **Get updated profile** → Verify changes

### Step 3: Work Experience Management
1. **Add work experience** → Create first experience
2. **Get all experiences** → Verify creation
3. **Update experience** → Modify details
4. **Add second experience** → Create multiple entries
5. **Reorder experiences** → Test sorting
6. **Generate job description** → Test AI feature
7. **Delete experience** → Test deletion

### Step 4: File Upload Testing
1. **Prepare test files:**
   - Image: JPEG/PNG < 5MB for profile photo
   - Document: PDF/DOC < 5MB for document upload
2. **Test successful uploads**
3. **Test validation** (wrong file type, too large)

## ⚠️ Common Issues & Solutions

### 1. Authentication Issues
- **401 Unauthorized**: Check if JWT token is included in Authorization header
- **Token format**: Use `Bearer YOUR_JWT_TOKEN`
- **Token expiry**: Login again to get fresh token

### 2. Validation Errors
- **400 Bad Request**: Check request body format and required fields
- **Missing fields**: Ensure all required fields are provided
- **Data types**: Verify date formats (YYYY-MM-DD) and other data types

### 3. File Upload Issues
- **File size**: Max 5MB per file
- **File types**: 
  - Images: JPEG, PNG, GIF
  - Documents: PDF, DOC, DOCX, TXT
- **Form data**: Use `multipart/form-data` content type

### 4. Database Connection
- **Ensure MySQL is running**
- **Check database credentials in .env**
- **Database will be created automatically**

## 🔍 Testing Checklist

### ✅ Authentication
- [ ] User registration
- [ ] User login
- [ ] JWT token validation
- [ ] Profile access
- [ ] Password reset flow
- [ ] Token refresh

### ✅ User Management
- [ ] Profile updates
- [ ] Social media links
- [ ] Address information
- [ ] Profile photo upload

### ✅ Work Experience
- [ ] Create experience
- [ ] Read experiences
- [ ] Update experience
- [ ] Delete experience
- [ ] Reorder experiences
- [ ] AI job descriptions

### ✅ File Operations
- [ ] Profile photo upload
- [ ] Document upload
- [ ] File validation
- [ ] File access via URL

### ✅ Error Handling
- [ ] Invalid credentials
- [ ] Missing authorization
- [ ] Validation errors
- [ ] File upload errors
- [ ] Database errors

## 📊 Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "timestamp": "2024-01-31T10:00:00.000Z",
  "path": "/api/v1/auth/login",
  "method": "POST",
  "message": ["Email is required", "Password is required"]
}
```

---

## 🚀 Quick Start Testing

1. **Start the server**: `npm run start:dev`
2. **Import Postman collection** above
3. **Set base_url variable** to `http://localhost:3000`
4. **Run the Authentication → Login** request
5. **JWT token will be automatically saved**
6. **Test other endpoints** using the saved token

This comprehensive testing guide covers all available endpoints with examples and common troubleshooting steps!