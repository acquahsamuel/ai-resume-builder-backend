# CV Content Module

This module handles the **main CV document** approach where the entire CV is stored as a single document with embedded sections.

## Files in this module:
- `cv-document.controller.ts` - Main CV document controller
- `cv-document.service.ts` - Main CV document service  
- `entities/cv-document.entity.ts` - Main CV document entity (single collection)
- `dto/create-cv-document.dto.ts` - DTO for creating CV documents
- `dto/update-cv-document.dto.ts` - DTO for updating CV documents

## Endpoints:
- `POST /api/v1/cv-document` - Create a complete CV document
- `GET /api/v1/cv-document` - Get all CV documents
- `GET /api/v1/cv-document/:id` - Get CV by ID
- `PATCH /api/v1/cv-document/:id` - Update CV document
- `DELETE /api/v1/cv-document/:id` - Delete CV document
- `GET /api/v1/cv-document/my-cvs` - Get user's CVs

## Architecture:
This uses a **monolithic approach** where all CV sections (Experience, Education, Skills, etc.) are stored as embedded objects/arrays within a single `CvDocument` collection.

