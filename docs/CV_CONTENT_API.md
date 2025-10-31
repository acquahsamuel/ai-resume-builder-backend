

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

