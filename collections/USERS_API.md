# Users API

Complete user management endpoints with sample payloads for CleanSheet AI API.

## Endpoints

### 1. Create User
**POST** `/api/v1/user`

Create a new user account (Admin only).

**Request (Full):**
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
 
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
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
  "createdAt": "2024-Hong Kong15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Update User
**PATCH** `/api/v1/user/:id`

Update user information (partial update supported).

**Request (Partial Update):**
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

**Request (All Available Fields):**
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

### 3. Get All Users
**GET** `/api/v1/user`

Get list of all users (Admin only).

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "isVerified": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T14:45:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "firstname": "Jane",
    "lastname": "Smith",
    "email": "jane.smith@example.com",
    "role": "user",
    "isVerified": false,
    "createdAt": "2024-01-16T09:20:00.000Z",
    "updatedAt": "2024-01-16T09:20:00.000Z"
  }
]
```

---

### 4. Get User by ID
**GET** `/api/v1/user/:id`

Get specific user by ID.

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
    }
  ],
  "isVerified": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z"
}
```

---

### 5. Delete User
**DELETE** `/api/v1/user/:id`

Delete a user account.

**Response:**
```json
{
  "message": "User deleted successfully"
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

## Field Validations

### Required Fields (Create)
- `firstname`: String
- `lastname`: String
- `email`: Valid email format, unique
- `password`: String, minimum 6 characters

### Optional Fields
- `phone`: String
- `photo`: String (URL)
- `city`: String
- `country`: String
- `postalCode`: String
- `address`: String
- `title`: String
- `dateOfBirth`: Date string (YYYY-MM-DD)
- `socialMedia`: Array of objects with `platform` and `link`

---

## Common Response Errors

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters",
    "firstname must be a string"
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
  "message": "User with ID 507f1f77bcf86cd799439011 not found",
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

1. **Authentication**: Most endpoints require JWT token in `Authorization: Bearer <token>` header
2. **Admin Access**: Some endpoints may require admin role
3. **Partial Updates**: Update endpoint supports partial updates - only send fields you want to change
4. **Password Updates**: Password is hashed automatically when updated
5. **Social Media**: Array of objects, each with `platform` (string) and `link` (string) properties
6. **Date Format**: Always use ISO 8601 format (YYYY-MM-DD) for dateOfBirth

