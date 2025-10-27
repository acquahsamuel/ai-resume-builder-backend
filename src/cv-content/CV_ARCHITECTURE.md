# CV Module Architecture

## Current Structure

The `cv-content` folder contains TWO different approaches to managing CV data:

### 1. Main CV Document (cv-document.*)
**Purpose:** Store complete CV as a single document

**Files:**
- `cv-document.controller.ts` - Controller for `/api/v1/cv-document`
- `cv-document.service.ts` - Service for CV document operations
- `entities/cv-document.entity.ts` - Single collection with embedded objects
- `dto/create-cv-document.dto.ts` - DTO for creating CV
- `dto/update-cv-document.dto.ts` - DTO for updating CV

**Characteristics:**
- Single MongoDB collection
- All sections embedded as arrays/objects
- ✅ JWT Authentication added
- Good for: Export/Import, complete CV management

### 2. Individual CV Sections (controllers/, services/, entities/)
**Purpose:** Manage each CV section independently

**Files:**
- `controllers/*.controller.ts` - 15 section controllers
- `services/*.service.ts` - 15 section services
- `entities/*.entity.ts` - 15 separate collections
- `dto/create-*.dto.ts` - Section-specific DTOs

**Sections:**
1. Work Experience → `/api/v1/cv/work-experience`
2. Education → `/api/v1/cv/education`
3. Skills → `/api/v1/cv/skills`
4. Certifications → `/api/v1/cv/certifications`
5. Projects → `/api/v1/cv/projects`
6. Languages → `/api/v1/cv/languages`
7. Volunteer → `/api/v1/cv/volunteer`
8. Publications → `/api/v1/cv/publications`
9. Awards → `/api/v1/cv/awards`
10. References → `/api/v1/cv/references`
11. Hobbies → `/api/v1/cv/hobbies`
12. Patents → `/api/v1/cv/patents`
13. Courses → `/api/v1/cv/courses`
14. Personal Info → `/api/v1/cv/personal-info`
15. Professional Summary → `/api/v1/cv/professional-summary`

**Characteristics:**
- 15 separate MongoDB collections
- Each section can be modified independently
- ✅ JWT Authentication on all endpoints
- Good for: Real-time editing, modular management

## When to Use Which?

| Feature | cv-document | cv-section |
|---------|-------------|------------|
| **Get complete CV** | ✅ Best | ⚠️ Requires multiple calls |
| **Update single section** | ⚠️ Updates entire document | ✅ Best |
| **Performance** | Faster for reads | Faster for granular writes |
| **Concurrency** | May have conflicts | Better isolation |
| **Export** | ✅ Single document | ⚠️ Need aggregation |
| **Flexibility** | Limited | ✅ High flexibility |

## Recommended Structure (Future)

```
src/
├── cv-content/          # Main CV document (monolithic)
│   ├── cv-document.controller.ts
│   ├── cv-document.service.ts
│   ├── entities/cv-document.entity.ts
│   └── dto/
│       ├── create-cv-document.dto.ts
│       └── update-cv-document.dto.ts
│
└── cv-section/          # Individual CV sections (modular)
    ├── controllers/
    │   ├── work-experience.controller.ts
    │   ├── education.controller.ts
    │   └── ...
    ├── services/
    ├── entities/
    └── dto/
```

Both modules are currently in `cv-content/` and registered in `cv-content.module.ts`.

