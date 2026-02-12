# Portfolio Website Design - Stefan Sutanto

**Date:** 2025-02-12
**Purpose:** Job hunting portfolio for Business/System Analyst with engineering skills
**Status:** Approved

---

## Overview

A Next.js-based portfolio website showcasing Stefan Sutanto's projects with emphasis on documentation, design, and architecture. The portfolio targets Business/System Analyst roles by highlighting technical analysis and documentation capabilities.

### Key Objectives

1. Showcase existing projects from `/Users/stefan/Projects` with comprehensive documentation
2. Create BRS (Business Requirements Specification) and Architecture documents for each project
3. Demonstrate analytical thinking through structured project presentations
4. Provide filterable project catalog by tech stack and domain

---

## Technology Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Framework | Next.js 14+ (App Router) | Modern React framework, excellent DX, SEO-friendly |
| Styling | Tailwind CSS | Rapid development, easy dark theme |
| Content | MDX | Markdown + React components for rich documentation |
| Deployment | Vercel | Seamless Next.js deployment |
| Diagrams | Mermaid.js | Code-based diagrams for architecture docs |

---

## Architecture

### Project Structure

```
portfolio-stefan-sutanto/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx             # Home page with hero & personal intro
│   └── projects/
│       ├── page.tsx         # Projects listing page with filters
│       └── [slug]/
│           └── page.tsx     # Individual project detail page
├── components/
│   ├── Hero.tsx            # Personal intro section
│   ├── ProjectCard.tsx     # Project summary card
│   ├── ProjectFilter.tsx    # Filter by tech stack/domain
│   └── DocViewer.tsx        # MDX viewer for BRS/Architecture docs
├── content/
│   └── projects/           # Project markdown/MDX files with frontmatter
├── public/
│   └── images/             # Diagrams and project screenshots
└── styles/
    └── globals.css         # Tailwind imports and custom styles
```

### Key Design Decisions

1. **Static Generation:** Projects pre-rendered at build time for optimal SEO and performance. No database needed.

2. **MDX for Documentation:** BRS and architecture docs authored in Markdown/MDX, allowing code blocks, diagrams (Mermaid), and rich formatting.

3. **Separation of Concerns:** Portfolio site exists as separate folder; documentation references original project folders through relative paths or symbolic links.

4. **One-Time Manual Updates:** No CMS/database - new projects added by creating new MDX files.

---

## Content Structure

### Project Data Model

Each project includes:

**Frontmatter (YAML):**
```yaml
title: "Project Name"
description: "Brief 1-2 sentence summary"
techStack: ["Python", "FastAPI", "React", "PostgreSQL"]
domain: "Full Stack" # ML/Data Science/Web/etc
date: "2024-01-15"
status: "completed" # or "in-progress"
github: "https://github.com/..."
brsDoc: "projects/project-name/brs.md"
archDoc: "projects/project-name/architecture.md"
```

**Content Sections:**
- Problem statement
- Key achievements/metrics
- Technical highlights

### Data Flow

```
1. Original Project Analysis (One-time)
   └─> Scan /Users/stefan/Projects/*
   └─> Analyze code, notebooks, README
   └─> Generate BRS + Architecture docs
   └─> Create project metadata file

2. Portfolio Content Creation
   └─> Import metadata into /content/projects/
   └─> Each project gets a [slug].mdx file

3. Build Process (Next.js)
   └─> Parse all .mdx files
   └─> Generate static pages for each project
   └─> Build filterable project index

4. Runtime
   └─> User filters by tech stack/domain
   └─> Clicks project → navigates to /[projects/slug]
   └─> View summary + BRS + Architecture docs
```

### Filter System

- **Tech Stack Tags:** Python, React, FastAPI, Next.js, PostgreSQL, etc.
- **Domains:** ML, Data Science, Full Stack, Backend, Frontend
- **Status:** Completed, In Progress

---

## Documentation Templates

### BRS (Business Requirements Specification)

1. **Executive Summary** - Business problem, stakeholders, success criteria
2. **Business Context** - Domain analysis, market/industry background
3. **Functional Requirements** - Detailed feature specifications with use cases
4. **Non-Functional Requirements** - Performance, security, scalability needs
5. **Data Requirements** - Data sources, entities, relationships
6. **Integration Requirements** - APIs, third-party services
7. **Constraints & Assumptions** - Technical, business, timeline constraints
8. **Risk Analysis** - Identification and mitigation strategies
9. **Testing Strategy** - UAT scenarios, acceptance criteria

### Architecture Document

1. **System Overview** - High-level architecture diagram
2. **Component Architecture** - Modules, layers, responsibilities
3. **Data Architecture** - Database schema, data flow diagrams
4. **API Design** - Endpoint specifications, request/response formats
5. **Technology Stack Rationale** - Why specific tools were chosen
6. **Deployment Architecture** - Infrastructure, hosting, CI/CD
7. **Security Considerations** - Authentication, authorization, data protection
8. **Scalability & Performance** - Load handling, optimization strategies
9. **Diagrams** - Sequence diagrams, ERDs, flowcharts (Mermaid.js)

---

## UI/UX Design

### Visual Style - Minimalist Dark Theme

| Element | Value |
|---------|-------|
| Background | `#0a0a0a` (near black) |
| Card Background | `#1a1a1a` (dark gray) |
| Text Primary | `#e5e5e5` (off-white) |
| Text Secondary | `#a3a3a3` (gray) |
| Accent | `#3b82f6` (blue) |
| Border | `#262626` (subtle) |

### Components

1. **Hero Section**
   - Name: "Stefan Sutanto"
   - Tagline: "Business/System Analyst with Engineering Skills"
   - Skills summary as compact tags
   - CTA: "View Projects" button

2. **Project Cards (Grid Layout)**
   - Title + short description (2-3 lines)
   - Tech stack badges (scrollable if many)
   - Domain badge (ML/Data Science/Web/etc.)
   - "View Details" button
   - Hover: subtle glow, lift effect

3. **Project Filter Bar**
   - Sticky below nav
   - Tech stack pills (multi-select)
   - Domain dropdown
   - Active filters show × to remove

4. **Project Detail Page**
   - Header: Title, tags, links
   - Tabs: Summary | BRS | Architecture
   - MDX content with syntax highlighting
   - "Back to Projects" button

5. **DocViewer**
   - Table of contents (sticky sidebar)
   - Mermaid diagrams rendered
   - Code blocks with copy button
   - Smooth scroll navigation

---

## Projects to Document

Based on `/Users/stefan/Projects` analysis:

| Project | Domain | Tech Stack |
|---------|--------|------------|
| `ledger_test_2` | Full Stack | FastAPI, React, SQLAlchemy, PostgreSQL |
| `kaggle_comp/playground-series-s5e12` | ML/Data Science | Python, CatBoost, LightGBM, scikit-learn |
| `kaggle_comp/spaceship-titanic` | ML/Data Science | Python, (to be analyzed) |
| `gold_price_ds` | Data Science | Python, Pandas, Jupyter |
| `diabetes_saas` | (Empty - to be filled) | TBD |

---

## Implementation Phases

### Phase 1: Portfolio Setup
1. Create `portfolio-stefan-sutanto/` folder
2. Initialize Next.js 14 with TypeScript, Tailwind CSS
3. Configure dark theme and base layout
4. Create core components (Hero, ProjectCard, ProjectFilter, DocViewer)
5. Set up MDX content processing

### Phase 2: Documentation Generation
For each project:
1. Analyze codebase structure and functionality
2. Generate BRS document (9 sections)
3. Generate Architecture document with Mermaid diagrams
4. Create project metadata file with frontmatter
5. Save docs to both portfolio and original project folders

### Phase 3: Content Integration
1. Import project data into portfolio
2. Create project detail pages
3. Implement filter functionality
4. Add navigation and routing
5. Render MDX content properly

### Phase 4: Polish & Deployment
1. Responsive design verification
2. Accessibility checks
3. Performance optimization
4. Deploy to Vercel

---

## Success Criteria

- All projects have complete BRS and Architecture documents
- Portfolio successfully filters by tech stack and domain
- Documentation renders correctly with Mermaid diagrams
- Site is responsive and accessible
- Deployed and accessible via public URL
