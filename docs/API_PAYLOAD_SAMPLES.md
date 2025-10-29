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

