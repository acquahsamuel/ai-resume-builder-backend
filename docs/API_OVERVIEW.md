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