# CV Builder API Overview

## 🚀 Complete Backend Implementation

This CV Builder backend provides a comprehensive API for creating, managing, and customizing professional resumes/CVs. Built with NestJS, Mongoose, and MongoDB.

## ✅ Implemented Features

### 1. Authentication & Security
- **JWT-based Authentication**: Secure login/logout with token refresh
- **Password Management**: Hashing with bcrypt, password reset flow
- **Email Verification**: User account verification system
- **Protected Routes**: JWT guards on sensitive endpoints
- **Google OAuth Ready**: Infrastructure for social authentication

### 2. User Management
- **Complete User Profiles**: Extended user entity with CV-specific fields
- **Personal Information**: Contact details, location, social media links
- **Profile Photos**: Secure file upload with validation
- **Account Settings**: Update profile, change passwords

### 3. CV Content Management

#### Work Experience
- **CRUD Operations**: Full create, read, update, delete functionality
- **Rich Data Model**: Job title, company, location, dates, descriptions
- **Current Position Tracking**: Mark ongoing employment
- **Custom Ordering**: Drag-and-drop sort capability
- **AI Integration Ready**: Job description generation framework

#### Education
- **Academic Records**: Institutions, degrees, fields of study
- **Detailed Information**: GPA, coursework, activities, honors
- **Multiple Entries**: Support for multiple educational backgrounds
- **Flexible Dates**: Handle ongoing education

#### Skills Management
- **Categorized Skills**: Technical, Language, Soft Skills, Other
- **Proficiency Levels**: Beginner to Expert with numeric ratings
- **Custom Organization**: User-defined skill ordering
- **Skill Assessment**: 1-10 rating system

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

### 6. Technical Infrastructure
- **Environment Configuration**: Flexible environment-based setup
- **Database Management**: MySQL with TypeORM relationships
- **Global Exception Handling**: Standardized error responses
- **Input Validation**: Comprehensive data validation with class-validator
- **CORS Configuration**: Secure cross-origin resource sharing
- **Logging & Monitoring**: Development and production logging

## 📊 Database Schema

### Core Entities
1. **User**: Extended user profiles with CV-specific fields
2. **WorkExperience**: Detailed employment history
3. **Education**: Academic background and achievements
4. **Skill**: Categorized skills with proficiency levels
5. **CvContent**: Legacy CV content (maintained for compatibility)
6. **CvTemplate**: Template definitions and layouts

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

## 🔧 Configuration

### Environment Variables
```env
# Database (MongoDB)
DB_HOST=localhost
DB_PORT=27017
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=cleansheet_resume
# Or use MongoDB URI directly
MONGODB_URI=mongodb://localhost:27017/cleansheet_resume

# Authentication
JWT_SECRET=your-secret-key

# Application
NODE_ENV=development
PORT=3000

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

# External Services
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

### Development Setup
1. **Clone and Install**
   ```bash
   git clone <repository>
   cd cv-builder-backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Database Setup**
   - Install and start MongoDB
   - Collections auto-created on first run

4. **Start Development**
   ```bash
   npm run start:dev
   ```

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

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Security**: Configurable expiration, secure signing
- **Input Validation**: Comprehensive data sanitization
- **File Upload Security**: Type and size validation
- **Environment Isolation**: Separate dev/prod configurations
- **CORS Protection**: Controlled cross-origin access

## 📱 Integration Ready

The API is designed for easy integration with:
- **React/Angular Frontend**: CORS-enabled REST API
- **Mobile Apps**: JSON responses with proper HTTP status codes
- **Third-party Services**: Webhook-friendly architecture
- **Microservices**: Modular service architecture

## 🎯 Production Ready

- **Error Handling**: Global exception filters
- **Logging**: Structured logging for monitoring
- **Validation**: Input sanitization and validation
- **Performance**: Optimized database queries
- **Scalability**: Modular, maintainable architecture
- **Documentation**: Comprehensive API documentation

## 🔧 Maintenance & Support

- **Testing Framework**: Jest setup for unit and integration tests
- **Code Quality**: ESLint and Prettier configuration
- **Type Safety**: Full TypeScript implementation
- **Documentation**: Inline code documentation
- **Version Control**: Git-friendly project structure

---

This CV Builder backend provides a solid foundation for building a comprehensive resume/CV management application with all essential features implemented and ready for production use.