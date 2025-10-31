# Authentication System

Simple, clean token-based authentication using JWT and Passport.

## Structure

- **JwtStrategy** (`strategies/jwt.strategy.ts`) - Validates JWT tokens and extracts user payload
- **JwtAuthGuard** (`guards/jwt-auth.guard.ts`) - Protects routes requiring authentication
- **User Decorator** (`decorators/user.decorator.ts`) - Clean way to extract user from request

## Usage

### Protecting Routes

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('api/v1/protected')
@UseGuards(JwtAuthGuard)  // Protects all routes in controller
export class ProtectedController {
  @Get()
  async getData(@User() user) {
    // Access user info: user.userId, user.email
    return { message: `Hello ${user.email}` };
  }
}
```

### Accessing User Data

**Option 1: Using User Decorator (Recommended)**
```typescript
import { User } from './auth/decorators/user.decorator';

@Get('profile')
async getProfile(@User() user) {
  return user; // { userId: '...', email: '...' }
}

@Get('profile')
async getProfile(@User('userId') userId: string) {
  // Extract only userId
}
```

**Option 2: Using Request Object**
```typescript
import { Request } from '@nestjs/common';

@Get('profile')
async getProfile(@Request() req) {
  return req.user; // { userId: '...', email: '...' }
}
```

### Login Flow

1. User calls `POST /api/v1/auth/login` with email and password
2. Returns JWT token: `{ token: "...", message: "Login successful" }`
3. Client includes token in Authorization header: `Authorization: Bearer <token>`

## Token Format

JWT tokens contain:
```json
{
  "email": "user@example.com",
  "sub": "userId",
  "iat": 1234567890,
  "exp": 1234654290
}
```

After validation, `req.user` contains:
```json
{
  "userId": "userId",
  "email": "user@example.com"
}
```

## Error Handling

- **401 Unauthorized**: Invalid, missing, or expired token
- Clear error messages for debugging

