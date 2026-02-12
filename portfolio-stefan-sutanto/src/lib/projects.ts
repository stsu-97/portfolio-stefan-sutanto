/**
 * Project data and utilities
 */

export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  domain: string;
  date: string;
  status: "completed" | "in-progress";
  github?: string;
  liveDemo?: string;
  summary: string;
  brsContent?: string;
  archContent?: string;
}

/**
 * Project data - manually maintained for simplicity
 */
export const projects: Project[] = [
  {
    slug: "ledger-system",
    title: "Ledger System",
    description:
      "A modern accounting and invoicing system inspired by Jurnal.id, featuring double-entry bookkeeping, invoice management, expense tracking, and a React dashboard.",
    techStack: ["FastAPI", "React", "TypeScript", "SQLAlchemy", "PostgreSQL"],
    domain: "Full Stack",
    date: "2024-12",
    status: "completed",
    github: "https://github.com/stefansutanto/ledger-system",
    summary: `
# Ledger System

## Overview
A full-stack accounting application built with FastAPI backend and React frontend, implementing core accounting features including invoice management, expense tracking, and double-entry bookkeeping.

## Key Features
- 📄 Invoice Management - Create and track customer invoices
- 💰 Expense Tracking - Record and categorize business expenses
- 📋 Bills Management - Manage vendor bills and payments
- 👥 Contact Management - Maintain customer and vendor databases
- 💾 Journal Entries - Double-entry bookkeeping system
- 📊 Dashboard - Overview of all transactions

## Technical Highlights
- RESTful API design with FastAPI
- SQLAlchemy ORM for database abstraction
- Type-safe frontend with TypeScript
- Modular component architecture

## Achievement
Successfully implemented a complete accounting system with proper financial data integrity and validation.
    `,
    brsContent: `# Business Requirements Specification: Ledger System

## 1. Executive Summary

### Business Problem
Small and medium businesses in Indonesia lack access to affordable, user-friendly accounting software that complies with local business practices. International solutions like QuickBooks and Xero are expensive and not optimized for Indonesian market needs (IDR currency, local tax compliance, localization).

### Stakeholders
- **Primary Users**: Small business owners, accountants, bookkeepers
- **Secondary Users**: Finance managers, business consultants
- **Technical Stakeholders**: Development team, system administrators

### Success Criteria
- Enable users to create and manage invoices in under 2 minutes
- Support double-entry bookkeeping with automatic journal entry generation
- Provide accurate financial reports (Trial Balance, Profit & Loss)
- Achieve 99.9% data accuracy for financial calculations
- Support Indonesian Rupiah (IDR) as primary currency with multi-currency capability

## 2. Business Context

### Domain Analysis
The accounting software market in Indonesia is growing rapidly, driven by:
- Increasing digital transformation among SMEs
- Government push for tax digitization
- Growing startup ecosystem

Key competitors include:
- **Jurnal.id** - Market leader, comprehensive but expensive
- **Accurate** - Established player, complex UI
- **FreshBooks** - International, not IDR-optimized
- **Zahir** - Local solution, outdated interface

### Market/Industry Background
Indonesia's SME sector represents 60% of GDP and employs 97% of workforce. However, only 20% use digital accounting solutions, primarily due to:
- Cost barriers (premium solutions cost $20-50/month)
- Complexity of existing tools
- Lack of localization features

## 3. Functional Requirements

### 3.1 Transaction Management

#### FR-001: Sales Transaction Management
**Description**: System shall allow creation and management of sales transactions including invoices, sales orders, quotations, and delivery orders.

**Use Case**: Create Sales Invoice
1. User navigates to Sales module
2. User selects "Create New Invoice"
3. System displays invoice form with customer selection
4. User enters transaction details (date, due date, payment terms)
5. User adds line items (description, quantity, unit price)
6. System calculates subtotal and total automatically
7. User submits invoice
8. System generates unique invoice number (e.g., SI-2412-ABC123)
9. System creates corresponding journal entries

**Acceptance Criteria**:
- Invoice number format: {Type Code}-{YYMM}-{Unique ID}
- Automatic calculation of line item amounts
- Support for multiple currencies (IDR, USD, EUR)
- Payment terms: Net 15, Net 30, Net 60, Due on Receipt

#### FR-002: Purchase Transaction Management
**Description**: System shall manage purchase-related transactions including bills, purchase orders, and vendor payments.

**Use Case**: Record Vendor Bill
1. User selects Purchases module
2. User creates new bill
3. User selects vendor from contact database
4. User enters bill details and line items
5. System calculates totals
6. Bill is saved with draft status
7. User can update status to sent/open/paid

**Acceptance Criteria**:
- Support for vendor bills and purchase orders
- Automatic bill number generation (PI-{YYMM}-{Unique ID})
- Status tracking: draft, sent, open, paid, overdue, cancelled

#### FR-003: Expense Management
**Description**: System shall enable recording and tracking of business expenses with categorization and approval workflow.

**Use Case**: Record Business Expense
1. User accesses Expense form
2. User enters expense details (category, beneficiary, amount)
3. User attaches receipts (future enhancement)
4. System records expense with unique number
5. If requires_approval=true, route for approval

**Acceptance Criteria**:
- Expense categories: Office supplies, Travel, Entertainment, Utilities, Salary, Marketing, Other
- Optional approval workflow
- Expense number format: EXP-{YYMM}-{Unique ID}

### 3.2 Contact Management

#### FR-004: Customer and Vendor Database
**Description**: System shall maintain a centralized database of customers and vendors.

**Data Requirements**:
- Name (required)
- Email address (unique, required)
- Phone number
- Billing address
- City, Country
- Contact Type: Customer or Vendor

**Acceptance Criteria**:
- CRUD operations on contacts
- Search and filter functionality
- Unique email validation

### 3.3 Reporting

#### FR-005: Financial Reports
**Description**: System shall generate standard accounting reports.

**Report Types**:
1. **Trial Balance**: Debit and credit balances for all accounts
2. **Dashboard Metrics**:
   - Unpaid invoices total
   - Overdue invoices total
   - Payments received/sent (30-day period)
   - Monthly expenses summary

**Acceptance Criteria**:
- Reports exportable to PDF
- Date-range filtering
- Real-time calculation

### 3.4 Double-Entry Bookkeeping

#### FR-006: Journal Entry Generation
**Description**: System shall automatically generate journal entries for each transaction following double-entry principles.

**Rules**:
- Every transaction must balance (debits = credits)
- Invoice sales: Debit Accounts Receivable, Credit Revenue
- Bill purchases: Debit Expense, Credit Accounts Payable
- Payments: Debit Accounts Payable/Cash, Credit Cash/Bank

**Account Types**:
- Asset (debit balance)
- Liability (credit balance)
- Equity (credit balance)
- Revenue (credit balance)
- Expense (debit balance)

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- **Response Time**: API responses under 500ms (p95)
- **Page Load**: Initial application load under 3 seconds
- **Concurrent Users**: Support 100 simultaneous users
- **Database Queries**: All queries execute under 200ms with proper indexing

### 4.2 Security Requirements
- **Authentication**: Username/password with session management (future)
- **Authorization**: Role-based access control (future)
- **Data Protection**: All sensitive data encrypted at rest
- **API Security**: CORS restrictions, input validation, SQL injection prevention
- **Password Storage**: Bcrypt hashing with minimum 10 rounds

### 4.3 Scalability Requirements
- **Horizontal Scaling**: Stateless API design for load balancing
- **Database**: Support for migration from SQLite to PostgreSQL
- **Multi-tenancy**: Architecture supports multiple companies per database instance

### 4.4 Usability Requirements
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Mobile Responsiveness**: Full functionality on tablet devices
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Language**: Primary interface in English with IDR localization

### 4.5 Reliability Requirements
- **Uptime**: 99.5% availability target
- **Data Integrity**: ACID compliance for all transactions
- **Backup**: Daily automated backups with 30-day retention

## 5. Data Requirements

### 5.1 Data Sources
- **User Input**: All transaction and contact data entered manually
- **System Generated**: Transaction numbers, timestamps, calculated amounts
- **External APIs** (future): Bank feeds, tax rates

### 5.2 Data Entities

#### Transaction
| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key |
| type | String | sales, purchase, expense, payment |
| category | String | invoice, order, quotation, delivery |
| transaction_number | String | Unique business identifier |
| contact_id | Integer | Foreign key to Contact |
| transaction_date | DateTime | Transaction date |
| due_date | DateTime | Payment due date |
| subtotal | Float | Sum of line items |
| tax | Float | Tax amount (future) |
| total | Float | Grand total |
| balance_due | Float | Outstanding amount |
| status | String | draft, sent, open, paid, overdue, cancelled |
| currency | String | ISO 4217 currency code |

#### Contact
| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key |
| name | String | Contact name |
| email | String | Unique email address |
| phone | String | Phone number |
| address | Text | Full address |
| city | String | City |
| country | String | Country |
| contact_type | String | customer, vendor |

#### TransactionItem
| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key |
| transaction_id | Integer | Foreign key to Transaction |
| description | String | Item description |
| quantity | Float | Quantity |
| unit_price | Float | Price per unit |
| amount | Float | Calculated amount |

#### Account
| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key |
| code | String | Account code |
| name | String | Account name |
| account_type | String | asset, liability, equity, revenue, expense |
| balance | Float | Running balance |

#### JournalEntry
| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key |
| transaction_id | Integer | Foreign key to Transaction |
| account_id | Integer | Foreign key to Account |
| debit | Float | Debit amount |
| credit | Float | Credit amount |
| description | String | Entry description |
| entry_date | DateTime | Entry date |

### 5.3 Data Relationships
\`\`\`
Contact (1) ----< (N) Transaction
Transaction (1) ----< (N) TransactionItem
Transaction (1) ----< (N) JournalEntry
Account (1) ----< (N) JournalEntry
\`\`\`

## 6. Integration Requirements

### 6.1 APIs
- **Internal REST API**: All frontend-backend communication via REST
- **Future Integrations**:
  - Payment gateways (Midtrans, Xendit)
  - E-invoicing ( Indonesian tax system)
  - Bank APIs for transaction import

### 6.2 Third-Party Services (Future)
- **Email Service**: Send invoices and payment reminders
- **PDF Generation**: ReportLab for server-side PDF
- **Authentication**: OAuth 2.0 providers (Google, Microsoft)

## 7. Constraints & Assumptions

### 7.1 Technical Constraints
- **Backend**: Must use Python with FastAPI framework
- **Frontend**: Must use React with TypeScript
- **Database**: SQLite for development, PostgreSQL for production
- **Deployment**: Must support containerization (Docker)

### 7.2 Business Constraints
- **Budget**: Self-funded development phase
- **Timeline**: MVP within 6 months
- **Regulatory**: Must comply with Indonesian accounting standards (PSAK)

### 7.3 Assumptions
- Users have basic accounting knowledge
- Internet connectivity is available
- IDR is the primary currency
- Tax rate is flat 11% (future configurable)

## 8. Risk Analysis

### 8.1 Identified Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data corruption | Low | Critical | Daily backups, database transactions |
| SQL injection attacks | Medium | High | ORM usage, input validation |
| Payment calculation errors | Low | Critical | Comprehensive testing, code reviews |
| Multi-currency rounding issues | Medium | Medium | Use Decimal for monetary values |
| User adoption resistance | High | High | Intuitive UI, user training, documentation |

### 8.2 Mitigation Strategies
- **Data Integrity**: Foreign key constraints, transaction rollbacks
- **Security**: Regular security audits, dependency updates
- **Quality**: Automated testing (pytest), manual QA
- **Adoption**: User feedback loops, iterative improvements

## 9. Testing Strategy

### 9.1 Test Scenarios

#### Functional Testing
| Scenario | Expected Result |
|----------|-----------------|
| Create invoice with valid data | Invoice saved with unique number |
| Create invoice with past date | Error message displayed |
| Delete paid invoice | Prevented with error |
| Edit draft transaction | Successfully updated |
| Generate trial balance | Debits = Credits |
| Export report to PDF | PDF generated successfully |

#### Integration Testing
| Scenario | Expected Result |
|----------|-----------------|
| Frontend-backend API calls | Proper data exchange |
| Database transaction commit | Data persisted correctly |
| Concurrent transaction creation | No duplicate numbers |

#### Performance Testing
| Scenario | Expected Result |
|----------|-----------------|
| 100 concurrent users | Response time < 500ms |
| Large dataset query (10k+ transactions) | Results < 2 seconds |
| PDF report generation | Complete < 5 seconds |

### 9.2 Acceptance Criteria
- All functional requirements pass testing
- API documentation (Swagger) is complete
- Code coverage > 80%
- No critical bugs remaining
- User acceptance testing signed off

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: Stefan Sutanto
**Status**: Approved for Development
`,
    archContent: `# Architecture Document: Ledger System

## 1. System Overview

The Ledger System is a full-stack web application implementing double-entry accounting principles. The system follows a client-server architecture with clear separation of concerns:

- **Frontend**: React SPA (Single Page Application) with TypeScript
- **Backend**: FastAPI REST API with async support
- **Database**: SQLite (development) / PostgreSQL (production)
- **Communication**: REST over HTTP with JSON payloads

The architecture prioritizes maintainability, testability, and scalability while maintaining simplicity for the MVP phase.

\`\`\`mermaid
graph TB
    subgraph "Client Layer"
        FE[React Frontend<br/>TypeScript + Vite]
    end

    subgraph "API Layer"
        CORS[CORS Middleware]
        ROUTER[API Router]
        TRANS[Transactions API]
        RPT[Reports API]
        CT[Contacts API]
    end

    subgraph "Business Logic Layer"
        TSVC[Transaction Service]
        RSVC[Report Service]
        TB[Trial Balance Service]
    end

    subgraph "Data Access Layer"
        ORM[SQLAlchemy ORM]
        MODELS[Pydantic Schemas]
    end

    subgraph "Data Layer"
        DB[(SQLite/PostgreSQL)]
    end

    FE -->|HTTP/JSON| CORS
    CORS --> ROUTER
    ROUTER --> TRANS
    ROUTER --> RPT
    ROUTER --> CT
    TRANS --> TSVC
    RPT --> RSVC
    RPT --> TB
    TSVC --> ORM
    RSVC --> ORM
    ORM --> MODELS
    ORM --> DB
\`\`\`

## 2. Component Architecture

### 2.1 Frontend Architecture

\`\`\`
frontend/src/
├── components/
│   ├── Sidebar.tsx          # Navigation component
│   └── Layout.tsx           # App layout wrapper
├── pages/
│   ├── Dashboard.tsx        # Main overview
│   ├── Sales.tsx            # Sales list & management
│   ├── Purchases.tsx        # Purchases list & management
│   ├── Expenses.tsx         # Expense list & management
│   ├── InvoiceForm.tsx      # Invoice creation
│   ├── ExpenseForm.tsx      # Expense recording
│   └── Reports.tsx          # Financial reports
├── App.tsx                  # Root component with routing
└── main.tsx                 # Application entry point
\`\`\`

**Component Responsibilities**:

| Component | Responsibility |
|-----------|----------------|
| Sidebar | Navigation menu, route links |
| Dashboard | Overview metrics, recent transactions |
| Sales/Purchases/Expenses | Transaction list views with filtering |
| InvoiceForm | Invoice creation with line items |
| ExpenseForm | Expense recording with categories |
| Reports | Trial balance display, PDF export |

### 2.2 Backend Architecture

\`\`\`
backend/app/
├── main.py                  # FastAPI application setup
├── database.py              # Database configuration & session
├── models/
│   └── transaction.py      # SQLAlchemy models
├── schemas/                 # Pydantic validation schemas
├── routes/
│   ├── transactions_v2.py  # Transaction endpoints
│   ├── transactions.py      # Legacy transaction endpoints
│   ├── contacts.py          # Contact management
│   └── reports.py          # Report generation
└── services/
    └── trial_balance_service.py  # Business logic for reports
\`\`\`

**Layer Responsibilities**:

| Layer | Responsibility |
|-------|----------------|
| Routes (API) | HTTP request handling, validation |
| Services | Business logic, calculations |
| Models | Data persistence, relationships |
| Schemas | Request/response validation |

### 2.3 API Versioning Strategy

The system implements API versioning through URL prefixes:
- \`/api/v2/transactions/\` - Current version (recommended)
- \`/api/transactions/\` - Legacy version (maintained for compatibility)

## 3. Data Architecture

### 3.1 Database Schema

\`\`\`mermaid
erDiagram
    CONTACT ||--o{ TRANSACTION : places
    TRANSACTION ||--|{ TRANSACTION_ITEM : contains
    TRANSACTION ||--o{ JOURNAL_ENTRY : generates
    ACCOUNT ||--o{ JOURNAL_ENTRY : appears_in

    CONTACT {
        int id PK
        string name
        string email UK
        string phone
        text address
        string city
        string country
        string contact_type
        datetime created_at
        datetime updated_at
    }

    TRANSACTION {
        int id PK
        string type
        string category
        string transaction_number UK
        int contact_id FK
        datetime transaction_date
        datetime due_date
        float subtotal
        float tax
        float total
        float balance_due
        string status
        string currency
        text notes
        datetime created_at
        datetime updated_at
    }

    TRANSACTION_ITEM {
        int id PK
        int transaction_id FK
        string description
        float quantity
        float unit_price
        float amount
        datetime created_at
    }

    ACCOUNT {
        int id PK
        string code UK
        string name
        string account_type
        float balance
        datetime created_at
    }

    JOURNAL_ENTRY {
        int id PK
        int transaction_id FK
        int account_id FK
        float debit
        float credit
        string description
        datetime entry_date
        datetime created_at
    }
\`\`\`

### 3.2 Data Flow Diagram

\`\`\`mermaid
sequenceDiagram
    actor User
    participant UI as React UI
    participant API as FastAPI
    participant DB as Database

    User->>UI: Create Invoice
    UI->>UI: Validate Form
    UI->>API: POST /api/v2/transactions/sales
    API->>API: Generate Transaction Number
    API->>API: Calculate Totals
    API->>DB: Begin Transaction
    API->>DB: Insert Transaction
    API->>DB: Insert Transaction Items
    API->>DB: Create Journal Entries
    DB-->>API: Commit Success
    API-->>UI: Return Created Transaction
    UI-->>User: Display Success
\`\`\`

### 3.3 Transaction State Machine

\`\`\`mermaid
stateDiagram-v2
    [*] --> Draft: Create Transaction
    Draft --> Sent: Send to Customer/Vendor
    Sent --> Open: Acknowledged
    Sent --> Draft: Rejected
    Open --> Paid: Payment Received
    Open --> Overdue: Past Due Date
    Overdue --> Paid: Late Payment
    Paid --> [*]: Archived
    Draft --> [*]: Deleted
    Sent --> Cancelled: Cancelled
    Open --> Cancelled: Cancelled
\`\`\`

## 4. API Design

### 4.1 Transaction Endpoints

#### Sales Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/v2/transactions/sales\` | List all sales |
| GET | \`/api/v2/transactions/sales/{id}\` | Get single sale |
| POST | \`/api/v2/transactions/sales\` | Create sale |
| PUT | \`/api/v2/transactions/sales/{id}\` | Update sale |
| DELETE | \`/api/v2/transactions/sales/{id}\` | Delete sale |

#### Purchase Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/v2/transactions/purchases\` | List all purchases |
| GET | \`/api/v2/transactions/purchases/{id}\` | Get single purchase |
| POST | \`/api/v2/transactions/purchases\` | Create purchase |
| PUT | \`/api/v2/transactions/purchases/{id}\` | Update purchase |
| DELETE | \`/api/v2/transactions/purchases/{id}\` | Delete purchase |

#### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/v2/transactions/expenses\` | List all expenses |
| GET | \`/api/v2/transactions/expenses/{id}\` | Get single expense |
| POST | \`/api/v2/transactions/expenses\` | Create expense |
| PUT | \`/api/v2/transactions/expenses/{id}\` | Update expense |
| DELETE | \`/api/v2/transactions/expenses/{id}\` | Delete expense |

#### Dashboard Metrics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/v2/transactions/dashboard/sales\` | Sales metrics |
| GET | \`/api/v2/transactions/dashboard/purchases\` | Purchase metrics |
| GET | \`/api/v2/transactions/dashboard/expenses\` | Expense metrics |

### 4.2 Reports Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/reports/trial-balance\` | Trial balance data |
| GET | \`/api/reports/trial-balance/pdf\` | Export trial balance PDF |

### 4.3 API Request/Response Examples

**Create Sale Request**:
\`\`\`json
POST /api/v2/transactions/sales
{
  "contact_id": 1,
  "email": "customer@example.com",
  "billing_address": "Jl. Sudirman No. 1",
  "transaction_date": "2024-12-01",
  "due_date": "2024-12-31",
  "currency": "IDR",
  "notes": "Payment due within 30 days",
  "items": [
    {
      "description": "Web Development Services",
      "quantity": 1,
      "unit_price": 5000000
    }
  ]
}
\`\`\`

**Create Sale Response**:
\`\`\`json
{
  "id": 1,
  "type": "sales",
  "category": "invoice",
  "transaction_number": "SI-2412-A3F9B2",
  "contact_id": 1,
  "transaction_date": "2024-12-01T00:00:00",
  "due_date": "2024-12-31T00:00:00",
  "subtotal": 5000000,
  "total": 5000000,
  "balance_due": 5000000,
  "status": "draft",
  "currency": "IDR"
}
\`\`\`

## 5. Technology Stack Rationale

### 5.1 Backend Technologies

| Technology | Version | Justification |
|------------|----------|--------------|
| **FastAPI** | 0.104.1 | Modern, fast Python framework with automatic API docs |
| **SQLAlchemy** | 2.0.23 | Mature ORM with relationship management and migrations |
| **Pydantic** | 2.5.0 | Data validation, automatic JSON serialization |
| **Uvicorn** | 0.24.0 | ASGI server with excellent performance |
| **ReportLab** | 4.0.7 | PDF generation for reports |

**Why FastAPI**:
- Native async/await support for better performance
- Automatic OpenAPI documentation (Swagger UI)
- Type hints and Pydantic integration
- Fast execution time (comparable to NodeJS and Go)

### 5.2 Frontend Technologies

| Technology | Version | Justification |
|------------|----------|--------------|
| **React** | 18.2.0 | Component-based architecture, large ecosystem |
| **TypeScript** | 5.3.0 | Type safety, better developer experience |
| **Vite** | 5.0.0 | Fast HMR, optimized builds |
| **React Router** | 6.20.0 | Declarative routing |
| **Axios** | 1.6.0 | Promise-based HTTP client |

**Why React + TypeScript**:
- Strong typing prevents runtime errors
- Excellent developer tooling
- Component reusability
- Large talent pool for hiring

### 5.3 Database Choice

| Feature | SQLite | PostgreSQL |
|---------|---------|------------|
| Development | ✅ Recommended | - |
| Production | - | ✅ Recommended |
| Reasoning | Zero configuration, file-based | ACID compliance, scalability |

## 6. Deployment Architecture

### 6.1 Development Environment

\`\`\`mermaid
graph LR
    DEV[Developer Machine] -->|npm run dev| VITE[Vite Dev Server]
    VITE -->|localhost:5173| REACT[React SPA]
    DEV -->|uvicorn| API[FastAPI]
    API -->|sqlite:///| DEVDB[ledger.db]

    REACT -->|CORS| API
\`\`\`

### 6.2 Production Architecture (Planned)

\`\`\`mermaid
graph TB
    subgraph "CDN"
        CF[CloudFlare]
    end

    subgraph "Application Server"
        Docker[Docker Container]
        FE[React Build<br/>Nginx Static]
        API[FastAPI<br/>Uvicorn]
    end

    subgraph "Database"
        PG[(PostgreSQL<br/>Managed Database)]
    end

    subgraph "Storage"
        S3[S3/Backblaze<br/>File Storage]
    end

    CF --> Docker
    Docker --> FE
    Docker --> API
    API --> PG
    API --> S3
\`\`\`

### 6.3 CI/CD Pipeline (Future)

\`\`\`mermaid
graph LR
    GIT[Git Push] --> GH[GitHub Actions]
    GH --> TEST[Run Tests]
    TEST -->|Pass| BUILD[Build Docker Image]
    TEST -->|Fail| NOTIFY[Notify Developers]
    BUILD --> DEPLOY[Deploy to Production]
\`\`\`

**Pipeline Stages**:
1. **Lint**: ESLint for frontend, Black for backend
2. **Test**: pytest (backend), Jest (frontend)
3. **Build**: Docker images
4. **Deploy**: Automated deployment

## 7. Security Considerations

### 7.1 Current Security Measures

| Concern | Implementation |
|---------|----------------|
| CORS | Restricted to localhost:3000 and localhost:5173 |
| SQL Injection | SQLAlchemy ORM parameterized queries |
| XSS | React automatic escaping |
| CSRF | Future: SameSite cookies, CSRF tokens |

### 7.2 Planned Security Enhancements

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (Admin, Accountant, Viewer)
   - Multi-factor authentication (MFA)

2. **Data Protection**
   - AES-256 encryption for sensitive data
   - TLS 1.3 for data in transit
   - Regular security audits

3. **API Security**
   - Rate limiting per user
   - API key management
   - Request signing

### 7.3 Security Architecture

\`\`\`mermaid
graph TB
    Client[Client Browser]
    Auth[Auth Service]
    API[API Gateway]
    LB[Load Balancer]

    Client -->|HTTPS| LB
    LB --> API
    Client -->|JWT| Auth
    API -->|Verify Token| Auth

    subgraph "Access Control"
        RBAC[Role-Based Access Control]
    end

    API --> RBAC
\`\`\`

## 8. Scalability & Performance

### 8.1 Performance Optimizations

**Database**:
- Indexed columns: id, transaction_number, email, contact_id
- Query optimization with SQLAlchemy selectin loading
- Connection pooling (pgbouncer for PostgreSQL)

**Frontend**:
- Code splitting with React.lazy
- Memoization with React.memo
- Debounced search inputs

**API**:
- Async route handlers
- Pagination for list endpoints
- Response caching (Redis future)

### 8.2 Scalability Considerations

| Component | Current Capacity | Scaling Strategy |
|-----------|-----------------|-------------------|
| API | 100 concurrent users | Horizontal scaling with load balancer |
| Database | 1M transactions | Read replicas, connection pooling |
| File Storage | Local filesystem | S3-compatible object storage |
| Sessions | In-memory | Redis for distributed sessions |

### 8.3 Load Testing Targets

| Metric | Target |
|--------|--------|
| Concurrent Users | 100 |
| Requests/sec | 500 |
| API Response Time (p95) | < 500ms |
| Page Load Time | < 3s |

## 9. Diagrams

### 9.1 System Sequence Diagram - Invoice Creation

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor U as User
    participant F as Form Component
    participant A as Axios Client
    participant R as FastAPI Router
    participant S as Transaction Service
    participant D as Database

    U->>F: Fill Invoice Form
    F->>F: Calculate Subtotal
    F->>A: POST /api/v2/transactions/sales
    A->>R: HTTP Request
    R->>R: Validate Request
    R->>S: Process Transaction
    S->>S: Generate Transaction Number
    S->>S: Calculate Totals
    S->>D: BEGIN TRANSACTION
    S->>D: INSERT Transaction
    S->>D: INSERT Transaction Items
    S->>D: INSERT Journal Entries
    D-->>S: COMMIT
    S-->>R: Transaction Object
    R-->>A: JSON Response (201)
    A-->>F: Parsed Data
    F-->>U: Success Message
\`\`\`

### 9.2 Deployment Diagram

\`\`\`mermaid
graph TB
    subgraph "User Access"
        B[Browser]
    end

    subgraph "Hosting Provider"
        LB[Load Balancer]
        W1[Web Server 1]
        W2[Web Server 2]
        DB[(Primary DB)]
        REPL[(Read Replica)]
    end

    B --> LB
    LB --> W1
    LB --> W2
    W1 --> DB
    W2 --> DB
    DB --> REPL
\`\`\`

### 9.3 Class Diagram - Core Models

\`\`\`mermaid
classDiagram
    class Transaction {
        +int id
        +str type
        +str transaction_number
        +datetime transaction_date
        +float total
        +str status
        +items: List~TransactionItem~
        +calculate_total()
    }

    class TransactionItem {
        +int id
        +str description
        +float quantity
        +float unit_price
        +float amount
    }

    class Contact {
        +int id
        +str name
        +str email
        +str contact_type
    }

    class Account {
        +int id
        +str code
        +str name
        +str account_type
        +float balance
    }

    class JournalEntry {
        +int id
        +float debit
        +float credit
        +verify_balance()
    }

    Transaction "1" --> "*" TransactionItem : contains
    Transaction "1" --> "*" JournalEntry : generates
    Transaction "*" --> "1" Contact : belongs to
    JournalEntry "*" --> "1" Account : references
\`\`\`

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: Stefan Sutanto
**Status**: Active Architecture
`,
  },
  {
    slug: "diabetes-prediction",
    title: "Diabetes Prediction ML Competition",
    description:
      "Kaggle competition entry for diabetes prediction using ensemble methods. Implemented CatBoost and LightGBM models with feature engineering, achieving competitive AUC scores.",
    techStack: ["Python", "CatBoost", "LightGBM", "scikit-learn", "Pandas"],
    domain: "ML/Data Science",
    date: "2024-12",
    status: "completed",
    github: "https://github.com/stefansutanto/kaggle-diabetes",
    summary: `
# Diabetes Prediction

## Overview
Machine learning competition entry for predicting diabetes risk based on health indicators. Used ensemble methods combining CatBoost and LightGBM with extensive feature engineering.

## Approach
- Feature engineering: Created interaction features (age_bmi, bmi_waist_ratio, hdl_to_ldl)
- Binned features for non-linear relationships
- 5-fold stratified cross-validation
- Ensemble: Weighted blend of CatBoost and LightGBM
- Meta-learner: LogisticRegression on base model predictions

## Results
- LightGBM OOF AUC: 0.7260
- CatBoost OOF AUC: 0.7261
- Weighted Ensemble OOF AUC: 0.7261
- Meta-learner OOF AUC: 0.7261

## Technical Highlights
- Robust cross-validation strategy
- Careful handling of categorical features
- Feature importance analysis
- Model persistence and reproducibility
    `,
    brsContent: `# Business Requirements Specification: Diabetes Prediction System

## 1. Executive Summary

### Business Problem
Diabetes mellitus is a chronic metabolic disorder affecting over 400 million people worldwide. Early detection and intervention can significantly reduce complications and healthcare costs. However, current screening methods require invasive blood tests and specialist consultations, creating barriers to widespread screening.

### Stakeholders
- **Primary Users**: Healthcare providers, medical practitioners
- **Secondary Users**: Researchers, epidemiologists, public health officials
- **Technical Stakeholders**: Data scientists, ML engineers, healthcare IT teams

### Success Criteria
- Achieve ROC-AUC score of > 0.72 on held-out test data
- Identify top 5 most predictive risk factors
- Provide interpretable predictions with feature importance
- Support both individual and batch predictions
- Model inference time under 100ms per record

## 2. Business Context

### Domain Analysis
**Diabetes Screening Landscape**:
- Traditional diagnosis: Fasting plasma glucose, HbA1c blood tests
- Barriers: Cost, accessibility, patient discomfort
- Opportunity: Non-invasive risk assessment using demographic and lifestyle data

**Kaggle Competition Context**:
- Playground Series S5E12: Binary classification challenge
- Target: Predict diabetes diagnosis from patient features
- Metric: Area Under ROC Curve (AUC-ROC)
- Training data: ~100,000 patient records with 25+ features

### Market/Industry Background
**Global Diabetes Market**:
- 537 million adults living with diabetes (2021)
- Projected to reach 643 million by 2030
- Annual healthcare cost: $966 billion
- Undiagnosed cases: ~50%

**ML in Healthcare**:
- Growing adoption of predictive models for disease screening
- Regulatory focus on model interpretability and fairness
- Shift from black-box models to explainable AI

## 3. Functional Requirements

### 3.1 Data Ingestion & Processing

#### FR-001: Data Loading
**Description**: System shall load and combine training and test datasets.

**Data Sources**:
- \`train.csv\` - Labeled patient records (~100K rows)
- \`test.csv\` - Unabeled patient records for prediction
- \`sample_submission.csv\` - Submission format template

**Acceptance Criteria**:
- Successfully merge train and test datasets
- Handle missing values appropriately
- Preserve row alignment between features and target

#### FR-002: Feature Engineering
**Description**: System shall generate domain-relevant features to improve model performance.

**Engineered Features**:
| Feature | Formula | Rationale |
|---------|---------|-----------|
| age_bmi | age × bmi | Combined metabolic risk factor |
| bmi_waist_ratio | bmi × waist_to_hip_ratio | Obesity severity indicator |
| hdl_to_ldl | hdl_cholesterol / ldl_cholesterol | Cholesterol balance ratio |
| triglycerides_bin | pd.cut(triglycerides, bins) | Categorical risk grouping |
| bmi_bin | pd.cut(bmi, bins) | WHO obesity categories |

**Acceptance Criteria**:
- Feature values calculated without errors
- No data leakage (fit on train, transform on test)
- Binning follows clinical guidelines

### 3.2 Model Training

#### FR-003: Ensemble Model Training
**Description**: System shall train multiple gradient boosting models and combine predictions.

**Models**:
1. **LightGBM Classifier**
   - 2000 iterations with early stopping
   - Learning rate: 0.02
   - 5-fold stratified cross-validation

2. **CatBoost Classifier**
   - 2000 iterations with early stopping
   - Learning rate: 0.03
   - Depth: 6
   - Native categorical feature handling

**Acceptance Criteria**:
- OOF AUC-ROC > 0.72
- Prediction variance across folds < 0.02
- Models serialize to disk successfully

#### FR-004: Cross-Validation
**Description**: System shall implement stratified k-fold cross-validation to prevent overfitting.

**Parameters**:
- K = 5 folds
- Stratified sampling (maintain class balance)
- Random state = 42 (reproducibility)

**Acceptance Criteria**:
- Each fold trains to convergence
- No significant performance degradation across folds
- Final OOF score representative of test performance

### 3.3 Ensemble Strategy

#### FR-005: Model Blending
**Description**: System shall combine base model predictions using weighted averaging and meta-learning.

**Ensemble Methods**:
1. **Weighted Average**: Optimize weight for CatBoost vs LightGBM
2. **Logistic Regression Meta-Model**: Learn optimal combination

**Acceptance Criteria**:
- Ensemble AUC > best single model AUC
- Weight optimization completed (0-1 range)
- Meta-model converges successfully

### 3.4 Prediction & Export

#### FR-006: Test Set Prediction
**Description**: System shall generate predictions for the test dataset.

**Process**:
1. Load trained models from disk
2. Generate predictions for test set
3. Apply ensemble weights
4. Export to submission CSV format

**Acceptance Criteria**:
- Predictions in range [0, 1]
- All test IDs included in submission
- Format matches sample_submission.csv

#### FR-007: Model Persistence
**Description**: System shall save all trained models and metadata.

**Artifacts**:
- \`models/lgb_folds.joblib\` - LightGBM fold models
- \`models/cb_folds.joblib\` - CatBoost fold models
- \`models/meta_lr.joblib\` - Logistic meta-learner
- \`models/features_order.json\` - Feature column order
- \`models/ensemble_weights.json\` - Optimal weights

**Acceptance Criteria**:
- All files saved to \`models/\` directory
- Models can be loaded and used for inference
- JSON files valid and parseable

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- **Training Time**: Complete 5-fold CV in under 30 minutes
- **Inference Time**: < 100ms per prediction
- **Memory Usage**: < 4GB during training
- **File Size**: Model artifacts < 100MB

### 4.2 Data Quality Requirements
- **Missing Values**: Median imputation for numeric, mode for categorical
- **Outliers**: No removal (retained for model robustness)
- **Data Types**: Proper typing (numeric, categorical, datetime)

### 4.3 Model Performance Requirements
- **ROC-AUC**: > 0.72 on validation set
- **Calibration**: Brier score < 0.20
- **Stability**: CV std < 0.02 across folds

### 4.4 Reproducibility Requirements
- **Random Seeds**: All stochastic operations seeded (RND=42)
- **Environment**: Documented dependency versions
- **Code**: Version controlled with clear commits

### 4.5 Interpretability Requirements
- **Feature Importance**: SHAP values or gain importance
- **Prediction Explanation**: Top contributing features
- **Documentation**: Clear feature descriptions

## 5. Data Requirements

### 5.1 Data Dictionary

#### Demographic Features
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| age | Numeric | Patient age in years | No |
| gender | Categorical | Male, Female | No |
| ethnicity | Categorical | White, Hispanic, Black, Asian, Other | No |
| education_level | Categorical | No formal, Highschool, Graduate, Postgraduate | No |
| income_level | Categorical | Low, Lower-Middle, Middle, Upper-Middle, High | No |
| employment_status | Categorical | Employed, Unemployed, Retired, Student | No |

#### Lifestyle Features
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| alcohol_consumption_per_week | Numeric | Drinks per week (0-5) | No |
| physical_activity_minutes_per_week | Numeric | Weekly exercise minutes | No |
| diet_score | Numeric | Diet quality (0-10) | No |
| sleep_hours_per_day | Numeric | Average daily sleep | No |
| screen_time_hours_per_day | Numeric | Daily screen exposure | No |
| smoking_status | Categorical | Never, Former, Current | No |

#### Health Indicators
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| bmi | Numeric | Body Mass Index | No |
| waist_to_hip_ratio | Numeric | Waist / Hip circumference | No |
| systolic_bp | Numeric | Systolic blood pressure | No |
| diastolic_bp | Numeric | Diastolic blood pressure | No |
| heart_rate | Numeric | Resting heart rate | No |

#### Lab Values
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| cholesterol_total | Numeric | Total cholesterol (mg/dL) | No |
| hdl_cholesterol | Numeric | HDL (good cholesterol) | No |
| ldl_cholesterol | Numeric | LDL (bad cholesterol) | No |
| triglycerides | Numeric | Triglycerides (mg/dL) | No |

#### Medical History
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| family_history_diabetes | Binary | Family history (0/1) | No |
| hypertension_history | Binary | Hypertension diagnosis (0/1) | No |
| cardiovascular_history | Binary | CVD diagnosis (0/1) | No |

#### Target Variable
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| diagnosed_diabetes | Binary | Diabetes diagnosis (0/1) | No |

### 5.2 Data Relationships

\`\`\`mermaid
graph LR
    Demographic[Demographic Factors] --> Risk[Diabetes Risk]
    Lifestyle[Lifestyle Factors] --> Risk
    Clinical[Clinical Measurements] --> Risk
    Lab[Laboratory Values] --> Risk
    History[Medical History] --> Risk

    Risk --> Target[Diabetes Diagnosis]
\`\`\`

## 6. Integration Requirements

### 6.1 Model Deployment (Future)
- **REST API**: Flask/FastAPI endpoint for predictions
- **Batch Processing**: Support bulk prediction uploads
- **Cloud Deployment**: AWS SageMaker or GCP AI Platform

### 6.2 Third-Party Integrations (Future)
- **EHR Systems**: HL7 FHIR compatibility
- **Lab Systems**: Automatic lab result imports
- **Patient Portals**: Risk score display

## 7. Constraints & Assumptions

### 7.1 Technical Constraints
- **Language**: Python 3.8+
- **Frameworks**: Scikit-learn, LightGBM, CatBoost
- **Competition**: Kaggle submission deadline (completed)

### 7.2 Data Constraints
- **Synthetic Data**: Dataset is synthetically generated
- **Imbalanced Classes**: Must use stratified sampling
- **Missing Values**: Moderate (~5-10% in some features)

### 7.3 Assumptions
- Data represents real-world distributions
- Features are independent conditional on target
- No significant concept drift in production

## 8. Risk Analysis

### 8.1 Identified Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Overfitting to competition data | Medium | High | Cross-validation, regularization |
| Feature leakage | Low | Critical | Careful feature engineering |
| Poor generalization to real data | High | High | Domain adaptation techniques |
| Model interpretability issues | Medium | Medium | SHAP analysis |
| Computational resource limits | Low | Medium | Cloud computing options |

### 8.2 Mitigation Strategies
- **Overfitting**: Aggressive early stopping, dropout, regularization
- **Feature Leakage**: Feature importance review, clinical validation
- **Generalization**: Test on external validation set
- **Interpretability**: SHAP values, feature documentation

## 9. Testing Strategy

### 9.1 Model Testing

#### Validation Strategy
| Test Type | Description | Success Criteria |
|-----------|-------------|------------------|
| K-Fold CV | 5-fold stratified CV | OOF AUC > 0.72 |
| Holdout Test | 20% held from training | Test AUC within 0.02 of CV |
| Calibration | Reliability diagram | Brier score < 0.20 |

#### Performance Metrics
- **Primary**: ROC-AUC (Area Under ROC Curve)
- **Secondary**: Log Loss, Accuracy, F1-Score, Precision, Recall

### 9.2 Acceptance Criteria
- OOF AUC-ROC >= 0.72
- Model trains without errors
- All predictions in valid range
- Submission format matches requirements
- Code is reproducible with documented dependencies

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: Stefan Sutanto
**Status**: Kaggle Competition Completed
`,
    archContent: `# Architecture Document: Diabetes Prediction System

## 1. System Overview

The Diabetes Prediction System is a machine learning pipeline designed to predict diabetes diagnosis from patient demographic, lifestyle, and clinical data. The system follows a batch-oriented ML architecture with model training, ensemble learning, and prediction generation.

\`\`\`mermaid
graph TB
    subgraph "Data Layer"
        TRAIN[train.csv<br/>100K records]
        TEST[test.csv<br/>~50K records]
        SSUB[sample_submission.csv]
    end

    subgraph "Processing Layer"
        LOAD[Data Loader]
        FEAT[Feature Engineering]
        IMP[Imputation<br/>Median/Mode]
        SPLIT[Train/Test Split]
    end

    subgraph "Model Layer"
        CV[Stratified 5-Fold CV]
        LGB[LightGBM<br/>2000 iterations]
        CB[CatBoost<br/>2000 iterations]
    end

    subgraph "Ensemble Layer"
        WOPT[Weight Optimization<br/>CatBoost w=0.3]
        META[Logistic Meta-Learner]
    end

    subgraph "Output Layer"
        PRED[Final Predictions]
        SUB[submission_ensemble_weighted.csv]
        METAOUT[submission_meta.csv]
    end

    TRAIN --> LOAD
    TEST --> LOAD
    LOAD --> FEAT
    FEAT --> IMP
    IMP --> SPLIT
    SPLIT --> CV
    CV --> LGB
    CV --> CB
    LGB --> WOPT
    CB --> WOPT
    LGB --> META
    CB --> META
    WOPT --> PRED
    META --> METAOUT
    PRED --> SUB
\`\`\`

## 2. Component Architecture

### 2.1 Jupyter Notebook Structure

The system is implemented as a single Jupyter notebook (\`diabetes_model.ipynb\`) with logical cell blocks:

\`\`\`
diabetes_model.ipynb
├── Cell 1: Initialization & Imports
├── Cell 2: Data Loading & Initial Processing
├── Cell 3: Feature Engineering
├── Cell 4: Train/Test Split
├── Cell 5: Label Encoding (for LightGBM)
├── Cell 6: LightGBM Training (5-Fold CV)
├── Cell 7: CatBoost Training (5-Fold CV)
├── Cell 8: Weight Optimization & Ensemble
├── Cell 9: Meta-Learning Ensemble
└── Cell 10: Model Persistence
\`\`\`

### 2.2 Core Components

| Component | Responsibility | Key Functions |
|------------|----------------|---------------|
| **DataLoader** | Load and combine datasets | pd.concat, reset_index |
| **FeatureEngineer** | Create derived features | age_bmi, bmi_waist_ratio, bins |
| **Preprocessor** | Handle missing values | median/mode imputation |
| **ModelTrainer** | Train base learners | LGBMClassifier, CatBoostClassifier |
| **EnsembleBuilder** | Combine predictions | Weighted avg, LogisticRegression |
| **ModelSerializer** | Persist models | joblib.dump, .save_model |

## 3. Data Architecture

### 3.1 Data Pipeline

\`\`\`mermaid
flowchart LR
    subgraph Input
        T[train.csv]
        V[test.csv]
    end

    subgraph Processing
        M1[Merge<br/>full = concat train+test]
        M2[Feature Engineering<br/>age_bmi, ratios, bins]
        M3[Imputation<br/>median/mode]
    end

    subgraph Models
        L1[LightGBM<br/>Label Encoded]
        C1[CatBoost<br/>Native Cat Features]
    end

    subgraph Output
        E1[OOF Predictions]
        E2[Test Predictions]
    end

    T --> M1
    V --> M1
    M1 --> M2
    M2 --> M3
    M3 --> L1
    M3 --> C1
    L1 --> E1
    C1 --> E1
    L1 --> E2
    C1 --> E2
\`\`\`

### 3.2 Feature Engineering Pipeline

\`\`\`mermaid
graph TD
    subgraph "Raw Features"
        AGE[age]
        BMI[bmi]
        WHR[waist_to_hip_ratio]
        HDL[hdl_cholesterol]
        LDL[ldl_cholesterol]
        TG[triglycerides]
        BMI_R[bmi raw]
        TG_R[triglycerides raw]
    end

    subgraph "Engineered Features"
        AB[age_bmi]
        BWR[bmi_waist_ratio]
        HL[hdl_to_ldl]
        TGB[triglycerides_bin]
        BB[bmi_bin]
    end

    AGE -->|multiply| AB
    BMI -->|multiply| AB
    BMI -->|multiply| BWR
    WHR -->|multiply| BWR
    HDL -->|divide| HL
    LDL -->|divide| HL
    TG_R -->|pd.cut| TGB
    BMI_R -->|pd.cut| BB

    subgraph "Binning Ranges"
        TG_B[0-100, 100-150,<br/>150-200, 200+]
        BMI_B[<18.5, 18.5-25,<br/>25-30, 30-35, 35+]
    end

    TG_R --> TG_B
    BMI_R --> BMI_B
\`\`\`

### 3.3 Data Schema

#### Feature Categories
\`\`\`mermaid
mindmap
    root((Features))
        Demographic
            age
            gender
            ethnicity
            education_level
            income_level
            employment_status
        Lifestyle
            alcohol_consumption_per_week
            physical_activity_minutes_per_week
            diet_score
            sleep_hours_per_day
            screen_time_hours_per_day
            smoking_status
        Clinical
            bmi
            waist_to_hip_ratio
            systolic_bp
            diastolic_bp
            heart_rate
        Laboratory
            cholesterol_total
            hdl_cholesterol
            ldl_cholesterol
            triglycerides
        Medical_Hx
            family_history_diabetes
            hypertension_history
            cardiovascular_history
        Engineered
            age_bmi
            bmi_waist_ratio
            hdl_to_ldl
            triglycerides_bin
            bmi_bin
\`\`\`

## 4. API Design

### 4.1 Model Architecture

#### LightGBM Model
\`\`\`python
LGBMClassifier(
    n_estimators=2000,
    learning_rate=0.02,
    num_leaves=31,
    subsample=0.9,
    colsample_bytree=0.9,
    random_state=42
)
\`\`\`

**Configuration Rationale**:
- \`n_estimators=2000\`: High iteration count for better convergence
- \`learning_rate=0.02\`: Low learning rate requires more iterations but improves generalization
- \`num_leaves=31\`: Controls model complexity
- \`subsample=0.9\`: Stochastic gradient boosting for regularization

#### CatBoost Model
\`\`\`python
CatBoostClassifier(
    iterations=2000,
    learning_rate=0.03,
    depth=6,
    loss_function="Logloss",
    eval_metric="AUC",
    random_seed=42,
    od_type="Iter",
    od_wait=200
)
\`\`\`

**Configuration Rationale**:
- \`depth=6\`: Prevents overfitting on small datasets
- \`od_wait=200\`: Overfitting detector with 200 iteration patience
- Native categorical handling: No manual encoding required

### 4.2 Model Inference

\`\`\`mermaid
sequenceDiagram
    actor User
    participant Notebook
    participant Models
    participant Data

    User->>Notebook: Load trained models
    Notebook->>Models: joblib.load(lgb_folds)
    Notebook->>Models: joblib.load(cb_folds)
    User->>Notebook: Process test data
    Notebook->>Data: Apply feature engineering
    Data-->>Notebook: Processed features
    Notebook->>Models: predict_proba(X_test)
    Models-->>Notebook: Fold predictions
    Notebook->>Notebook: Average predictions
    Notebook->>Notebook: Apply ensemble weights
    Notebook-->>User: Final predictions
\`\`\`

## 5. Technology Stack Rationale

| Technology | Version | Justification |
|------------|----------|--------------|
| **Python** | 3.8+ | ML ecosystem standard |
| **Jupyter** | Latest | Iterative development, visualization |
| **LightGBM** | Latest | Fast training, good accuracy |
| **CatBoost** | Latest | Native categorical handling |
| **scikit-learn** | Latest | CV, metrics, preprocessing |
| **pandas** | Latest | Data manipulation |
| **numpy** | Latest | Numerical operations |

### Why LightGBM + CatBoost Ensemble?

| Aspect | LightGBM | CatBoost |
|--------|----------|----------|
| Training Speed | Very fast | Fast |
| Categorical Features | Requires encoding | Native support |
| Overfitting Resistance | Good | Excellent |
| Interpretability | Good | Good |
| Complementarity | Histogram-based | Ordered boosting |

**Ensemble Benefit**: Diverse algorithms capture different patterns, improving robustness and AUC score.

## 6. Deployment Architecture

### 6.1 Development Environment

\`\`\`mermaid
graph LR
    NB[Jupyter Notebook] --> PY[Python 3.8+]
    PY --> LGB[LightGBM]
    PY --> CB[CatBoost]
    PY --> SK[scikit-learn]
    PY --> PD[pandas]
    NB --> FS[File System]
    FS --> MODELS[models/ directory]
    FS --> DATA[CSV files]
\`\`\`

### 6.2 Model Artifacts

\`\`\`
models/
├── lgb_folds.joblib              # 5 LightGBM fold models
├── cb_folds.joblib               # 5 CatBoost fold models
├── meta_lr.joblib                # Logistic meta-learner
├── features_order.json           # Feature column order
└── ensemble_weights.json         # Optimal ensemble weights
    {
        "catboost_weight": 0.3,
        "oof_auc": 0.7261
    }
\`\`\`

### 6.3 Production Deployment (Future)

\`\`\`mermaid
graph TB
    subgraph "API Layer"
        API[REST API /predict]
    end

    subgraph "Model Serving"
        LGBS[LightGBM Server]
        CBS[CatBoost Server]
        META[Meta-Learner]
    end

    subgraph "Preprocessing"
        PREP[Feature Engineering<br/>Imputation]
    end

    API --> PREP
    PREP --> LGBS
    PREP --> CBS
    LGBS --> META
    CBS --> META
    META --> API
\`\`\`

## 7. Security & Privacy Considerations

### 7.1 Data Privacy
- **HIPAA Compliance**: Required for production deployment
- **De-identification**: Remove direct identifiers
- **Encryption**: Data at rest and in transit

### 7.2 Model Security
- **Adversarial Attacks**: Validate input ranges
- **Model Theft**: Model obfuscation techniques
- **Audit Logging**: Track predictions and access

## 8. Scalability & Performance

### 8.1 Performance Metrics

| Metric | Value | Notes |
|--------|-------|-------|
| Training Time | ~15-20 min | 5-fold CV for both models |
| Inference Time | < 100ms | Per record |
| Memory Usage | ~2GB | During training |
| Model Size | ~50MB | All fold models |

### 8.2 Scalability Considerations

| Scenario | Strategy |
|----------|----------|
| Larger datasets | Dask for distributed computing |
| Real-time predictions | Model serving with ONNX |
| Batch predictions | Spark ML integration |
| Multi-model serving | Kubernetes with GPU nodes |

## 9. Diagrams

### 9.1 Training Pipeline Flowchart

\`\`\`mermaid
flowchart TD
    START([Start]) --> LOAD[Load train.csv, test.csv]
    LOAD --> COMBINE[pd.concat train+test]
    COMBINE --> FEAT1[Create age_bmi, bmi_waist_ratio]
    FEAT1 --> FEAT2[Create hdl_to_ldl]
    FEAT2 --> FEAT3[Bin triglycerides, bmi]
    FEAT3 --> IMP[Impute missing values]
    IMP --> SPLIT[Split back to train/test]
    SPLIT --> CVINIT[Initialize 5-Fold CV]
    CVINIT --> LGBLOOP[For each fold:]
    LGBLOOP --> LGBTRAIN[Train LightGBM]
    LGBTRAIN --> LGBPRED[Predict on validation]
    LGBPRED --> LGBNEXT{More folds?}
    LGBNEXT -->|Yes| LGBLOOP
    LGBNEXT -->|No| CBNEXT[Train CatBoost folds]
    CBNEXT --> CBLOOP[For each fold:]
    CBLOOP --> CBTRAIN[Train CatBoost]
    CBTRAIN --> CBPRED[Predict on validation]
    CBPRED --> CBNEXT{More folds?}
    CBNEXT -->|Yes| CBLOOP
    CBNEXT -->|No| ENS[Create Ensemble]
    ENS --> WOPT[Optimize weights]
    WOPT --> META[Train meta-learner]
    META --> PRED[Generate test predictions]
    PRED --> SAVE[Save submission files]
    SAVE --> SAVE2[Save models]
    SAVE2 --> END([End])
\`\`\`

### 9.2 Cross-Validation Schema

\`\`\`mermaid
graph LR
    subgraph Fold1
        F1T[Train 80%]
        F1V[Valid 20%]
    end
    subgraph Fold2
        F2T[Train 80%]
        F2V[Valid 20%]
    end
    subgraph Fold3
        F3T[Train 80%]
        F3V[Valid 20%]
    end
    subgraph Fold4
        F4T[Train 80%]
        F4V[Valid 20%]
    end
    subgraph Fold5
        F5T[Train 80%]
        F5V[Valid 20%]
    end

    style F1V fill:#f9f,stroke:#333,stroke-width:2px
    style F2V fill:#f9f,stroke:#333,stroke-width:2px
    style F3V fill:#f9f,stroke:#333,stroke-width:2px
    style F4V fill:#f9f,stroke:#333,stroke-width:2px
    style F5V fill:#f9f,stroke:#333,stroke-width:2px
\`\`\`

### 9.3 Ensemble Architecture

\`\`\`mermaid
graph TB
    subgraph Input
        X[Test Data X]
    end

    subgraph Base_Models
        L1[LGB Fold 1]
        L2[LGB Fold 2]
        L3[LGB Fold 3]
        L4[LGB Fold 4]
        L5[LGB Fold 5]

        C1[CB Fold 1]
        C2[CB Fold 2]
        C3[CB Fold 3]
        C4[CB Fold 4]
        C5[CB Fold 5]
    end

    subgraph Aggregation
        LAVG[Average LGB]
        CAVG[Average CB]
    end

    subgraph Ensemble
        W1[Weight 0.7 LGB]
        W2[Weight 0.3 CB]
        META_LR[Logistic Meta-Learner]
    end

    subgraph Output
        YW[Weighted Prediction]
        YM[Meta Prediction]
    end

    X --> L1 & L2 & L3 & L4 & L5
    X --> C1 & C2 & C3 & C4 & C5
    L1 & L2 & L3 & L4 & L5 --> LAVG
    C1 & C2 & C3 & C4 & C5 --> CAVG
    LAVG --> W1
    CAVG --> W2
    W1 --> YW
    W2 --> YW
    LAVG --> META_LR
    CAVG --> META_LR
    META_LR --> YM
\`\`\`

### 9.4 Model Performance Comparison

\`\`\`mermaid
xychart-beta
    title "Model Performance - OOF AUC"
    x-axis ["LightGBM", "CatBoost", "Weighted Ens.", "Meta-Learner"]
    y-axis "AUC Score" 0.7 --> 0.73
    bar [0.7260, 0.7248, 0.7261, 0.7261]
    line [0.7260, 0.7248, 0.7261, 0.7261]
\`\`\`

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: Stefan Sutanto
**Status**: Kaggle Competition Completed
`,
  },
  {
    slug: "spaceship-titanic",
    title: "Spaceship Titanic",
    description:
      "Kaggle competition for predicting spaceship passenger transport. Applied data preprocessing, feature engineering, and classification models.",
    techStack: ["Python", "scikit-learn", "Pandas"],
    domain: "ML/Data Science",
    date: "2024-11",
    status: "completed",
    summary: `
# Spaceship Titanic

## Overview
Classification challenge to predict which passengers were transported to an alternate dimension during the Spaceship Titanic's collision.

## Approach
- Data preprocessing and cleaning
- Feature engineering from passenger attributes
- Classification model training and evaluation

## Technical Highlights
- Exploratory data analysis
- Feature selection and engineering
- Model evaluation with appropriate metrics
    `,
    brsContent: `# Business Requirements Specification: Spaceship Titanic Passenger Transport Prediction

## 1. Executive Summary

### Business Problem
The Spaceship Titanic was an interstellar passenger liner that collided with a spacetime anomaly. During transportation, passengers were transported to another dimension, but approximately half were not transported to their destination. This project aims to predict which passengers were successfully transported based on passenger attributes and cabin information.

### Stakeholders
- **Primary Users**: Space transport operators, safety analysts
- **Secondary Users**: Rescue mission coordinators, fleet operations managers
- **Technical Stakeholders**: Data scientists, ML engineers

### Success Criteria
- Achieve ROC-AUC score > 0.75 on test predictions
- Identify key factors affecting transport success
- Provide interpretable model for operational insights
- Support batch prediction processing for all passengers

## 2. Business Context

### Domain Analysis
**Kaggle Competition Context**:
- Playground Series: Spaceship Titanic
- Binary classification task (Transported: True/False)
- Competition format: Tabular data prediction
- Metric: Accuracy (competition standard)

**Dataset Background**:
- ~8,700 training passengers with labels
- ~4,300 test passengers for prediction
- 14 features covering demographics, cabin, and spending

**Business Analogy**: Similar to airline customer prediction systems where predicting passenger outcomes is crucial for:
- Safety analysis and risk mitigation
- Resource allocation for rescue operations
- Understanding transport failure patterns
- Fleet operational improvements

### Market/Industry Background
**Space Tourism Market** (Emerging Industry):
- Projected $1.3 trillion industry by 2030
- Multiple companies (SpaceX, Blue Origin, Virgin Galactic)
- Safety and reliability are paramount concerns

**ML in Transportation Safety**:
- Predictive maintenance for aircraft/spacecraft
- Passenger risk profiling for safety
- Incident prediction and prevention
- Resource optimization for emergency response

## 3. Functional Requirements

### 3.1 Data Analysis & Understanding

#### FR-001: Exploratory Data Analysis
**Description**: Analyze dataset structure, missing values, and feature distributions.

**Key Features**:
| Feature Type | Columns |
|--------------|---------|
| Demographics | HomePlanet, CryoSleep, Age, VIP |
| Location | Cabin (Deck/Num/Side), Destination |
| Spending | RoomService, FoodCourt, ShoppingMall, Spa, VRDeck |
| Identification | PassengerId (Group/Number), Name |

**Acceptance Criteria**:
- Missing value analysis completed
- Feature distributions documented
- Correlation analysis performed
- Outliers identified and documented

### 3.2 Data Preprocessing

#### FR-002: Feature Engineering
**Description**: Transform raw features into model-ready inputs.

**Key Transformations**:
1. **Cabin Parsing**: Split Cabin into Deck, Number, Side
2. **PassengerId Parsing**: Extract Group and Number
3. **Categorical Encoding**: Label/One-hot encoding
4. **Missing Value Imputation**: Strategy per feature type
5. **Feature Selection**: Remove irrelevant features

**Acceptance Criteria**:
- Cabin split into 3 components
- Passenger group identification complete
- Categorical features properly encoded
- Missing values handled appropriately

### 3.3 Model Development

#### FR-003: Classification Model Training
**Description**: Train machine learning model to predict transport status.

**Model Options**:
- **Primary**: Gradient Boosting (XGBoost/LightGBM/CatBoost)
- **Alternatives**: Random Forest, Neural Networks
- **Ensemble**: Model stacking/averaging

**Training Strategy**:
- Cross-validation (5-fold stratified)
- Hyperparameter optimization
- Feature importance analysis
- Calibration assessment

**Acceptance Criteria**:
- CV accuracy > 75%
- Model converges without warnings/errors
- Feature importance values extracted
- Model serializable for prediction

### 3.4 Prediction & Evaluation

#### FR-004: Test Set Prediction
**Description**: Generate predictions for all test passengers.

**Process**:
1. Load trained model
2. Preprocess test data (same as training)
3. Generate probability predictions
4. Convert to binary labels
5. Export to submission format

**Acceptance Criteria**:
- All passenger IDs included
- Predictions are boolean (True/False)
- Submission matches format requirements

#### FR-005: Model Interpretation
**Description**: Provide insights into model decisions.

**Deliverables**:
- Feature importance ranking
- SHAP values for local explanations
- Prediction confidence intervals
- Segment-wise accuracy analysis

**Acceptance Criteria**:
- Top 10 important features identified
- Direction of feature effects documented
- High-risk passenger segments identified

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- **Training Time**: Complete within 10 minutes
- **Inference Time**: < 50ms per prediction
- **Memory Usage**: < 2GB during training
- **Batch Processing**: Support 10K+ predictions

### 4.2 Data Quality Requirements
- **Missing Values**: < 25% acceptable per feature
- **Data Types**: Proper conversion (numeric, categorical)
- **Duplicates**: Remove duplicate passenger records

### 4.3 Model Performance Requirements
- **Accuracy**: > 75% on validation set
- **Precision**: > 70% (minimize false positives)
- **Recall**: > 70% (minimize false negatives)
- **AUC-ROC**: > 0.80

### 4.4 Reproducibility Requirements
- **Random Seeds**: Fixed seeds for all stochastic operations
- **Dependencies**: Documented via requirements.txt
- **Code**: Clean, commented, version-controlled

## 5. Data Requirements

### 5.1 Data Dictionary

#### Identification Features
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| PassengerId | String | gggg_pp where gggg=group, pp=number | No |
| Name | String | Passenger full name | Yes |

#### Demographic Features
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| HomePlanet | Categorical | Planet of departure (Earth, Europa, Mars) | Yes |
| CryoSleep | Boolean | Passenger in cryosleep | Yes |
| Age | Numeric | Passenger age | Yes |
| VIP | Boolean | Paid for VIP service | Yes |

#### Location Features
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| Cabin | String | Cabin designation (Deck/Num/Side) | Yes |
| Destination | Categorical | Destination planet | Yes |

#### Spending Features (Amenities)
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| RoomService | Numeric | Amount billed at Room Service | Yes |
| FoodCourt | Numeric | Amount billed at Food Court | Yes |
| ShoppingMall | Numeric | Amount billed at Shopping Mall | Yes |
| Spa | Numeric | Amount billed at Spa | Yes |
| VRDeck | Numeric | Amount billed at VR Deck | Yes |

#### Target Variable
| Column | Type | Description | Missing |
|--------|------|-------------|---------|
| Transported | Boolean | Successfully transported to destination | No |

### 5.2 Data Relationships

\`\`\`mermaid
graph TB
    Passenger[Passenger] --> Home[HomePlanet]
    Passenger --> Dest[Destination]
    Passenger --> Cabin[Cabin<br/>Deck/Num/Side]
    Passenger --> Status[CryoSleep?]
    Passenger --> Status2[VIP?]

    Passenger --> Spend1[RoomService]
    Passenger --> Spend2[FoodCourt]
    Passenger --> Spend3[ShoppingMall]
    Passenger --> Spend4[Spa]
    Passenger --> Spend5[VRDeck]

    Passenger --> Result{Transported?}

    style Result fill:#f9f,stroke:#333,stroke-width:2px
\`\`\`

### 5.3 Cabin Structure

\`\`\`
Cabin Format: Deck/Number/Side
Example: B/0/P

Decks: A, B, C, D, E, F, G, T
Number: Cabin number (0-1894)
Side: P (Port) or S (Starboard)
\`\`\`

## 6. Integration Requirements

### 6.1 Model Deployment (Future)
- **REST API**: Endpoint for single and batch predictions
- **Cloud Deployment**: AWS SageMaker, GCP AI Platform
- **Monitoring**: Model drift detection, performance tracking

### 6.2 Data Pipeline Integration (Future)
- **Spacecraft Systems**: Real-time passenger data feed
- **Mission Control**: Integration with operations dashboard
- **Rescue Coordination**: API for emergency response teams

## 7. Constraints & Assumptions

### 7.1 Technical Constraints
- **Competition Deadline**: Fixed submission window
- **Computing Resources**: Limited to standard Kaggle kernels
- **Model Size**: Must fit in memory constraints

### 7.2 Data Constraints
- **Synthetic Data**: Dataset is fictional (competition data)
- **Missing Values**: Significant missing data (~2-25% per feature)
- **Imbalanced Classes**: Slight imbalance in target variable

### 7.3 Assumptions
- Training data representative of test distribution
- No significant concept drift between datasets
- Passenger group behavior (families travel together)

## 8. Risk Analysis

### 8.1 Identified Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Overfitting to training data | Medium | High | Cross-validation, regularization |
| High missing value impact | High | Medium | Careful imputation strategy |
| Feature leakage | Low | Critical | Strict train/test separation |
| Poor generalization | Medium | High | Ensemble methods, feature selection |
| Group leakage | Medium | Medium | Group-aware CV splitting |

### 8.2 Mitigation Strategies
- **Overfitting**: Early stopping, dropout (if using NNs), regularization
- **Missing Values**: Feature-specific imputation (median/mode/marker)
- **Feature Leakage**: Audit feature engineering pipeline
- **Generalization**: Use multiple model types, ensemble
- **Group Effects**: Include group size as feature

## 9. Testing Strategy

### 9.1 Validation Strategy

| Test Type | Description | Success Criteria |
|-----------|-------------|------------------|
| K-Fold CV | 5-fold stratified cross-validation | Accuracy > 75% |
| Group CV | Group-aware splitting to prevent leakage | Consistent with K-Fold |
| Holdout Test | 20% held from training | Similar to CV performance |

### 9.2 Performance Metrics

**Primary Metrics**:
- **Accuracy**: Overall correctness (competition metric)
- **ROC-AUC**: Ranking capability

**Secondary Metrics**:
- **Precision**: True positives / Predicted positives
- **Recall**: True positives / Actual positives
- **F1-Score**: Harmonic mean of precision/recall
- **Confusion Matrix**: Detailed error analysis

### 9.3 Acceptance Criteria
- Model trains successfully without errors
- Validation accuracy > 75%
- All test predictions generated
- Submission format matches requirements
- Code is reproducible

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: Stefan Sutanto
**Status**: Kaggle Competition Project
`,
    archContent: `# Architecture Document: Spaceship Titanic Passenger Transport Prediction

## 1. System Overview

The Spaceship Titanic prediction system is a binary classification machine learning pipeline designed to predict whether passengers were successfully transported during a spacetime anomaly incident. The system processes passenger demographic, location, and spending data to generate transport predictions.

\`\`\`mermaid
graph TB
    subgraph "Data Layer"
        TRAIN[train.csv<br/>~8,700 passengers]
        TEST[test.csv<br/>~4,300 passengers]
        SUB[sample_submission.csv]
    end

    subgraph "Processing Layer"
        LOAD[Data Loader]
        PARSE[Feature Parsing<br/>Cabin, PassengerId]
        IMP[Missing Value<br/>Imputation]
        ENC[Encoding<br/>Label/One-Hot]
    end

    subgraph "Model Layer"
        CV[Cross-Validation<br/>5-Fold Stratified]
        MODEL[Classifier<br/>Gradient Boosting]
    end

    subgraph "Output Layer"
        PRED[Predictions]
        FILE[submission.csv]
    end

    TRAIN --> LOAD
    TEST --> LOAD
    LOAD --> PARSE
    PARSE --> IMP
    IMP --> ENC
    ENC --> CV
    CV --> MODEL
    MODEL --> PRED
    PRED --> FILE
\`\`\`

## 2. Component Architecture

### 2.1 Pipeline Structure

The prediction pipeline follows a standard machine learning workflow:

\`\`\`
spaceship-titanic/
├── Data Input/
│   ├── train.csv
│   ├── test.csv
│   └── sample_submission.csv
├── Processing/
│   ├── Feature Engineering
│   ├── Missing Value Handling
│   └── Encoding
├── Modeling/
│   ├── Model Selection
│   ├── Hyperparameter Tuning
│   └── Cross-Validation
└── Output/
    └── submission.csv
\`\`\`

### 2.2 Core Components

| Component | Responsibility | Key Operations |
|------------|----------------|----------------|
| **DataLoader** | Load CSV files | pandas.read_csv |
| **FeatureEngineer** | Create derived features | Cabin parsing, Group extraction |
| **Imputer** | Handle missing values | Median/mode imputation |
| **Encoder** | Convert categorical to numeric | LabelEncoder, OneHotEncoder |
| **ModelTrainer** | Train classifier | fit(), predict() |
| **Predictor** | Generate test predictions | predict_proba() |

## 3. Data Architecture

### 3.1 Data Pipeline

\`\`\`mermaid
flowchart LR
    subgraph Raw
        T[train.csv]
        V[test.csv]
    end

    subgraph Features
        D1[Demographics<br/>HomePlanet, Age, CryoSleep, VIP]
        D2[Location<br/>Cabin, Destination]
        D3[Spending<br/>RoomService, FoodCourt, Spa, VRDeck]
        D4[ID<br/>PassengerId, Name]
    end

    subgraph Engineering
        P1[Cabin: Deck/Num/Side]
        P2[PassengerId: Group/Num]
        P3[TotalSpend: Sum amenities]
        P4[GroupSize: Count per group]
    end

    subgraph Modeling
        X[Feature Matrix X]
        Y[Target y]
    end

    T --> D1 & D2 & D3 & D4
    V --> D1 & D2 & D3 & D4
    D2 --> P1 & P4
    D4 --> P2
    D3 --> P3
    P1 & P2 & P3 & P4 --> X
    T --> Y
\`\`\`

### 3.2 Feature Schema

#### Cabin Parsing
\`\`\`mermaid
graph LR
    A[Cabin String<br/>B/0/P] --> B[Deck<br/>B]
    A --> C[Number<br/>0]
    A --> D[Side<br/>P=Port, S=Starboard]
\`\`\`

#### Passenger Group Structure
\`\`\`
PassengerId Format: gggg_pp
- gggg: Group number (family/group traveling together)
- pp: Individual number within group

Example: 0001_01 (Group 0001, Person 01)
         0001_02 (Group 0001, Person 02)
\`\`\`

### 3.3 Entity Relationship Diagram

\`\`\`mermaid
erDiagram
    PASSENGER ||--o| CABIN : stays_in
    PASSENGER ||--o| SPENDING : has_charges
    PASSENGER }o--|| GROUP : belongs_to

    PASSENGER {
        string PassengerId PK
        string Name
        string HomePlanet
        boolean CryoSleep
        float Age
        boolean VIP
        string Destination
        boolean Transported
    }

    CABIN {
        string Deck
        int Number
        string Side
    }

    SPENDING {
        float RoomService
        float FoodCourt
        float ShoppingMall
        float Spa
        float VRDeck
    }

    GROUP {
        int GroupId
        int Size
    }
\`\`\`

## 4. API Design

### 4.1 Model Interface

\`\`\`python
# Prediction API Interface
class SpaceshipTitanicPredictor:
    def __init__(self, model_path: str):
        """Load trained model"""

    def preprocess(self, data: pd.DataFrame) -> pd.DataFrame:
        """Apply feature engineering"""

    def predict(self, data: pd.DataFrame) -> np.ndarray:
        """Generate transport predictions"""

    def predict_proba(self, data: pd.DataFrame) -> np.ndarray:
        """Generate prediction probabilities"""
\`\`\`

### 4.2 Model Specifications

#### Recommended Model Configuration

\`\`\`python
# LightGBM Classifier (Recommended)
LGBMClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    num_leaves=31,
    max_depth=6,
    min_child_samples=20,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

# Alternative: XGBoost
XGBClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=6,
    min_child_weight=1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
\`\`\`

### 4.3 Feature Importance Categories

\`\`\`mermaid
pie title Feature Categories by Count
    "Demographics" : 4
    "Location" : 4
    "Spending" : 5
    "Identification" : 2
    "Engineered" : 4
\`\`\`

## 5. Technology Stack Rationale

| Technology | Purpose | Justification |
|------------|----------|--------------|
| **Python** | Core language | ML ecosystem standard |
| **pandas** | Data manipulation | Efficient tabular data handling |
| **numpy** | Numerical computing | Fast array operations |
| **scikit-learn** | ML utilities | Preprocessing, metrics, CV |
| **LightGBM/XGBoost** | Classifier | Best accuracy for tabular data |
| **Jupyter** | Development | Iterative exploration |

### Why Gradient Boosting?

| Factor | LightGBM | XGBoost | CatBoost |
|--------|-----------|----------|----------|
| Speed | Fastest | Fast | Medium |
| Accuracy | High | High | High |
| Categorical | Manual | Manual | Native |
| Memory | Low | Medium | High |
| Best For | Large data | Balanced | Cat-heavy |

## 6. Deployment Architecture

### 6.1 Development Setup

\`\`\`mermaid
graph LR
    DEV[Developer Machine] --> JUPYTER[Jupyter Notebook]
    JUPYTER --> PIP[pip install]
    PIP --> SK[scikit-learn]
    PIP --> LGB[LightGBM]
    PIP --> PD[pandas]

    JUPYTER --> FS[File System]
    FS --> TRAIN[train.csv]
    FS --> TEST[test.csv]
    FS --> SUB[submission.csv]
\`\`\`

### 6.2 Production Deployment (Future)

\`\`\`mermaid
graph TB
    subgraph "API Layer"
        FAST[FastAPI/Flask]
    end

    subgraph "Model Serving"
        MODEL[Loaded Model<br/>.pkl/.txt]
    end

    subgraph "Processing"
        PREP[Preprocessing Pipeline]
    end

    CLIENT[Client App] --> FAST
    FAST --> PREP
    PREP --> MODEL
    MODEL --> FAST
    FAST --> CLIENT
\`\`\`

### 6.3 Cloud Deployment Options

| Platform | Pros | Cons |
|----------|------|------|
| AWS SageMaker | Integrated, scalable | Cost |
| Google Cloud AI | TensorFlow integration | Learning curve |
| Azure ML | Enterprise features | Complexity |
| Heroku + API | Simple | Limited scaling |

## 7. Security & Privacy Considerations

### 7.1 Data Privacy
- **Fictional Data**: No real PII concerns (competition data)
- **Production Considerations**: If applied to real passenger data:
  - GDPR compliance for EU passengers
  - Data encryption at rest and in transit
  - Access logging and audit trails

### 7.2 Model Security
- **Input Validation**: Validate all input features
- **Rate Limiting**: Prevent API abuse
- **Model Versioning**: Track model iterations

## 8. Scalability & Performance

### 8.1 Performance Targets

| Metric | Target |
|--------|--------|
| Training Time | < 5 minutes |
| Inference Time | < 10ms per prediction |
| Batch Prediction | 10K predictions in < 1 second |
| Memory Usage | < 1GB |

### 8.2 Scalability Considerations

| Scenario | Strategy |
|----------|----------|
| Larger datasets | Use Dask for distributed computing |
| Real-time predictions | Model serving with ONNX |
| Multi-model deployment | A/B testing framework |

## 9. Diagrams

### 9.1 End-to-End Pipeline

\`\`\`mermaid
flowchart TD
    START([Start]) --> LOAD1[Load train.csv]
    START --> LOAD2[Load test.csv]

    LOAD1 --> EDA[Exploratory Data Analysis]
    EDA --> FEATURE[Feature Engineering]

    FEATURE --> PARSE1[Parse Cabin: Deck/Num/Side]
    FEATURE --> PARSE2[Parse PassengerId: Group/Num]
    FEATURE --> AGG[Calculate Total Spending]

    PARSE1 --> IMP[Handle Missing Values]
    PARSE2 --> IMP
    AGG --> IMP

    IMP --> ENC[Encode Categorical Features]
    ENC --> SPLIT[Train/Validation Split]

    SPLIT --> TRAIN[Train Model]
    TRAIN --> EVAL[Evaluate on Validation]
    EVAL --> TUNE{Tune Hyperparameters?}
    TUNE -->|Yes| TRAIN
    TUNE -->|No| PRED[Predict on Test Set]
    PRED --> EXPORT[Export submission.csv]
    EXPORT --> END([End])
\`\`\`

### 9.2 Feature Engineering Flow

\`\`\`mermaid
graph TD
    subgraph "Raw Features"
        CABIN[Cabin<br/>B/0/P]
        PID[PassengerId<br/>0001_01]
        SP1[RoomService]
        SP2[FoodCourt]
        SP3[ShoppingMall]
        SP4[Spa]
        SP5[VRDeck]
    end

    subgraph "Engineered Features"
        DECK[Deck<br/>B]
        CNUM[CabinNum<br/>0]
        SIDE[Side<br/>Port]
        GRP[GroupId<br/>0001]
        PNUM[PersonNum<br/>01]
        TOTAL[TotalSpending<br/>Sum of amenities]
        NOSPEND[NoSpending<br/>Binary indicator]
    end

    CABIN --> DECK
    CABIN --> CNUM
    CABIN --> SIDE
    PID --> GRP
    PID --> PNUM
    SP1 & SP2 & SP3 & SP4 & SP5 --> TOTAL
    TOTAL --> NOSPEND
\`\`\`

### 9.3 Model Training Flow

\`\`\`mermaid
sequenceDiagram
    participant Notebook
    participant Data
    participant Model
    participant CV

    Notebook->>Data: Load train.csv
    Data-->>Notebook: DataFrame

    Notebook->>Notebook: Feature Engineering
    Notebook->>CV: Initialize 5-Fold Stratified CV

    loop For each fold
        CV->>Data: Get train/val indices
        CV->>Model: train(X_train, y_train)
        Model-->>CV: Fitted model
        CV->>Model: predict_proba(X_val)
        Model-->>CV: Predictions
    end

    CV-->>Notebook: OOF predictions & scores
    Notebook->>Model: Train on full data
    Notebook->>Model: predict(X_test)
    Model-->>Notebook: Test predictions
    Notebook->>Notebook: Export submission
\`\`\`

### 9.4 Cross-Validation Schema

\`\`\`mermaid
graph TB
    subgraph "Fold 1"
        F1T[Train<br/>Folds 2,3,4,5]
        F1V[Validate<br/>Fold 1]
    end
    subgraph "Fold 2"
        F2T[Train<br/>Folds 1,3,4,5]
        F2V[Validate<br/>Fold 2]
    end
    subgraph "Fold 3"
        F3T[Train<br/>Folds 1,2,4,5]
        F3V[Validate<br/>Fold 3]
    end
    subgraph "Fold 4"
        F4T[Train<br/>Folds 1,2,3,5]
        F4V[Validate<br/>Fold 4]
    end
    subgraph "Fold 5"
        F5T[Train<br/>Folds 1,2,3,4]
        F5V[Validate<br/>Fold 5]
    end

    style F1V fill:#f9f,stroke:#333,stroke-width:2px
    style F2V fill:#f9f,stroke:#333,stroke-width:2px
    style F3V fill:#f9f,stroke:#333,stroke-width:2px
    style F4V fill:#f9f,stroke:#333,stroke-width:2px
    style F5V fill:#f9f,stroke:#333,stroke-width:2px
\`\`\`

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: Stefan Sutanto
**Status**: Kaggle Competition Project
`,
  },
  {
    slug: "gold-price-analysis",
    title: "Gold Price Data Analysis",
    description:
      "Data science project analyzing gold price trends and patterns. Used time series analysis and statistical methods to extract insights from historical gold price data.",
    techStack: ["Python", "Pandas", "NumPy", "Jupyter", "Matplotlib"],
    domain: "Data Science",
    date: "2024-11",
    status: "completed",
    summary: `
# Gold Price Analysis

## Overview
Exploratory data analysis of gold price trends, examining patterns, correlations, and potential predictive indicators.

## Approach
- Time series visualization and decomposition
- Statistical analysis of price movements
- Correlation analysis with other indicators
- Feature identification for potential modeling

## Technical Highlights
- Data cleaning and preprocessing
- Time series visualization
- Statistical hypothesis testing
- Insight generation from raw data
    `,
    brsContent: `# Business Requirements Specification: Gold Price Forecasting System

## 1. Executive Summary

### Business Problem
Gold is a critical asset class for investors, central banks, and jewelry manufacturers. Price volatility creates significant risk for businesses dependent on gold pricing. Accurate forecasting enables better hedging decisions, inventory management, and investment strategies.

### Stakeholders
- **Primary Users**: Investment analysts, commodity traders, portfolio managers
- **Secondary Users**: Jewelry manufacturers, central banks, retail investors
- **Technical Stakeholders**: Data scientists, financial analysts

### Success Criteria
- Achieve MAPE (Mean Absolute Percentage Error) < 5% on 90-day forecasts
- Identify key drivers of gold price movements
- Provide interpretable forecasts with confidence intervals
- Support multi-horizon predictions (30, 60, 90 days)

## 2. Business Context

### Domain Analysis
**Gold Market Characteristics**:
- Store of value and inflation hedge
- Influenced by: USD strength, interest rates, geopolitical events
- Trading 24/5 globally (London, NY, Hong Kong)
- Price quoted in USD (converted to IDR for local context)

**Key Price Drivers**:
1. **USD Index**: Inverse relationship (stronger USD = weaker gold)
2. **Interest Rates (UST10Y)**: Higher rates = lower gold demand
3. **Oil Prices**: Inflation indicator, correlated with commodities
4. **Equity Markets (S&P 500)**: Risk-on vs risk-off dynamics
5. **VIX**: Volatility index, flight-to-safety indicator

### Market/Industry Background
**Global Gold Market**:
- Market size: ~$11 trillion (above-ground stock)
- Annual demand: ~4,500 tonnes
- Uses: Jewelry (~50%), Investment (~30%), Central Banks (~15%), Technology (~5%)

**Indonesia Context**:
- Major jewelry market
- Domestic gold mining industry
- Currency exposure (USDIDR fluctuations)

## 3. Functional Requirements

### 3.1 Data Acquisition

#### FR-001: Market Data Collection
**Description**: System shall collect historical price data from Yahoo Finance API.

**Data Sources**:
| Symbol | Description | Frequency |
|---------|-------------|------------|
| GC=F | Gold Futures (USD/oz) | Daily |
| USDIDR=X | USD to IDR Exchange Rate | Daily |
| DX-Y.NYB | US Dollar Index | Daily |
| CL=F | Crude Oil Futures | Daily |
| ^GSPC | S&P 500 Index | Daily |
| ^VIX | CBOE Volatility Index | Daily |
| ^TNX | 10-Year Treasury Yield | Daily |

**Acceptance Criteria**:
- Data retrieved from 2020-10-01 to present
- Historical coverage: 5+ years
- All price types (Open, High, Low, Close) captured
- Missing data handled appropriately

#### FR-002: Data Conversion
**Description**: Convert gold prices from USD/oz to IDR/gram.

**Conversion Formula**:
\`\`\`
Gold Price (IDR/gram) = Gold Futures (USD/oz) × USDIDR Rate / 31.1035
\`\`\`

Where 31.1035 = troy ounce to gram conversion

**Acceptance Criteria**:
- Unit conversion accurate to 4 decimal places
- Daily closing rate used for conversion
- Results stored in separate column

### 3.2 Feature Engineering

#### FR-003: Lagged Features
**Description**: Create lagged variables for external regressors.

**Features Created**:
| Feature | Lag Period | Rationale |
|---------|-------------|-----------|
| usd_index_lag | 3 days | Market reaction time |
| oil_lag | 3 days | Inflation transmission lag |

**Acceptance Criteria**:
- Lag values calculated correctly
- No future data leakage
- Missing lagged values handled

### 3.3 Forecasting Model

#### FR-004: Prophet Time Series Model
**Description**: Implement Facebook Prophet model for gold price forecasting.

**Model Configuration**:
\`\`\`python
Prophet(
    changepoint_prior_scale=0.3,    # Responsive to trend changes
    seasonality_prior_scale=10,         # Strong seasonality
    yearly_seasonality=True,            # Annual patterns
    weekly_seasonality=False,           # Gold markets closed weekends
)
\`\`\`

**External Regressors**:
- USD Index (3-day lag)
- Oil price (3-day lag)

**Acceptance Criteria**:
- Model trains without errors
- Captures trend and seasonality
- Incorporates external regressors
- Generates 90-day forecasts

### 3.4 Model Validation

#### FR-005: Cross-Validation
**Description**: Validate model using time series cross-validation.

**Parameters**:
- Initial training period: 1,095 days (3 years)
- Forecast horizon: 365 days (1 year)
- Period between cutoffs: 180 days

**Metrics**:
- MAE (Mean Absolute Error)
- RMSE (Root Mean Squared Error)
- MAPE (Mean Absolute Percentage Error)

**Acceptance Criteria**:
- CV completes without errors
- MAPE < 10% on validation folds
- Performance metrics documented

### 3.5 Forecast Generation

#### FR-006: Future Predictions
**Description**: Generate 90-day ahead forecasts with uncertainty intervals.

**Outputs**:
- Forecasted gold price (IDR/gram)
- Lower confidence bound (80%)
- Upper confidence bound (80%)
- Trend component
- Seasonality component

**Acceptance Criteria**:
- 90 daily predictions generated
- Confidence intervals calculated
- No missing values in forecast
- Exportable to CSV format

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
- **Training Time**: Complete model training within 5 minutes
- **Forecast Generation**: < 10 seconds for 90-day prediction
- **Data Retrieval**: < 30 seconds for 5 years of data
- **Memory Usage**: < 1GB during execution

### 4.2 Data Quality Requirements
- **Data Freshness**: Daily updates available
- **Missing Values**: < 5% acceptable with forward-fill
- **Outlier Handling**: Identify but don't remove (may be genuine)

### 4.3 Model Performance Requirements
- **MAPE**: < 10% on 90-day forecast
- **RMSE**: < 15% of average price
- **Directional Accuracy**: > 55% correct direction prediction

### 4.4 Reproducibility Requirements
- **Random Seeds**: Fixed for any stochastic operations
- **Code**: Version controlled with clear documentation
- **Environment**: Conda/pip environment specification

## 5. Data Requirements

### 5.1 Data Dictionary

#### Gold Price Data
| Column | Type | Description | Source |
|--------|------|-------------|--------|
| Date | Date | Trading date | Yahoo Finance |
| Open | Float | Opening price (USD/oz) | GC=F |
| High | Float | Daily high (USD/oz) | GC=F |
| Low | Float | Daily low (USD/oz) | GC=F |
| Close | Float | Closing price (USD/oz) | GC=F |
| Volume | Int | Trading volume | GC=F |

#### Converted Data (Output)
| Column | Type | Description | Calculation |
|--------|------|-------------|-------------|
| Close_IDR | Float | Gold close in IDR/gram | Close × Rate / 31.1035 |
| Open_IDR | Float | Gold open in IDR/gram | Open × Rate / 31.1035 |
| High_IDR | Float | Gold high in IDR/gram | High × Rate / 31.1035 |
| Low_IDR | Float | Gold low in IDR/gram | Low × Rate / 31.1035 |

#### External Regressors
| Column | Type | Description | Source |
|--------|------|-------------|--------|
| USD_Index | Float | US Dollar Index | DX-Y.NYB |
| Oil | Float | Crude Oil price | CL=F |
| SP500 | Float | S&P 500 Index | ^GSPC |
| VIX | Float | CBOE Volatility Index | ^VIX |
| UST10Y | Float | 10-Year Treasury Yield | ^TNX |

### 5.2 Correlation Analysis

Based on historical data, key correlations with gold price:

| Variable | Correlation | Interpretation |
|-----------|-------------|----------------|
| USD Index | Negative (strong) | Inverse relationship |
| UST10Y | Negative (moderate) | Higher rates = lower gold |
| VIX | Positive (moderate) | Safe haven during volatility |
| Oil | Positive (weak) | Commodity correlation |
| SP500 | Negative (weak) | Risk-off dynamics |

### 5.3 Data Flow

\`\`\`mermaid
graph LR
    YF[Yahoo Finance API] --> GC[Gold Futures]
    YF --> XR[USDIDR Rate]
    YF --> DX[USD Index]
    YF --> OIL[Crude Oil]
    YF --> VIX[VIX]
    YF --> TNY[10Y Treasury]

    GC --> CONV[Converter]
    XR --> CONV

    CONV --> GOLD[Gold IDR/gram]
    DX --> LAG[Lag Features]
    OIL --> LAG

    LAG --> PROPHET[Prophet Model]
    GOLD --> PROPHET

    PROPHET --> FCST[90-Day Forecast]
\`\`\`

## 6. Integration Requirements

### 6.1 Data Sources
- **Primary**: Yahoo Finance API (yfinance library)
- **Backup**: Investing.com, Alpha Vantage
- **Cache**: Local CSV storage

### 6.2 Export & Reporting (Future)
- **PDF Reports**: Automated forecast reports with charts
- **API Endpoint**: REST API for forecast queries
- **Dashboard**: Real-time forecast visualization
- **Alerts**: Email/SMS for significant price moves

## 7. Constraints & Assumptions

### 7.1 Technical Constraints
- **Language**: Python 3.8+
- **Data Access**: Free public APIs only
- **Computing**: Single-machine processing

### 7.2 Data Constraints
- **Market Hours**: Gold markets closed weekends
- **Data Frequency**: Daily data only (no intraday)
- **Historical Limit**: Limited to available historical data

### 7.3 Assumptions
- Historical patterns continue into future
- No black swan events (major geopolitical shocks)
- USDIDR rate reasonably predictable
- External regressors maintain relationships

## 8. Risk Analysis

### 8.1 Identified Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Model overfitting | Medium | High | Cross-validation, regularization |
| Regime change | High | High | Monitor forecast errors, retrain |
| API rate limits | Low | Medium | Implement caching |
| Data quality issues | Medium | Medium | Validation checks |
| Currency shock | Low | High | Scenario analysis |

### 8.2 Mitigation Strategies
- **Overfitting**: Regularization, simple model choice
- **Regime Change**: Continuous monitoring, ensemble methods
- **Data Quality**: Multi-source validation
- **Currency Risk**: Model USD and IDR separately

## 9. Testing Strategy

### 9.1 Validation Tests

| Test Type | Description | Success Criteria |
|-----------|-------------|------------------|
| Walk-Forward | Rolling origin validation | Consistent error metrics |
| Holdout Test | Final 20% for testing | MAPE < 10% |
| Residual Analysis | Check for autocorrelation | No significant patterns |
| Benchmark | Compare to naive forecast | Beat naive baseline |

### 9.2 Performance Metrics

**Time Series Metrics**:
- **MAE**: Mean Absolute Error
- **RMSE**: Root Mean Squared Error
- **MAPE**: Mean Absolute Percentage Error
- **sMAPE**: Symmetric MAPE
- **Directional Accuracy**: % correct directional predictions

### 9.3 Acceptance Criteria
- Model trains without errors
- CV MAPE < 10%
- 90-day forecast generated successfully
- Visualization charts created
- Code is reproducible

---

**Document Version**: 1.0
**Last Updated**: November 2024
**Author**: Stefan Sutanto
**Status**: Development Complete
`,
    archContent: `# Architecture Document: Gold Price Forecasting System

## 1. System Overview

The Gold Price Forecasting System is a time series prediction pipeline that uses Facebook's Prophet model to forecast gold prices in Indonesian Rupiah (IDR) per gram. The system incorporates external economic indicators as regressors to improve forecast accuracy.

\`\`\`mermaid
graph TB
    subgraph "Data Layer"
        YF[Yahoo Finance API]
        CACHE[Local Cache<br/>CSV Files]
    end

    subgraph "Processing Layer"
        RETRIEVE[yfinance.download]
        CONVERT[USD/oz to IDR/gram<br/>multiply by USDIDR<br/>divide by 31.1035]
        MERGE[Join Datasets<br/>on Date index]
        LAG[Create Lagged Features<br/>3-day shift]
    end

    subgraph "Model Layer"
        PROPHET[Prophet Model<br/>changepoint_prior=0.3<br/>seasonality_prior=10]
        CV[Time Series CV<br/>initial=1095d<br/>horizon=365d]
    end

    subgraph "Output Layer"
        FORECAST[90-Day Forecast]
        PLOT[Visualization Charts]
        METRICS[Performance Metrics<br/>MAE, RMSE, MAPE]
    end

    YF --> RETRIEVE
    RETRIEVE --> CACHE
    CACHE --> CONVERT
    CONVERT --> MERGE
    MERGE --> LAG
    LAG --> PROPHET
    PROPHET --> CV
    PROPHET --> FORECAST
    FORECAST --> PLOT
    CV --> METRICS
\`\`\`

## 2. Component Architecture

### 2.1 Notebook Structure

\`\`\`
Untitled1.ipynb
├── Cell 1: Import Libraries
│   ├── yfinance (data retrieval)
│   ├── pandas (data manipulation)
│   ├── prophet (forecasting)
│   ├── matplotlib/seaborn (visualization)
├── Cell 2: Data Collection
│   ├── Download market data
│   ├── Convert gold units
│   └── Merge datasets
├── Cell 3: Correlation Analysis
│   ├── Compute correlation matrix
│   └── Visualize heatmap
├── Cell 4: Feature Engineering
│   ├── Create lagged features
│   └── Prepare Prophet format
├── Cell 5: Model Training
│   └── Fit Prophet model
├── Cell 6: Cross-Validation
│   └── Time series CV
└── Cell 7: Forecast & Metrics
    ├── Generate 90-day forecast
    └── Calculate performance metrics
\`\`\`

### 2.2 Core Components

| Component | Responsibility | Key Functions |
|------------|----------------|----------------|
| **DataCollector** | Fetch market data from Yahoo Finance | yf.download() |
| **UnitConverter** | Convert USD/oz to IDR/gram | (price × rate) / 31.1035 |
| **FeatureEngineer** | Create lagged regressors | shift(3) |
| **ModelTrainer** | Train Prophet model | fit() |
| **Forecaster** | Generate predictions | predict() |
| **Validator** | Time series CV | cross_validation() |
| **Visualizer** | Create plots | matplotlib, seaborn |

## 3. Data Architecture

### 3.1 Data Flow

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Notebook
    participant YF as Yahoo Finance
    participant Prophet
    participant File as CSV Cache

    User->>Notebook: Execute notebook
    Notebook->>YF: Download Gold Futures (GC=F)
    Notebook->>YF: Download USDIDR=X
    Notebook->>YF: Download USD Index
    Notebook->>YF: Download Oil, SP500, VIX, TNX
    YF-->>Notebook: Historical data
    Notebook->>Notebook: Convert units (oz->gram, USD->IDR)
    Notebook->>Notebook: Merge on Date index
    Notebook->>Notebook: Create lagged features
    Notebook->>Prophet: Fit model with regressors
    Prophet-->>Notebook: Trained model
    Notebook->>Prophet: Predict 90 days ahead
    Prophet-->>Notebook: Forecast DataFrame
    Notebook->>File: Save results
    Notebook-->>User: Display plots & metrics
\`\`\`

### 3.2 Data Schema

#### Input Data Structure
\`\`\`mermaid
graph TD
    subgraph "Market Data"
        GC[Gold Futures<br/>GC=F]
        XR[USDIDR=X<br/>Exchange Rate]
        DX[USD Index<br/>DX-Y.NYB]
        O[Oil<br/>CL=F]
        SP[S&P 500<br/>^GSPC]
        V[VIX<br/>^VIX]
        TN[10Y Treasury<br/>^TNX]
    end

    subgraph "Processed Data"
        DF[pandas DataFrame]
    end

    subgraph "Prophet Format"
        DS[ds: datetime]
        Y[y: target value]
        ADD[additive_regressors]
    end

    GC --> DF
    XR --> DF
    DX --> DF
    O --> DF
    SP --> DF
    V --> DF
    TN --> DF

    DF --> DS
    DF --> Y
    DF --> ADD
\`\`\`

#### Feature Dictionary
| Feature | Data Type | Description |
|----------|------------|-------------|
| ds | datetime | Prophet date column |
| y | float | Target: Gold price IDR/gram |
| usd_index | float | US Dollar Index (3-day lag) |
| oil | float | Crude Oil price (3-day lag) |
| yhat | float | Predicted value (output) |
| yhat_lower | float | Lower confidence bound (output) |
| yhat_upper | float | Upper confidence bound (output) |

### 3.3 Unit Conversion Architecture

\`\`\`
Gold Pricing Hierarchy:
┌─────────────────────────────────────────┐
│  Gold Futures (GC=F)                   │
│  Currency: USD                         │
│  Unit: Troy Ounce                      │
│  Source: COMEX/NYMEX                  │
└─────────────────────────────────────────┘
              │
              │ Conversion 1
              ▼
┌─────────────────────────────────────────┐
│  Gold Price (IDR)                      │
│  Currency: Indonesian Rupiah            │
│  Unit: Troy Ounce                      │
│  Formula: GC=F × USDIDR=X             │
└─────────────────────────────────────────┘
              │
              │ Conversion 2
              ▼
┌─────────────────────────────────────────┐
│  Gold Price (IDR/gram)                │
│  Currency: Indonesian Rupiah            │
│  Unit: Gram                           │
│  Formula: (GC=F × USDIDR) / 31.1035   │
└─────────────────────────────────────────┘

Conversion Factors:
- 1 Troy Ounce = 31.1034768 grams
- USDIDR: Daily closing exchange rate
\`\`\`

## 4. API Design

### 4.1 Prophet Model Interface

\`\`\`python
from prophet import Prophet

# Model Configuration
model = Prophet(
    changepoint_prior_scale=0.3,     # Trend flexibility
    seasonality_prior_scale=10,        # Seasonality strength
    yearly_seasonality=True,           # Annual patterns
    weekly_seasonality=False,          # Weekend trading closed
    daily_seasonality=False            # Not applicable
)

# Add external regressors
model.add_regressor('usd_index')
model.add_regressor('oil')

# Training
model.fit(df)

# Prediction
future = model.make_future_dataframe(periods=90)
future['usd_index'] = ...  # Fill with lagged values
future['oil'] = ...         # Fill with lagged values

forecast = model.predict(future)
\`\`\`

### 4.2 Cross-Validation Configuration

\`\`\`python
from prophet.diagnostics import cross_validation, performance_metrics

df_cv = cross_validation(
    model,
    initial='1095 days',   # 3 years initial training
    period='180 days',      # Cut-off every 6 months
    horizon='365 days'      # Forecast 1 year ahead
)

perf = performance_metrics(df_cv)
\`\`\`

### 4.3 Function Specification

| Function | Input | Output | Description |
|----------|--------|--------|-------------|
| download() | ticker, dates | DataFrame | Fetch data from Yahoo Finance |
| convert_to_idr() | price_usd, rate | float | Convert to IDR/gram |
| create_lags() | series, periods | Series | Lagged values |
| fit_prophet() | df, regressors | Prophet | Trained model |
| forecast() | model, periods | DataFrame | Predictions with CI |

## 5. Technology Stack Rationale

| Technology | Version | Justification |
|------------|----------|--------------|
| **Python** | 3.8+ | Standard for data science |
| **yfinance** | Latest | Free Yahoo Finance API |
| **Prophet** | Latest | Facebook's time series library |
| **pandas** | Latest | Data manipulation |
| **matplotlib/seaborn** | Latest | Visualization |

### Why Prophet?

| Feature | Prophet | ARIMA | LSTM |
|---------|---------|-------|------|
| Ease of use | High | Medium | Low |
| Automatic seasonality | Yes | Manual | Manual |
| Holiday handling | Yes | Yes | No |
| External regressors | Yes | Yes | Yes |
| Uncertainty intervals | Built-in | Manual | Manual |
| Interpretability | High | High | Low |

### Prophet Configuration Rationale

| Parameter | Value | Reason |
|-----------|-------|--------|
| changepoint_prior_scale | 0.3 | More responsive to trend changes (default: 0.05) |
| seasonality_prior_scale | 10 | Strong seasonal patterns (default: 10) |
| yearly_seasonality | True | Gold has annual patterns |
| weekly_seasonality | False | Markets closed weekends |
| daily_seasonality | False | Daily data only |

## 6. Deployment Architecture

### 6.1 Development Environment

\`\`\`mermaid
graph LR
    DEV[Developer Machine] --> JUPYTER[Jupyter Notebook]
    JUPYTER --> ENV[Python Environment]
    ENV --> YF[yfinance]
    ENV --> PROPHET[Prophet]
    ENV --> PANDAS[pandas]
    ENV --> PLOT[matplotlib]

    JUPYTER --> FS[File System]
    FS --> DATA[Gold data files]
    FS --> OUTPUT[Forecasts & Plots]
\`\`\`

### 6.2 Production Deployment (Future)

\`\`\`mermaid
graph TB
    subgraph "Data Pipeline"
        SCHED[Airflow/Dagster<br/>Scheduler]
        TASK[Daily ETL Task]
    end

    subgraph "Model Serving"
        API[FastAPI Endpoint]
        MODEL[Loaded Prophet Model]
    end

    subgraph "Storage"
        S3[S3/Cloud Storage<br/>Data & Models]
        DB[(PostgreSQL<br/>Forecast Results)]
    end

    subgraph "Visualization"
        DASH[Dashboard<br/>Streamlit/Dash]
    end

    SCHED --> TASK
    TASK --> YF[Yahoo Finance]
    TASK --> MODEL
    YF --> S3
    MODEL --> S3
    MODEL --> DB
    API --> MODEL
    DASH --> API
\`\`\`

### 6.3 Deployment Options

| Platform | Pros | Cons |
|----------|------|------|
| **Streamlit** | Easy, Python-based | Limited customization |
| **Dash** | Flexible, enterprise | Learning curve |
| **FastAPI + React** | Full control | More development |
| **Heroku** | Simple deployment | Resource limits |
| **AWS + SageMaker** | Scalable, managed | Cost, complexity |

## 7. Security & Privacy Considerations

### 7.1 Data Security
- **API Keys**: Store in environment variables, never commit to git
- **Data Encryption**: At rest (S3 encryption) and in transit (HTTPS)
- **Access Control**: IAM policies for cloud resources

### 7.2 Model Security
- **Version Control**: Track model versions and data snapshots
- **Poisoning**: Validate input data ranges
- **Monitoring**: Log forecast errors for drift detection

## 8. Scalability & Performance

### 8.1 Performance Metrics

| Metric | Value | Notes |
|--------|-------|-------|
| Data Retrieval | < 30s | 7 tickers × 5 years |
| Model Training | < 60s | Single Prophet fit |
| Forecast Generation | < 5s | 90-day prediction |
| Memory Usage | < 500MB | Entire pipeline |

### 8.2 Optimization Strategies

| Area | Strategy |
|-------|----------|
| Data Caching | Store retrieved data locally, refresh daily |
| Parallel Downloads | Async API calls for multiple tickers |
| Model Tuning | Reduce MCMC samples if using full Bayesian |
| Incremental Updates | Add new data points without full refit |

### 8.3 Scalability Considerations

| Scenario | Solution |
|----------|----------|
| Multiple Commodities | Parallel model training |
| Intraday Forecasts | Switch to hourly Prophet model |
| Many Users | Deploy as REST API with caching |
| Historical Scale | Downsampling for visualization |

## 9. Diagrams

### 9.1 Complete Pipeline Flowchart

\`\`\`mermaid
flowchart TD
    START([Start]) --> CONFIG[Set Date Range<br/>2020-10-01 to 2025-10-01]

    CONFIG --> FETCH[Download Data from Yahoo Finance]
    FETCH --> CONVERT[Convert Units<br/>USD/oz to IDR/gram]

    CONVERT --> CALC[Calculate Conversions]
    CALC --> MERGE[Merge Datasets on Date]

    MERGE --> CORR[Correlation Analysis]
    CORR --> HEAT[Generate Heatmap]

    MERGE --> LAG[Create Lagged Features<br/>usd_index lag=3<br/>oil lag=3]

    LAG --> PREP[Prepare Prophet Format<br/>ds, y, regressors]
    PREP --> TRAIN[Train Prophet Model]

    TRAIN --> CV[Cross-Validation<br/>initial=1095d<br/>period=180d<br/>horizon=365d]

    CV --> METRICS[Calculate Metrics<br/>MAE, RMSE, MAPE]

    TRAIN --> FUTURE[Make Future DataFrame<br/>periods=90]
    FUTURE --> PREDICT[Predict 90 Days]

    PREDICT --> FORECAST[Forecast DataFrame]
    FORECAST --> PLOT[Visualize Results]
    PLOT --> SAVE[Save to CSV]
    SAVE --> END([End])
\`\`\`

### 9.2 Prophet Model Decomposition

\`\`\`mermaid
graph TB
    subgraph Input
        DF[DataFrame<br/>ds, y, usd_index, oil]
    end

    subgraph "Prophet Components"
        T[Trend Component<br/>changepoint_prior=0.3]
        S[Seasonality Component<br/>yearly, Fourier]
        R[Regressor Component<br/>usd_index, oil]
        E[Error Component<br/>residuals]
    end

    subgraph Output
        YHAT[yhat = T + S + R + E]
        CI[Confidence Intervals<br/>yhat_lower, yhat_upper]
    end

    DF --> T
    DF --> S
    DF --> R
    DF --> E

    T --> YHAT
    S --> YHAT
    R --> YHAT
    E --> YHAT

    YHAT --> CI
\`\`\`

### 9.3 Correlation Heatmap Structure

\`\`\`
Correlation Matrix (Gold_IDR correlations):
                    Gold_IDR  USD_Index  Oil    SP500   VIX     UST10Y
Gold_IDR (Target)     1.00     -0.85   0.45   -0.30   0.55   -0.40
USD Index           -0.85      1.00  -0.35    0.25  -0.40    0.30
Oil                 0.45     -0.35   1.00   -0.15   0.20   -0.10
SP500              -0.30      0.25  -0.15    1.00  -0.60    0.35
VIX                 0.55     -0.40   0.20   -0.60   1.00   -0.25
UST10Y             -0.40      0.30  -0.10    0.35  -0.25   1.00

Key Insights:
- Strong negative correlation with USD Index (-0.85)
- Positive correlation with VIX (safe haven)
- Moderate positive with Oil (commodity link)
- Negative with interest rates (opportunity cost)
\`\`\`

### 9.4 Forecast Visualization Structure

\`\`\`mermaid
graph LR
    subgraph "Historical Data"
        H1[2020-2022]
        H2[2022-2024]
        H3[2024-2025]
    end

    subgraph "Forecast Period"
        F[Next 90 Days]
    end

    subgraph "Components"
        T[Trend Line]
        S[Seasonal Wave]
        U[Uncertainty Band]
    end

    H1 & H2 & H3 --> T
    T --> F
    F --> S
    F --> U

    style F fill:#bbf,stroke:#333,stroke-width:2px
    style U fill:#ddd,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5
\`\`\`

---

**Document Version**: 1.0
**Last Updated**: November 2024
**Author**: Stefan Sutanto
**Status**: Development Complete
`,
  },
];

/**
 * Get all unique tech stacks from projects
 */
export function getAllTechStacks(): string[] {
  const techSet = new Set<string>();
  projects.forEach((project) => {
    project.techStack.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

/**
 * Get all unique domains from projects
 */
export function getAllDomains(): string[] {
  const domainSet = new Set<string>();
  projects.forEach((project) => domainSet.add(project.domain));
  return Array.from(domainSet).sort();
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Filter projects by tech stack and domain
 */
export function filterProjects(
  selectedTech: string[],
  selectedDomains: string[]
): Project[] {
  return projects.filter((project) => {
    const techMatch =
      selectedTech.length === 0 ||
      selectedTech.some((tech) => project.techStack.includes(tech));
    const domainMatch =
      selectedDomains.length === 0 ||
      selectedDomains.includes(project.domain);
    return techMatch && domainMatch;
  });
}
