# Template Entity - Advanced Features

## Overview
The enhanced template entity now includes comprehensive customization options for CV templates.

## Features

### 1. Layout
- **Sections**: Define which sections to include
- **Section Order**: Customize the order of sections
- **Orientation**: Portrait or Landscape
- **Columns**: 1 or 2 column layout
- **Section Spacing**: Control spacing between sections

```json
{
  "layout": {
    "sections": ["header", "summary", "experience", "education", "skills"],
    "sectionOrder": ["header", "summary", "experience", "education", "skills"],
    "orientation": "portrait",
    "columns": 1,
    "sectionSpacing": 16
  }
}
```

### 2. Typography
- **Font Family**: Arial, Helvetica, Times New Roman, Georgia, Courier New
- **Heading Size**: Font size for headings
- **Subheading Size**: Font size for subheadings
- **Body Size**: Font size for body text
- **Line Height**: Line spacing
- **Font Weight**: bold, normal, etc.

```json
{
  "typography": {
    "fontFamily": "Helvetica",
    "headingSize": 18,
    "subheadingSize": 14,
    "bodySize": 11,
    "lineHeight": 1.5,
    "fontWeight": "normal"
  }
}
```

### 3. Theme & Colors
- **Primary Color**: Main brand color
- **Secondary Color**: Secondary accent color
- **Accent Color**: Highlight color
- **Background Color**: Page background
- **Text Color**: Main text color
- **Custom CSS**: Add custom styling

```json
{
  "theme": {
    "primaryColor": "#0066CC",
    "secondaryColor": "#666666",
    "accentColor": "#FF6600",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "customCSS": ".section { border-left: 2px solid #0066CC; }"
  }
}
```

### 4. Page Settings
- **Format**: A4, Letter, or Legal
- **Margins**: Top, bottom, left, right margins
- **Show Line Breaks**: Toggle line break visibility
- **Show Page Numbers**: Toggle page numbers
- **Public Sharing**: Make resume publicly accessible

```json
{
  "pageSettings": {
    "format": "A4",
    "margins": {
      "top": 20,
      "bottom": 20,
      "left": 20,
      "right": 20
    },
    "showLineBreaks": false,
    "showPageNumbers": true,
    "pageNumberFormat": "1",
    "isPublic": false
  }
}
```

### 5. Statistics
Track views and downloads for public resumes.

```json
{
  "statistics": {
    "views": 150,
    "downloads": 45,
    "lastViewedAt": "2025-10-27T10:00:00Z",
    "lastDownloadedAt": "2025-10-27T09:30:00Z"
  }
}
```

### 6. Export Settings
Configure export options for PDF and JSON.

```json
{
  "exportSettings": {
    "pdf": {
      "enabled": true,
      "quality": "high",
      "watermark": "Confidential"
    },
    "json": {
      "enabled": true,
      "includeMetadata": false
    }
  }
}
```

### 7. Notes (Private)
Private notes specific to the resume - not shared publicly.

```json
{
  "notes": {
    "content": "Target: Senior Software Engineer role at tech company. Highlight React and Node.js experience.",
    "lastEditedAt": "2025-10-27T10:00:00Z"
  }
}
```

## Full Example

```json
{
  "name": "Modern Professional Template",
  "description": "Clean and professional CV template",
  "category": "professional",
  "layout": {
    "sections": ["header", "summary", "experience", "education", "skills"],
    "sectionOrder": ["header", "summary", "experience", "education", "skills"],
    "orientation": "portrait",
    "columns": 1,
    "sectionSpacing": 16
  },
  "typography": {
    "fontFamily": "Helvetica",
    "headingSize": 18,
    "subheadingSize": 14,
    "bodySize": 11,
    "lineHeight": 1.5,
    "fontWeight": "normal"
  },
  "theme": {
    "primaryColor": "#0066CC",
    "secondaryColor": "#666666",
    "accentColor": "#FF6600",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "customCSS": ""
  },
  "pageSettings": {
    "format": "A4",
    "margins": { "top": 20, "bottom": 20, "left": 20, "right": 20 },
    "showLineBreaks": false,
    "showPageNumbers": true,
    "isPublic": false
  },
  "exportSettings": {
    "pdf": { "enabled": true, "quality": "high" },
    "json": { "enabled": true, "includeMetadata": false }
  },
  "notes": {
    "content": "Personal notes here...",
    "lastEditedAt": "2025-10-27T10:00:00Z"
  },
  "isPremium": false,
  "isActive": true
}
```

