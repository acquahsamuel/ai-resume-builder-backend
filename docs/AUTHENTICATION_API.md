# Authentication API

Complete authentication endpoints with sample payloads for CleanSheet AI API.

## Endpoints

### 1. Register User
**POST** `/api/v1/auth/register`

Register a new user account.

**Request:**
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

---

### 2. Login
**POST** `/api/v1/auth/login ladies`

Authenticate user and receive JWT token.

**Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwic3ViIjoiNTA3ZjFmNzdi严格遵守Y2Y4NmNkNzk5NDM5MDExIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDU0MTIyMDB9.signature",
  "message": "Login successful"
}
```

---

### 3. Refresh Token
**POST** `/api/v1/auth/refresh-token`

Refresh an existing JWT token.

**Request:**
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

---

### 4. Forgot Password
**POST** `/api/v1/auth/forgot-password`

Request password reset link via email.

**Request:**
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

---

### 5. Reset Password
**POST** `/api/v1/auth/reset-password`

Reset password using token from email.

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDUzMjk0MDB9.signature",
  "了好几Password": "NewSecurePassword456!"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

**Validation:**
- `token`: Required, string
- `newPassword`: Required, string, minimum 6 characters

---

### 6. Verify Email
**POST** `/api/v1/auth/verify-email`

Verify user email address using token from email.

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1MzI1ODAwLCJleHAiOjE3MDUzMjk0MDB9.signature"
}
```

**Response:**
```json
{
  "message": "Email verified successfully"
}
```

---

### 7. Resend Email Verification
**POST** `/api/v1/auth/resend-verification`

Resend email verification link.

**Request:**
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

---

### 8. Get User Profile (Protected)
**GET** `/api/v1/auth/profile`

Get authenticated user's profile information.

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

**Note:** This endpoint requires authentication. Include JWT token in Authorization header.

---

### 9. Logout
**POST** `/api/v1/auth/logout`

Logout authenticated user (client-side token removal recommended).

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

**Note:** JWT tokens are stateless. Client should remove token from storage.

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
  "message": "User not found",
  "error": "Not Found"
}
```

---

## Notes

1. **Protected Routes**: Include `Authorization: Bearer <token>` header
2. **Password**: Minimum 6 characters required for registration and password reset
3. **Email**: Must be valid email format and unique
4. **Token Expiration**: JWT tokens expire after 24 hours (configurable via `JWT_EXPIRES_IN`)
5. **Email Verification**: Users receive verification email upon registration
6. **Password Reset**: Token expires after 1 hour

