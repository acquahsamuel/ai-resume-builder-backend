# POST /api/v1/cvs - Sample Payloads

Complete sample payloads for creating new CV documents.

## Endpoint

```
POST /api/v1/cvs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

---

## 1. Minimal Payload (Required Fields Only)

Only `templateId` is required. All other fields are optional.

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46"
}
```

**Response:** Creates a CV with default title "My Resume", no description, all sections enabled, default section order.

---

## 2. Basic CV with Title

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Software Engineer CV"
}
```

---

## 3. Full Payload - Software Engineer CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Software Engineer CV",
  "description": "CV tailored for software engineering positions focusing on full-stack development",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "Certifications"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Skills",
    "Experience",
    "Projects",
    "Education",
    "Certifications"
  ],
  "isDefault": false
}
```

---

## 4. Academic CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Academic CV",
  "description": "CV for academic and research positions",
  "enabledSections": [
    "HeaderProfileInfo",
    "Education",
    "Publications",
    "ProfessionalSummary",
    "Experience",
    "Awards",
    "Patents",
    "References"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "Education",
    "Publications",
    "Awards",
    "ProfessionalSummary",
    "Experience",
    "Patents",
    "References"
  ],
  "isDefault": false
}
```

---

## 5. DevOps Engineer CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "DevOps Engineer CV",
  "description": "CV highlighting infrastructure and cloud expertise",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Certifications",
    "Skills",
    "Experience",
    "Projects",
    "Education"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Certifications",
    "Skills",
    "Experience",
    "Projects",
    "Education"
  ],
  "isDefault": false
}
```

---

## 6. Creative/Design CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Creative Designer CV",
  "description": "Portfolio-focused CV for design positions",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Projects",
    "Experience",
    "Skills",
    "Education",
    "Awards"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "Projects",
    "ProfessionalSummary",
    "Experience",
    "Skills",
    "Awards",
    "Education"
  ],
  "isDefault": false
}
```

---

## 7. Executive/Manager CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Executive Summary CV",
  "description": "Senior leadership position CV",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Certifications",
    "Awards",
    "References"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Certifications",
    "Awards",
    "References"
  ],
  "isDefault": false
}
```

---

## 8. Student/Entry-Level CV

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Entry-Level Software Developer CV",
  "description": "CV for recent graduate seeking first position",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Education",
    "Skills",
    "Projects",
    "Courses",
    "Volunteer"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Education",
    "Skills",
    "Projects",
    "Courses",
    "Volunteer"
  ],
  "isDefault": false
}
```

---

## 9. Default CV

Set the CV as default when creating:

```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "My Primary Resume",
  "description": "Main CV for general use",
  "isDefault": true
}
```

**Note:** Setting `isDefault: true` will automatically unset all other CVs as default for your account.

---

## Valid Section Keys

Use these exact keys for `enabledSections` and `sectionOrder`:

- `HeaderProfileInfo` - Personal information
- `ProfessionalSummary` - Summary/Objective
- `Experience` - Work experience
- `Education` - Education history
- `Skills` - Technical and soft skills
- `Certifications` - Professional certifications
- `Courses` - Completed courses
- `Awards` - Awards and honors
- `Volunteer` - Volunteer experience
- `Publications` - Research publications
- `Patents` - Patents
- `Projects` - Projects portfolio
- `Languages` - Language proficiency
- `Hobbies` - Hobbies and interests
- `References` - Professional references

---

## Response Format

All endpoints return the generated CV with all sections populated:

```json
{
  "_id": "6904f123a6314376f7a15456",
  "userId": "6904dca6426eb4ea7289a06f",
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Software Engineer CV",
  "description": "CV tailored for software engineering positions",
  "isDefault": false,
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Education",
    "Skills"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Skills",
    "Experience",
    "Education"
  ],
  "HeaderProfileInfo": { ... },
  "ProfessionalSummary": { ... },
  "Experience": [ ... ],
  "Education": [ ... ],
  "Skills": [ ... ],
  ...
}
```

---

## Common Use Cases

### Quick Start - Minimal
```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "My CV"
}
```

### Customized for Role
```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Frontend Developer CV",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Skills",
    "Projects",
    "Experience",
    "Education"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Skills",
    "Projects",
    "Experience",
    "Education"
  ]
}
```

### Full Customization
```json
{
  "templateId": "6904e14148e8d6ac9a1e2e46",
  "title": "Senior Full-Stack Developer CV",
  "description": "CV for senior-level full-stack positions with 10+ years experience",
  "enabledSections": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Skills",
    "Projects",
    "Certifications",
    "Education",
    "Languages"
  ],
  "sectionOrder": [
    "HeaderProfileInfo",
    "ProfessionalSummary",
    "Experience",
    "Skills",
    "Projects",
    "Certifications",
    "Education",
    "Languages"
  ],
  "isDefault": true
}
```

---

## Error Responses

### 400 Bad Request - Invalid Template ID
```json
{
  "statusCode": 400,
  "message": ["templateId must be a string"],
  "error": "Bad Request"
}
```

### 400 Bad Request - Invalid Section Name
```json
{
  "statusCode": 400,
  "message": ["enabledSections must be an array of strings"],
  "error": "Bad Request"
}
```

---

## Tips

1. **Start Simple**: Use minimal payload first, then customize later using PATCH endpoints
2. **Section Order**: Order sections to highlight your strengths (e.g., put Skills first for technical roles)
3. **Default CV**: Only one CV can be default - setting a new one will unset the previous default
4. **Template ID**: Get available templates from `GET /api/v1/template`
5. **All Sections**: If `enabledSections` is empty or not provided, all sections with data will be included

