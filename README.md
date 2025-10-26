# CV Builder Backend API

A comprehensive backend API for a CV/Resume builder application built with NestJS, Mongoose, and MongoDB.

## Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Password reset and email verification
- Google OAuth integration (configurable)
- Protected routes with JWT guards

### 👤 User Management
- Complete user profiles with CV-specific fields
- Profile photo upload
- Personal information management
- Social media links

### 📄 CV Content Management
- **Work Experience**: CRUD operations with job descriptions
- **Education**: Academic background with detailed information
- **Skills**: Categorized skills with proficiency levels
- **Personal Information**: Contact details and basic info
- **File Uploads**: Profile photos and documents

### 🎨 Template System
- Multiple CV templates with different layouts
- Template categorization (Modern, Classic, Creative, etc.)
- Customizable styling options
- Premium and free templates

### 📁 File Management
- Secure file upload for profile photos
- Document upload support
- File validation and size limits
- Static file serving

### 🛠 Technical Features
- Environment-based configuration
- Global exception handling
- Input validation with class-validator
- CORS configuration
- NoSQL database with Mongoose
- Standardized API responses

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport
- **File Upload**: Multer
- **Validation**: class-validator, class-transformer
- **Environment**: dotenv

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cv-builder-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Database Setup**
   - Install and start MongoDB on your system
   - Update database credentials in `.env`
   - The application will automatically create collections on first run

5. **Start the application**
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database Configuration (MongoDB)
DB_HOST=localhost
DB_PORT=27017
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=cleansheet_resume
# Or use MongoDB URI directly
MONGODB_URI=mongodb://localhost:27017/cleansheet_resume

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Application Configuration
NODE_ENV=development
PORT=3000

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /profile` - Get user profile (protected)
- `POST /refresh-token` - Refresh JWT token
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Reset password
- `POST /verify-email` - Email verification
- `POST /resend-verification` - Resend verification email

### Users (`/api/v1/users`)
- `GET /` - Get all users (admin)
- `GET /:id` - Get user by ID
- `POST /` - Create user
- `PATCH /:id` - Update user
- `DELETE /:id` - Delete user

### Work Experience (`/api/v1/cv/work-experience`)
- `GET /` - Get user's work experiences
- `POST /` - Add work experience
- `GET /:id` - Get specific work experience
- `PATCH /:id` - Update work experience
- `DELETE /:id` - Delete work experience
- `POST /reorder` - Reorder experiences
- `POST /generate-description` - AI-powered job description generation

### File Upload (`/api/v1/upload`)
- `POST /profile-photo` - Upload profile photo
- `POST /document` - Upload document

### CV Content (`/api/v1/cv`)
- `GET /` - Get all CVs
- `POST /` - Create CV
- `GET /:id` - Get CV by ID
- `PATCH /:id` - Update CV
- `DELETE /:id` - Delete CV

## Database Schema

### User Entity
- Basic information (name, email, password)
- CV-specific fields (city, country, postal code)
- Social media links
- Profile photo
- Authentication fields

### Work Experience Entity
- Job details (title, company, location)
- Date range with current work support
- Job descriptions array
- Sort order for custom arrangement

### Education Entity
- Institution and degree information
- Academic details (GPA, coursework)
- Extracurricular activities
- Honors and awards

### Skills Entity
- Skill name and category
- Proficiency level (Beginner to Expert)
- Rating system (1-10)
- Custom sorting

### CV Template Entity
- Template metadata and categories
- Layout configuration
- Styling options
- Premium/free classification

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── guards/          # JWT guards
│   ├── strategies/      # Passport strategies
│   └── ...
├── cv-content/          # CV content management
│   ├── entities/        # Database entities
│   ├── dto/            # Data transfer objects
│   ├── services/       # Business logic
│   └── controllers/    # API endpoints
├── user/               # User management
├── upload/             # File upload handling
├── template/           # CV templates
├── config/             # Configuration files
├── common/             # Shared utilities
│   └── filters/        # Exception filters
└── main.ts            # Application entry point
```

## Development

### Available Scripts
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

### Adding New Features
1. Create the entity in the appropriate module
2. Generate DTOs for data validation
3. Implement service with business logic
4. Create controller with API endpoints
5. Add to module imports/exports
6. Write tests

## Security Considerations

- JWT tokens with configurable expiration
- Password hashing with bcrypt
- Input validation on all endpoints
- File upload validation
- CORS configuration
- Environment-based secrets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
