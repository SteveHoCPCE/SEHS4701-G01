---
title: "Functional Specification Document"
subtitle: "ZhongNeng EV Seminar Registration System"
version: "1.0"
status: "Draft"
date: "2026-04-26"
prepared_by: "SEHS4701 Group 01"
---

# Functional Specification Document
# ZhongNeng EV Seminar Registration System

---

| Field | Details |
|---|---|
| **Document Title** | Functional Specification Document — ZhongNeng EV Seminar Registration System |
| **Version** | 1.0 |
| **Status** | Draft |
| **Date** | 26 April 2026 |
| **Prepared By** | SEHS4701 Group 01 — Backend Engineering Team |
| **Organisation** | ZhongNeng Electric Vehicle Co., Ltd. |
| **Course** | SEHS4701 — J2EE Application Development |

---

## Document Revision History

| Version | Date | Author | Description of Changes |
|---|---|---|---|
| 0.1 | 2026-04-10 | Group 01 | Initial draft — project scope and architecture |
| 0.2 | 2026-04-18 | Group 01 | Added system functions, business rules, and API specification |
| 0.3 | 2026-04-24 | Group 01 | Added test specification and data dictionary |
| 1.0 | 2026-04-26 | Group 01 | Final review and release |

---

## Table of Contents

- [1. Introduction](#1-introduction)
  - [1.1 Purpose](#11-purpose)
  - [1.2 Intended Audience and Reading Suggestions](#12-intended-audience-and-reading-suggestions)
  - [1.3 Project Scope](#13-project-scope)
  - [1.4 References](#14-references)
  - [1.5 Organisation Background](#15-organisation-background)

- [2. Overall Description](#2-overall-description)
  - [2.1 Project Perspective](#21-project-perspective)
  - [2.2 Product Functions](#22-product-functions)
  - [2.3 User Classes and Characteristics](#23-user-classes-and-characteristics)
  - [2.4 Operating Environment](#24-operating-environment)
  - [2.5 Technical Guidelines and Development Framework](#25-technical-guidelines-and-development-framework)
  - [2.6 User Documentation](#26-user-documentation)
  - [2.7 Assumptions and Dependencies](#27-assumptions-and-dependencies)

- [3. Business Rules](#3-business-rules)
  - [3.1 User Account Rules](#31-user-account-rules)
  - [3.2 Email Verification Rules](#32-email-verification-rules)
  - [3.3 Seminar Registration Rules](#33-seminar-registration-rules)
  - [3.4 Waitlist and Promotion Rules](#34-waitlist-and-promotion-rules)
  - [3.5 Cancellation Rules](#35-cancellation-rules)
  - [3.6 Registration History Rules](#36-registration-history-rules)
  - [3.7 Security and Authentication Rules](#37-security-and-authentication-rules)

- [4. External Interface](#4-external-interface)
  - [4.1 User Interfaces](#41-user-interfaces)
  - [4.2 Hardware Interfaces](#42-hardware-interfaces)
  - [4.3 Software Interfaces](#43-software-interfaces)
  - [4.4 Communications Interfaces](#44-communications-interfaces)

- [5. System Architecture and Holistic Design](#5-system-architecture-and-holistic-design)
  - [5.1 Logical System Diagram](#51-logical-system-diagram)
  - [5.2 Physical System Diagram](#52-physical-system-diagram)
  - [5.3 Overall System Flowchart](#53-overall-system-flowchart)
  - [5.4 Comprehensive ER Diagram](#54-comprehensive-er-diagram)

- [6. System Functions (Functional Requirements)](#6-system-functions-functional-requirements)
  - [6.1 User Registration (SF-001)](#61-user-registration-sf-001)
  - [6.2 Email OTP Verification (SF-002)](#62-email-otp-verification-sf-002)
  - [6.3 User Login (SF-003)](#63-user-login-sf-003)
  - [6.4 User Logout (SF-004)](#64-user-logout-sf-004)
  - [6.5 User Dashboard and Profile (SF-005)](#65-user-dashboard-and-profile-sf-005)
  - [6.6 EV Catalog Browsing (SF-006)](#66-ev-catalog-browsing-sf-006)
  - [6.7 Upcoming Seminar Listing (SF-007)](#67-upcoming-seminar-listing-sf-007)
  - [6.8 Seminar Registration (SF-008)](#68-seminar-registration-sf-008)
  - [6.9 Waitlist Management (SF-009)](#69-waitlist-management-sf-009)
  - [6.10 Registration History (SF-010)](#610-registration-history-sf-010)
  - [6.11 Registration Detail View (SF-011)](#611-registration-detail-view-sf-011)
  - [6.12 Registration Cancellation (SF-012)](#612-registration-cancellation-sf-012)
  - [6.13 Email Notification Service (SF-013)](#613-email-notification-service-sf-013)

- [7. Test Specification](#7-test-specification)
  - [7.1 Test Strategy](#71-test-strategy)
  - [7.2 Test Cases](#72-test-cases)
    - [7.2.1 Unit Test Cases](#721-unit-test-cases)
    - [7.2.2 Integration Test Cases](#722-integration-test-cases)
    - [7.2.3 System Test Cases](#723-system-test-cases)
  - [7.3 Acceptance Criteria](#73-acceptance-criteria)

- [Appendix A: Glossary](#appendix-a-glossary)

---

## 1. Introduction

### 1.1 Purpose

This Functional Specification Document (FSD) defines the complete functional requirements, system behaviour, business rules, and technical design of the **ZhongNeng EV Seminar Registration System** — a full-stack J2EE web application developed as the SEHS4701 Group 01 course project.

The document serves as the authoritative reference for all stakeholders involved in the design, development, testing, and acceptance of the system. It describes what the system does, how it behaves under defined conditions, and the constraints within which it must operate. It does not prescribe internal implementation details beyond what is necessary to specify observable behaviour.

All functional requirements documented herein are derived directly from the implemented source code, database schema, API specification, and test plans contained in this repository.

---

### 1.2 Intended Audience and Reading Suggestions

| Audience | Relevance | Recommended Sections |
|---|---|---|
| **Business Stakeholders / Product Owner** | Understand system capabilities and scope | 1, 2, 3 |
| **Frontend Developers** | Understand UI flows, API contracts, and page routing | 2, 4, 6 |
| **Backend Developers** | Understand service logic, data models, and security | 2.5, 3, 5, 6 |
| **Database Administrators** | Understand schema design and entity relationships | 5.4, 6 (Data Dictionary sections) |
| **QA / Test Engineers** | Understand test strategy, test cases, and acceptance criteria | 7 |
| **System Architects** | Understand deployment topology and component design | 5 |
| **Academic Assessors** | Evaluate completeness and correctness of the specification | All sections |

Readers primarily interested in business rules should focus on **Section 3**. Readers evaluating the technical implementation should focus on **Sections 5 and 6**. QA engineers should proceed directly to **Section 7**.

---

### 1.3 Project Scope

#### In Scope

The ZhongNeng EV Seminar Registration System encompasses the following capabilities:

1. **Customer Account Management** — Self-service registration for both Personal and Company customer types, with mandatory email OTP verification before account activation.
2. **JWT-Based Authentication** — Stateless login and session management using JSON Web Tokens with a 24-hour expiry window.
3. **Electric Vehicle Catalog** — Public browsing of all available EV models including model number, description, features, pricing, and imagery.
4. **Seminar Listing** — Public display of all upcoming seminars with real-time seat availability derived from confirmed bookings.
5. **Seminar Registration** — Authenticated customers may book 1 or 2 seats per seminar. The system automatically assigns `SUCCESS` or `WAIT` status based on seat availability at the time of booking.
6. **Waitlist Management** — Automatic FIFO promotion of waitlisted registrations when a confirmed (`SUCCESS`) registration is cancelled, with email notification to promoted customers.
7. **Registration Management** — Authenticated customers may view their registration history (scoped to the past 12 months), inspect individual registration details, and cancel active registrations before the seminar start time.
8. **Automated Email Notifications** — Transactional emails dispatched for OTP verification, registration confirmation, waitlist placement, cancellation acknowledgement, and waitlist promotion.
9. **Containerised Deployment** — Full Docker Compose orchestration of the MySQL database, Spring Boot backend, and React/Nginx frontend.

#### Out of Scope

The following items are explicitly excluded from this version of the system:

- Administrator portal or back-office management interface
- Payment processing or invoicing
- Seminar content management (creation, editing, or deletion of seminars by end users)
- Vehicle inventory management
- Password reset or account recovery workflows
- OAuth / social login (Google, GitHub, etc.)
- Multi-language (i18n) support
- Mobile native applications (iOS / Android)
- Real-time push notifications (WebSocket / SSE)
- Refresh token mechanism for JWT renewal

---

### 1.4 References

| # | Document | Location |
|---|---|---|
| R-01 | API Functional Specification | [`docs/api_documentation.md`](docs/api_documentation.md) |
| R-02 | Database Schema | [`database/schema.sql`](database/schema.sql) |
| R-03 | Database Seed Data | [`database/data.sql`](database/data.sql) |
| R-04 | FSD Structure Template | [`docs/FSD_Structure.md`](docs/FSD_Structure.md) |
| R-05 | Master Test Plan | [`docs/test-plans/Master-Test-Plan.xlsx`](docs/test-plans/Master-Test-Plan.xlsx) |
| R-06 | Unit Test Plan | [`docs/test-plans/unit_test_plan.csv`](docs/test-plans/unit_test_plan.csv) |
| R-07 | Integration Test Plan | [`docs/test-plans/integration_test_plan.csv`](docs/test-plans/integration_test_plan.csv) |
| R-08 | System Test Plan | [`docs/test-plans/system_test_plan.csv`](docs/test-plans/system_test_plan.csv) |
| R-09 | Process Flow Charts | [`docs/Process Flow Charts.drawio.png`](docs/Process%20Flow%20Charts.drawio.png) |
| R-10 | ER Diagram | [`docs/Relationship_Page.drawio.png`](docs/Relationship_Page.drawio.png) |
| R-11 | Project Brief | [`docs/SEHS4701 Group Project 2526S2.pdf`](docs/SEHS4701%20Group%20Project%202526S2.pdf) |
| R-12 | Spring Boot 3.2.5 Documentation | https://docs.spring.io/spring-boot/docs/3.2.5/reference/html/ |
| R-13 | React 18 Documentation | https://react.dev/ |
| R-14 | JJWT 0.12.5 Library | https://github.com/jwtk/jjwt |

---

### 1.5 Organisation Background

**ZhongNeng Electric Vehicle Co., Ltd.** (中能电动汽车有限公司) is a Hong Kong-based electric vehicle distributor specialising in the promotion and sale of premium Chinese-manufactured EV models. The company's current portfolio includes flagship models from BYD, NIO, XPeng, Li Auto, and Zeekr — representing the leading edge of China's rapidly expanding new-energy vehicle industry.

As part of its customer engagement strategy, ZhongNeng organises regular product seminars at which prospective buyers and corporate fleet managers can receive in-depth technical briefings, test-drive opportunities, and direct consultation with product specialists. These seminars are a primary channel for converting interest into purchase decisions.

#### Business Pain Points

Prior to this system, seminar registrations were managed through a combination of telephone enquiries, email correspondence, and manual spreadsheet tracking. This approach introduced several operational inefficiencies:

- **No centralised visibility** — Sales staff could not determine real-time seat availability, leading to overbooking incidents.
- **No automated waitlist** — When cancellations occurred, staff had to manually contact waitlisted customers, causing delays and missed opportunities.
- **No audit trail** — There was no reliable record of who registered, when, and for which seminar, making post-event reporting difficult.
- **High administrative overhead** — Confirmation and reminder emails were composed and sent manually, consuming significant staff time.
- **No self-service capability** — Customers could not register, check their status, or cancel without contacting staff directly.

#### Project Motivation

The ZhongNeng EV Seminar Registration System was commissioned to address these pain points by delivering a self-service web platform that automates the full registration lifecycle — from account creation and email verification through to seminar booking, waitlist management, and cancellation — while maintaining a complete, queryable audit trail of all customer interactions.

The system is designed to scale with the company's growing seminar programme and to serve as the foundation for future enhancements such as an administrator portal, payment integration, and mobile access.

---

## 2. Overall Description

### 2.1 Project Perspective

The ZhongNeng EV Seminar Registration System is a purpose-built, self-contained web application that replaces the company's previous manual seminar registration process. It does not integrate with any existing enterprise resource planning (ERP) or customer relationship management (CRM) platform; it operates as a standalone system with its own persistent data store.

The system is structured as a three-tier architecture:

- **Presentation Tier** — A single-page application (SPA) built with React 19, served via Nginx, and accessible through any modern web browser.
- **Application Tier** — A RESTful API server built with Spring Boot 3.2.5, exposing JSON endpoints consumed exclusively by the frontend SPA.
- **Data Tier** — A MySQL 8 relational database that persists all customer, seminar, registration, and email audit records.

All three tiers are containerised and orchestrated via Docker Compose, enabling consistent deployment across development and production environments. The backend exposes its API on port `8080`; the frontend is served on port `80`. The database is accessible internally on port `3306` and is not exposed to the public network in production.

The system interacts with one external service: an SMTP mail relay (configured as Gmail SMTP by default) used exclusively for transactional email dispatch. No other third-party integrations are present in this version.

---

### 2.2 Product Functions

The following is a summary of the major functional capabilities provided by the system, grouped by domain.

#### 2.2.1 Account and Authentication

| ID | Function | Access |
|---|---|---|
| F-01 | Customer self-registration (Personal or Company type) | Public |
| F-02 | Email OTP verification (6-digit code, 10-minute expiry) | Public |
| F-03 | Customer login with JWT issuance (24-hour token) | Public |
| F-04 | Customer logout (client-side token invalidation) | Authenticated |
| F-05 | Customer profile retrieval | Authenticated |

#### 2.2.2 Electric Vehicle Catalog

| ID | Function | Access |
|---|---|---|
| F-06 | Browse all EV models (model number, description, features, price, image) | Public |
| F-07 | Retrieve individual vehicle detail by ID | Public |

#### 2.2.3 Seminar Management

| ID | Function | Access |
|---|---|---|
| F-08 | List all upcoming seminars with real-time seat availability | Public |
| F-09 | Retrieve individual seminar detail by ID | Public |

#### 2.2.4 Registration and Waitlist

| ID | Function | Access |
|---|---|---|
| F-10 | Register for a seminar (1 or 2 seats); auto-assign `SUCCESS` or `WAIT` status | Authenticated |
| F-11 | View personal registration history (scoped to past 12 months) | Authenticated |
| F-12 | View individual registration detail | Authenticated |
| F-13 | Cancel an active registration; trigger FIFO waitlist promotion if applicable | Authenticated |

#### 2.2.5 Email Notifications

| ID | Function | Trigger |
|---|---|---|
| F-14 | OTP verification email | Account registration |
| F-15 | Registration confirmation email (`SUCCESS`) | Seminar registration |
| F-16 | Waitlist placement email (`WAIT`) | Seminar registration |
| F-17 | Cancellation acknowledgement email | Registration cancellation |
| F-18 | Waitlist promotion email | Waitlisted registration promoted to `SUCCESS` |

---

### 2.3 User Classes and Characteristics

The system defines two user classes. There is no administrator role in this version of the system.

#### 2.3.1 Guest (Unauthenticated Visitor)

A Guest is any visitor who accesses the system without a valid JWT. Guests may browse the EV catalog and view upcoming seminars but cannot perform any transactional operations.

| Attribute | Detail |
|---|---|
| Authentication required | No |
| Permitted operations | Browse EV catalog; view seminar listings |
| Restricted operations | Registration, profile access, booking, cancellation |
| Technical assumption | Capable of operating a modern web browser |

#### 2.3.2 Registered Customer (Authenticated User)

A Registered Customer is a visitor who has completed account registration and email OTP verification, and who presents a valid JWT Bearer token with each request. Two sub-types exist, differentiated by the `customer_type` field:

| Sub-type | `customer_type` Value | Typical Profile |
|---|---|---|
| Personal Customer | `PERSONAL` | Individual prospective EV buyer |
| Company Customer | `COMPANY` | Corporate fleet manager or procurement officer |

Both sub-types have identical system permissions. The `customer_type` distinction is recorded for business reporting purposes only and does not alter functional access rights.

| Attribute | Detail |
|---|---|
| Authentication required | Yes — valid JWT Bearer token |
| Permitted operations | All Guest operations, plus: seminar registration, registration history, cancellation, profile retrieval |
| Session duration | 24 hours from token issuance |
| Account prerequisite | Email address must be verified before login is permitted |

---

### 2.4 Operating Environment

#### 2.4.1 Server-Side Environment

| Component | Specification |
|---|---|
| Container runtime | Docker Engine (Docker Compose v3.8) |
| Backend runtime | Java 17 (OpenJDK), Spring Boot 3.2.5 |
| Backend port | `8080` (HTTP) |
| Database engine | MySQL 8 |
| Database port | `3306` (internal only) |
| Frontend server | Nginx (Alpine-based Docker image) |
| Frontend port | `80` (HTTP) |
| Mail relay | SMTP over STARTTLS, port `587` (default: Gmail SMTP) |

#### 2.4.2 Client-Side Environment

| Requirement | Specification |
|---|---|
| Device type | Desktop or laptop computer (primary); tablet (secondary) |
| Browser support | Any modern browser supporting ES2020+, CSS Flexbox/Grid, and the Fetch API |
| Minimum recommended resolution | 1280 × 720 px |
| JavaScript | Must be enabled |
| Network | Standard HTTP/HTTPS connectivity to the application server |

Mobile native applications (iOS/Android) are explicitly out of scope for this version.

---

### 2.5 Technical Guidelines and Development Framework

#### 2.5.1 Backend Stack

| Layer | Technology | Version |
|---|---|---|
| Language | Java | 17 |
| Framework | Spring Boot | 3.2.5 |
| Web layer | Spring MVC (REST) | (via Spring Boot) |
| Persistence | Spring Data JPA / Hibernate | (via Spring Boot) |
| Security | Spring Security | (via Spring Boot) |
| JWT library | JJWT (io.jsonwebtoken) | 0.12.5 |
| Email | Spring Boot Mail (Jakarta Mail) | (via Spring Boot) |
| Validation | Spring Boot Validation (Hibernate Validator) | (via Spring Boot) |
| Build tool | Apache Maven | 3.x |
| Code generation | Lombok | 1.18.36 |
| Database driver | MySQL Connector/J | (managed by Spring Boot) |

#### 2.5.2 Frontend Stack

| Layer | Technology | Version |
|---|---|---|
| Language | JavaScript (ES Modules) | ES2020+ |
| UI framework | React | 19.x |
| Routing | React Router DOM | 7.x |
| HTTP client | Axios | 1.x |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.x |
| Icon library | Lucide React | 1.x |
| UI primitives | Headless UI, Radix UI Slot | 2.x / 1.x |
| Build tool | Vite | 8.x |
| Linter | ESLint | 9.x |

#### 2.5.3 Database

| Attribute | Detail |
|---|---|
| Engine | MySQL 8 |
| Schema name | `sehs4701` |
| Character set | NOT SPECIFIED IN REPOSITORY |
| DDL management | Hibernate `ddl-auto: update` (development); initialisation scripts in [`database/schema.sql`](database/schema.sql) |
| Seed data | [`database/data.sql`](database/data.sql) |

#### 2.5.4 Security Standards

| Concern | Implementation |
|---|---|
| Authentication mechanism | JWT Bearer tokens (HMAC-SHA256 signing) |
| Token expiry | 86,400,000 ms (24 hours) |
| Password storage | BCrypt hashing (via Spring Security `PasswordEncoder`) |
| Transport security | HTTPS recommended for production; HTTP used in development |
| CORS policy | Configured in [`CorsConfig.java`](backend/src/main/java/com/sehs4701/backend/config/CorsConfig.java) |
| Unauthenticated access | Returns HTTP `401 Unauthorized` via [`JwtAuthenticationEntryPoint.java`](backend/src/main/java/com/sehs4701/backend/security/JwtAuthenticationEntryPoint.java) |
| Input validation | Bean Validation (JSR-380) annotations on all request DTOs |

#### 2.5.5 Coding Standards

- All backend source code follows standard Java naming conventions (PascalCase for classes, camelCase for methods and fields).
- All REST endpoints return JSON payloads. Error responses conform to the [`ApiErrorResponse`](backend/src/main/java/com/sehs4701/backend/dto/response/ApiErrorResponse.java) structure.
- All frontend API calls are centralised in the [`src/api/`](frontend/electric-vehicle-seminar-ui/src/api/) directory and routed through a shared [`axiosInstance.js`](frontend/electric-vehicle-seminar-ui/src/api/axiosInstance.js) that automatically attaches the JWT Bearer token from local storage.
- Environment-specific configuration is externalised via environment variables (`.env` file or Docker Compose `environment` block); no secrets are hard-coded in production configuration.

---

### 2.6 User Documentation

The following documentation artefacts are provided within this repository:

| Document | Format | Location |
|---|---|---|
| API Functional Specification | Markdown / PDF | [`docs/api_documentation.md`](docs/api_documentation.md) |
| Database Schema | SQL | [`database/schema.sql`](database/schema.sql) |
| Database Seed Data | SQL | [`database/data.sql`](database/data.sql) |
| Process Flow Charts | PNG (draw.io export) | [`docs/Process Flow Charts.drawio.png`](docs/Process%20Flow%20Charts.drawio.png) |
| Entity Relationship Diagram | PNG (draw.io export) | [`docs/Relationship_Page.drawio.png`](docs/Relationship_Page.drawio.png) |
| Master Test Plan | Excel | [`docs/test-plans/Master-Test-Plan.xlsx`](docs/test-plans/Master-Test-Plan.xlsx) |
| Unit Test Plan | CSV | [`docs/test-plans/unit_test_plan.csv`](docs/test-plans/unit_test_plan.csv) |
| Integration Test Plan | CSV | [`docs/test-plans/integration_test_plan.csv`](docs/test-plans/integration_test_plan.csv) |
| System Test Plan | CSV | [`docs/test-plans/system_test_plan.csv`](docs/test-plans/system_test_plan.csv) |
| UI Screenshots | PNG | [`Screenshot/`](Screenshot/) |
| README | Markdown | [`README.md`](README.md) |

No end-user manual or administrator guide is provided in this version, as the system does not include an administrator portal and the customer-facing interface is designed to be self-explanatory.

---

### 2.7 Assumptions and Dependencies

#### 2.7.1 Assumptions

| # | Assumption |
|---|---|
| A-01 | All users access the system via a desktop or laptop browser. Mobile-optimised layouts are provided on a best-effort basis but are not a primary design target. |
| A-02 | The SMTP mail relay (Gmail SMTP by default) is operational and the configured credentials are valid at the time of deployment. |
| A-03 | The system clock of the server hosting the application is synchronised (NTP) to ensure accurate JWT expiry and OTP expiry calculations. |
| A-04 | Seminar data (dates, seat capacities, associated vehicles) is pre-populated in the database by an administrator prior to system use. No self-service seminar creation is available to end users. |
| A-05 | Each customer registers with a unique, valid email address to which they have access, as email OTP verification is mandatory for account activation. |
| A-06 | The `seats_booked` value submitted at registration time is between 1 and 2 inclusive; the database enforces this constraint via a `CHECK` clause. |
| A-07 | Waitlist promotion follows strict FIFO order based on the `created_at` timestamp of the `WAIT` registration record. |

#### 2.7.2 External Dependencies

| # | Dependency | Purpose | Failure Impact |
|---|---|---|---|
| D-01 | MySQL 8 | Persistent data storage for all system entities | System non-functional without database connectivity |
| D-02 | SMTP Mail Relay (Gmail SMTP, port 587) | Transactional email dispatch (OTP, confirmations, notifications) | Email notifications fail; registration and verification flows are disrupted |
| D-03 | Docker Engine / Docker Compose | Container orchestration for all three tiers | Containerised deployment unavailable; manual deployment required |
| D-04 | Java 17 Runtime (OpenJDK) | Backend application execution | Backend non-functional |
| D-05 | Node.js / npm (build-time only) | Frontend asset compilation via Vite | Frontend build fails; not required at runtime |
| D-06 | Nginx | Static asset serving and reverse proxy for the frontend SPA | Frontend inaccessible |

---

## 3. Business Rules

This section defines the authoritative business rules that govern system behaviour. All rules are derived directly from the implemented source code and database schema. Rules are identified by a unique code (BR-XXX) for traceability.

---

### 3.1 User Account Rules

| Rule ID | Rule | Source |
|---|---|---|
| BR-001 | A customer account requires the following fields: full name (max 100 chars), telephone number (max 20 chars), email address, password (min 6 chars), and customer type (`PERSONAL` or `COMPANY`). All fields are mandatory. | [`RegisterRequest.java`](backend/src/main/java/com/sehs4701/backend/dto/request/RegisterRequest.java) |
| BR-002 | Email addresses are normalised to lowercase and trimmed of whitespace before storage and lookup. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-003 | Each email address must be unique across all customer accounts. Attempting to register with an already-verified email returns an error: *"Email already registered and verified. Please login."* | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-004 | If a registration attempt is made with an email that exists but has not yet been verified, the system overwrites the existing unverified account with the new registration details and issues a fresh OTP. The previous OTP is superseded. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-005 | Passwords are stored exclusively as BCrypt hashes. Plaintext passwords are never persisted. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java), [`SecurityConfig.java`](backend/src/main/java/com/sehs4701/backend/config/SecurityConfig.java) |
| BR-006 | A customer account is considered inactive until the email address has been verified. An unverified customer cannot log in. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-007 | The `customer_type` field accepts only the values `PERSONAL` or `COMPANY`. Any other value is rejected at the validation layer. | [`CustomerType.java`](backend/src/main/java/com/sehs4701/backend/entity/enums/CustomerType.java) |

---

### 3.2 Email Verification Rules

| Rule ID | Rule | Source |
|---|---|---|
| BR-008 | Upon successful registration, the system generates a 6-digit numeric OTP using a cryptographically secure random number generator (`SecureRandom`). The OTP range is 100000–999999 inclusive. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-009 | Each OTP is valid for exactly 10 minutes from the time of generation. Submission of an expired OTP returns an error: *"Verification code has expired. Please register again."* | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-010 | OTP verification uses the most recently created verification record for the customer (`findTopByCustomerIdOrderByCreatedAtDesc`). Earlier OTP records for the same customer are implicitly superseded. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-011 | Submission of an incorrect OTP returns an error: *"Invalid verification code"*. The system does not enforce a maximum attempt count in this version. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-012 | Upon successful OTP verification, the customer's `email_verified` flag is set to `true`, a JWT is immediately issued (auto-login), and a registration success email is dispatched. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |
| BR-013 | If the SMTP service is unavailable at registration time, the OTP record is still persisted in the database and the registration is not rolled back. The system returns a degraded-mode message advising the operator to retrieve the OTP directly from the database. | [`AuthService.java`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) |

---

### 3.3 Seminar Registration Rules

| Rule ID | Rule | Source |
|---|---|---|
| BR-014 | Only customers with a verified email address may register for a seminar. Unverified customers receive an error: *"Email must be verified before registering for a seminar."* | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-015 | A customer may book either 1 or 2 seats per registration. The `seats_booked` value is constrained to the range [1, 2] at both the database level (`CHECK` constraint) and the application layer. | [`database/schema.sql`](database/schema.sql), [`SeminarRegistrationRequest.java`](backend/src/main/java/com/sehs4701/backend/dto/request/SeminarRegistrationRequest.java) |
| BR-016 | A customer may not hold more than one active registration (status `SUCCESS` or `WAIT`) for the same seminar. Attempting a duplicate registration returns an error: *"You already have an active registration for this seminar."* | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-017 | Registration for a seminar whose `seminar_date` is in the past is rejected with an error: *"Cannot register for a past seminar."* | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-018 | Seat availability is calculated as: `available_seats = seminar.max_seats − SUM(seats_booked WHERE status = 'SUCCESS')`. Only confirmed (`SUCCESS`) registrations consume seat capacity. Waitlisted (`WAIT`) registrations do not reduce available seat count. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-019 | If `seats_booked ≤ available_seats` at the time of booking, the registration is assigned status `SUCCESS`. Otherwise, it is assigned status `WAIT`. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-020 | Seat availability is evaluated under a pessimistic database lock (`SELECT ... FOR UPDATE` on the seminar row) to prevent race conditions in concurrent booking scenarios. | [`SeminarRepository.java`](backend/src/main/java/com/sehs4701/backend/repository/SeminarRepository.java), [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |

---

### 3.4 Waitlist and Promotion Rules

| Rule ID | Rule | Source |
|---|---|---|
| BR-021 | Waitlist promotion is triggered exclusively when a registration with status `SUCCESS` is cancelled. Cancellation of a `WAIT` registration does not trigger promotion. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-022 | Upon a `SUCCESS` cancellation, the system recomputes available seats and iterates through all `WAIT` registrations for the same seminar in ascending `created_at` order (FIFO). | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-023 | A waitlisted registration is promoted to `SUCCESS` only if its `seats_booked` value is less than or equal to the current number of available seats. If a waitlisted registration requires more seats than are available, it is skipped and the next eligible registration is evaluated. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-024 | Promotion continues iterating through the waitlist until no available seats remain or the waitlist is exhausted. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-025 | Each customer whose registration is promoted from `WAIT` to `SUCCESS` receives a waitlist promotion email notification. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |

---

### 3.5 Cancellation Rules

| Rule ID | Rule | Source |
|---|---|---|
| BR-026 | A customer may only cancel their own registrations. The system validates that the registration belongs to the authenticated customer before processing the cancellation. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-027 | A registration that is already in `CANCEL` status cannot be cancelled again. The system returns an error: *"Registration is already cancelled."* | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-028 | Cancellation is not permitted after the seminar's `seminar_date` has passed. The system returns an error: *"Cannot cancel a registration after the seminar has started."* | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-029 | Upon successful cancellation, the registration status is updated to `CANCEL` and a cancellation acknowledgement email is dispatched to the customer. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |

---

### 3.6 Registration History Rules

| Rule ID | Rule | Source |
|---|---|---|
| BR-030 | The registration history query returns only registrations whose associated seminar date falls within the past 12 months from the current date and time. Registrations for seminars older than 12 months are excluded. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-031 | Registration history is scoped strictly to the authenticated customer. A customer cannot view another customer's registrations. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-032 | Registration history results are returned in descending seminar date order (most recent first). | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |
| BR-033 | Individual registration detail retrieval is also scoped to the authenticated customer. Attempting to retrieve a registration belonging to another customer returns a `404 Not Found` response. | [`RegistrationService.java`](backend/src/main/java/com/sehs4701/backend/service/RegistrationService.java) |

---

### 3.7 Security and Authentication Rules

| Rule ID | Rule | Source |
|---|---|---|
| BR-034 | All protected API endpoints require a valid JWT Bearer token in the `Authorization` HTTP header. Requests without a valid token receive an HTTP `401 Unauthorized` response. | [`SecurityConfig.java`](backend/src/main/java/com/sehs4701/backend/config/SecurityConfig.java), [`JwtAuthenticationEntryPoint.java`](backend/src/main/java/com/sehs4701/backend/security/JwtAuthenticationEntryPoint.java) |
| BR-035 | JWT tokens are signed using HMAC-SHA256 with a secret key of at least 256 bits. The secret key must be overridden via the `JWT_SECRET` environment variable in production deployments. | [`JwtUtil.java`](backend/src/main/java/com/sehs4701/backend/security/JwtUtil.java), [`application.yml`](backend/src/main/resources/application.yml) |
| BR-036 | JWT tokens expire 86,400,000 milliseconds (24 hours) after issuance. There is no refresh token mechanism; expired tokens require the customer to log in again. | [`application.yml`](backend/src/main/resources/application.yml) |
| BR-037 | The JWT subject claim is set to the customer's normalised email address. All authenticated service operations resolve the customer identity from this claim. | [`JwtUtil.java`](backend/src/main/java/com/sehs4701/backend/security/JwtUtil.java), [`JwtAuthenticationFilter.java`](backend/src/main/java/com/sehs4701/backend/security/JwtAuthenticationFilter.java) |
| BR-038 | Logout is implemented client-side by discarding the JWT from browser storage. The backend does not maintain a token blacklist or server-side session state. | [`AuthContext.jsx`](frontend/electric-vehicle-seminar-ui/src/context/AuthContext.jsx) |
| BR-039 | The following API endpoints are publicly accessible without authentication: `POST /api/auth/register`, `POST /api/auth/verify-email`, `POST /api/auth/login`, `GET /api/vehicles/**`, `GET /api/seminars/**`. All other endpoints require authentication. | [`SecurityConfig.java`](backend/src/main/java/com/sehs4701/backend/config/SecurityConfig.java) |

---

## 4. External Interface

### 4.1 User Interfaces

The system provides a single-page application (SPA) frontend built with React 19. All user-facing interactions occur within this SPA; there is no server-rendered HTML. The following design principles govern the user interface:

| Principle | Detail |
|---|---|
| Language | English (en) |
| Design language | Tailwind CSS utility-first styling with custom component classes |
| Responsive layout | Fluid grid layout; primary target is desktop (≥1280 px); tablet supported on best-effort basis |
| Animation | Framer Motion used for page transitions and interactive element feedback |
| Icon set | Lucide React |
| Accessibility | Semantic HTML elements; Headless UI and Radix UI primitives used for accessible interactive components |
| Error feedback | Inline form validation messages and toast-style error banners |
| Loading states | Spinner/skeleton states displayed during asynchronous API calls |
| Authentication guard | Unauthenticated access to protected routes redirects to `/login` via React Router `<Navigate>` |

#### 4.1.1 Application Routes

| Route | Page Component | Access |
|---|---|---|
| `/` | [`HomePage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/HomePage.jsx) | Public |
| `/login` | [`LoginPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/LoginPage.jsx) | Public |
| `/register` | [`RegisterPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/RegisterPage.jsx) | Public |
| `/verify` | [`VerificationPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/VerificationPage.jsx) | Public |
| `/ev-catalog` | [`EVCatalogPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/EVCatalogPage.jsx) | Public |
| `/seminars` | [`SeminarRegistrationPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/SeminarRegistrationPage.jsx) | Public (registration action requires auth) |
| `/dashboard` | [`DashboardPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/DashboardPage.jsx) | Protected |
| `/my-registrations` | [`MyRegistrationsPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/MyRegistrationsPage.jsx) | Protected |
| `/my-registrations/:id` | [`RegistrationDetailPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/RegistrationDetailPage.jsx) | Protected |
| `*` (catch-all) | [`NotFoundPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/NotFoundPage.jsx) | Public |

#### 4.1.2 UI Screenshots

Representative screenshots of the implemented interface are available in the [`Screenshot/`](Screenshot/) directory:

| Screenshot | Description |
|---|---|
| [`Mainpage-Sing-Out.png`](Screenshot/Mainpage-Sing-Out.png) | Home page — unauthenticated state |
| [`Mainpage-Sign-In.png`](Screenshot/Mainpage-Sign-In.png) | Home page — authenticated state |
| [`Sign-in.png`](Screenshot/Sign-in.png) | Login page |
| [`Create-Account.png`](Screenshot/Create-Account.png) | Registration page |
| [`EV-Catelog-Sign-Out.png`](Screenshot/EV-Catelog-Sign-Out.png) | EV Catalog — unauthenticated state |
| [`EV-Catelog-Sign-In.png`](Screenshot/EV-Catelog-Sign-In.png) | EV Catalog — authenticated state |
| [`Seminars.png`](Screenshot/Seminars.png) | Seminar listing and registration page |
| [`Dashboard.png`](Screenshot/Dashboard.png) | Customer dashboard |
| [`My-Registrations.png`](Screenshot/My-Registrations.png) | Registration history list |
| [`Registrations-Details-Success.png`](Screenshot/Registrations-Details-Success.png) | Registration detail — SUCCESS status |
| [`Registrations-Details-Cancel.png`](Screenshot/Registrations-Details-Cancel.png) | Registration detail — CANCEL status |

---

### 4.2 Hardware Interfaces

The system does not interface directly with any physical hardware devices. All hardware interaction is mediated through the operating system and standard network stack.

| Component | Requirement |
|---|---|
| Server hardware | Any x86-64 host capable of running Docker Engine; minimum 2 CPU cores and 2 GB RAM recommended for the full Docker Compose stack |
| Client hardware | Any desktop or laptop computer with a modern web browser; minimum display resolution of 1280 × 720 px recommended |
| Network interface | Standard TCP/IP network interface card; no specialised hardware required |
| Storage | Persistent Docker volume (`db_data`) for MySQL data files; minimum 1 GB free disk space recommended |

No barcode scanners, card readers, printers, or other peripheral devices are required or supported.

---

### 4.3 Software Interfaces

#### 4.3.1 Backend REST API

The frontend SPA communicates exclusively with the backend via a RESTful HTTP API. All requests and responses use the `application/json` content type. The full API specification is documented in [`docs/api_documentation.md`](docs/api_documentation.md).

| API Group | Base Path | Auth Required |
|---|---|---|
| Authentication | `/api/auth/**` | No (public) |
| Customer Profile | `/api/customers/**` | Yes |
| Vehicles | `/api/vehicles/**` | No (public) |
| Seminars | `/api/seminars/**` | No (public) |
| Registrations | `/api/registrations/**` | Yes |

The Axios HTTP client ([`axiosInstance.js`](frontend/electric-vehicle-seminar-ui/src/api/axiosInstance.js)) is configured with:
- Base URL: `VITE_API_BASE_URL` environment variable, defaulting to `http://localhost:8080`
- Request timeout: 10,000 ms
- Default `Content-Type: application/json` header
- Automatic JWT Bearer token injection from `localStorage` via request interceptor

#### 4.3.2 Nginx Reverse Proxy

In the containerised deployment, Nginx serves the compiled React SPA static assets and proxies all `/api/` path requests to the backend container at `http://backend:8080/api/`. This eliminates cross-origin issues in production. Configuration is defined in [`nginx.conf`](frontend/electric-vehicle-seminar-ui/nginx.conf).

#### 4.3.3 MySQL 8 Database

The backend communicates with MySQL 8 via the MySQL Connector/J JDBC driver, managed by Spring Data JPA / Hibernate. The JDBC connection URL in the containerised environment is:

```
jdbc:mysql://db:3306/sehs4701?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
```

Schema initialisation is performed automatically on first container start via Docker volume mounts of [`database/schema.sql`](database/schema.sql) and [`database/data.sql`](database/data.sql).

#### 4.3.4 SMTP Mail Service

The backend dispatches transactional emails via the JavaMail API (Spring Boot Mail) over SMTP with STARTTLS. The default configuration targets Gmail SMTP:

| Parameter | Value |
|---|---|
| Host | `smtp.gmail.com` (overridable via `MAIL_HOST`) |
| Port | `587` (overridable via `MAIL_PORT`) |
| Security | STARTTLS |
| Authentication | Username / App Password |
| Connection timeout | 10,000 ms |
| Read timeout | 10,000 ms |
| Write timeout | 10,000 ms |

---

### 4.4 Communications Interfaces

| Interface | Protocol | Port | Direction | Format |
|---|---|---|---|---|
| Browser to Frontend (Nginx) | HTTP | 80 | Inbound | HTML / CSS / JS static assets |
| Browser to Backend API (via Nginx proxy) | HTTP | 80 (proxied to 8080) | Inbound | JSON (`application/json`) |
| Frontend (dev) to Backend API (direct) | HTTP | 8080 | Inbound | JSON (`application/json`) |
| Backend to MySQL | TCP (MySQL protocol) | 3306 | Outbound | MySQL binary protocol |
| Backend to SMTP relay | TCP (SMTP + STARTTLS) | 587 | Outbound | SMTP / MIME |

#### 4.4.1 API Request / Response Format

All API requests and responses conform to the following conventions:

- **Content-Type**: `application/json`
- **Character encoding**: UTF-8
- **Authentication header**: `Authorization: Bearer <JWT>`
- **Timestamp format**: ISO 8601 (`yyyy-MM-dd'T'HH:mm:ss`)
- **Error response structure** (from [`ApiErrorResponse.java`](backend/src/main/java/com/sehs4701/backend/dto/response/ApiErrorResponse.java)):

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": ["field: error description"],
  "timestamp": "2026-04-26T12:00:00"
}
```

#### 4.4.2 CORS Policy

Cross-Origin Resource Sharing (CORS) is configured in [`CorsConfig.java`](backend/src/main/java/com/sehs4701/backend/config/CorsConfig.java) and applies to all `/api/**` endpoints:

| Parameter | Value |
|---|---|
| Allowed origins | `http://localhost:3000`, `http://localhost:5173`, `http://127.0.0.1:3000`, `http://127.0.0.1:5173` |
| Allowed methods | `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` |
| Allowed headers | `*` (all headers) |
| Allow credentials | `true` |
| Max age (preflight cache) | 3600 seconds |

In the containerised production deployment, the Nginx reverse proxy handles all API traffic on port 80, making CORS restrictions irrelevant for same-origin requests. The CORS configuration above applies to local development environments only.

---

## 5. System Architecture and Holistic Design

### 5.1 Logical System Diagram

The system is structured as a classic three-tier architecture. The following describes the logical components and their relationships:

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                              │
│                                                                 │
│   Browser (Desktop / Laptop)                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  React 19 SPA (Vite build, served by Nginx)             │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │   │
│   │  │  Pages   │  │ Context  │  │ API Layer│              │   │
│   │  │ (Routes) │  │ (Auth)   │  │ (Axios)  │              │   │
│   │  └──────────┘  └──────────┘  └──────────┘              │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP/JSON (port 80 → proxied to 8080)
                            │ Authorization: Bearer <JWT>
┌───────────────────────────▼─────────────────────────────────────┐
│                      APPLICATION TIER                           │
│                                                                 │
│   Spring Boot 3.2.5 (Java 17)                                   │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  Security Layer                                          │  │
│   │  JwtAuthenticationFilter → SecurityFilterChain           │  │
│   ├──────────────────────────────────────────────────────────┤  │
│   │  Controller Layer                                        │  │
│   │  AuthController │ CustomerController │ VehicleController │  │
│   │  SeminarController │ RegistrationController              │  │
│   ├──────────────────────────────────────────────────────────┤  │
│   │  Service Layer                                           │  │
│   │  AuthService │ CustomerService │ VehicleService          │  │
│   │  SeminarService │ RegistrationService │ EmailService     │  │
│   ├──────────────────────────────────────────────────────────┤  │
│   │  Repository Layer (Spring Data JPA)                      │  │
│   │  CustomerRepository │ SeminarRepository                  │  │
│   │  RegistrationRepository │ VehicleRepository              │  │
│   │  EmailVerificationRepository │ EmailLogRepository        │  │
│   └──────────────────────────────────────────────────────────┘  │
└───────────┬───────────────────────────────────────┬─────────────┘
            │ JDBC / MySQL protocol (port 3306)      │ SMTP/STARTTLS
            │                                        │ (port 587)
┌───────────▼──────────────┐             ┌───────────▼─────────────┐
│       DATA TIER          │             │   EXTERNAL SERVICE       │
│                          │             │                          │
│   MySQL 8                │             │   Gmail SMTP Relay       │
│   Database: sehs4701     │             │   (Transactional Email)  │
│   Tables:                │             │                          │
│   customer               │             └──────────────────────────┘
│   seminar                │
│   vehicle                │
│   registration           │
│   email_verification     │
│   email_log              │
└──────────────────────────┘
```

**Component responsibilities:**

| Component | Responsibility |
|---|---|
| React SPA | Renders all UI pages; manages client-side routing; stores JWT in `localStorage`; injects Bearer token on all API requests |
| Nginx | Serves compiled SPA static assets; proxies `/api/**` requests to the Spring Boot backend |
| Spring Security Filter Chain | Intercepts all requests; validates JWT; populates `SecurityContext`; rejects unauthenticated requests with HTTP 401 |
| Controller Layer | Receives HTTP requests; delegates to service layer; returns JSON responses |
| Service Layer | Implements all business logic; enforces business rules; coordinates repository and email operations |
| Repository Layer | Provides JPA-based data access; executes JPQL/native queries against MySQL |
| MySQL 8 | Persists all application data; enforces referential integrity and constraints |
| Gmail SMTP | Delivers transactional emails (OTP, confirmations, notifications) |

---

### 5.2 Physical System Diagram

In the containerised deployment, all three application tiers run as Docker containers orchestrated by Docker Compose on a single host machine:

```
┌─────────────────────────────────────────────────────────────────┐
│                     DOCKER HOST (Linux / Windows)               │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  frontend        │  │  backend         │  │  db          │  │
│  │  (Nginx:Alpine)  │  │  (OpenJDK 17)    │  │  (MySQL 8)   │  │
│  │                  │  │                  │  │              │  │
│  │  Port: 80:80     │  │  Port: 8080:8080 │  │  Port: 3306  │  │
│  │                  │  │                  │  │  (internal)  │  │
│  │  Serves:         │  │  Spring Boot     │  │              │  │
│  │  /usr/share/     │  │  REST API        │  │  Volume:     │  │
│  │  nginx/html      │  │                  │  │  db_data     │  │
│  │                  │  │  Depends on: db  │  │              │  │
│  │  Depends on:     │  │  (health check)  │  │  Init:       │  │
│  │  backend         │  │                  │  │  schema.sql  │  │
│  └──────────────────┘  └──────────────────┘  │  data.sql    │  │
│                                               └──────────────┘  │
│  Docker Network (bridge): all containers communicate by name    │
│  Named Volume: db_data (persists MySQL data files)              │
└─────────────────────────────────────────────────────────────────┘
                │ Port 80 exposed to host
                │ Port 8080 exposed to host (dev/direct access)
         ┌──────▼──────┐
         │   End User  │
         │   Browser   │
         └─────────────┘
```

**Container startup order:**
1. `db` container starts and passes MySQL health check (`mysqladmin ping`)
2. `backend` container starts (depends on `db` health check passing)
3. `frontend` container starts (depends on `backend` being up)

**Network topology:**
- All containers share a Docker bridge network; inter-container communication uses service names as hostnames (e.g., `backend:8080`, `db:3306`)
- Only ports `80` (frontend) and `8080` (backend) are exposed to the host; the database port `3306` is internal only

---

### 5.3 Overall System Flowchart

The following describes the holistic data and control flow across the major system processes:

```
[Guest / Browser]
      │
      ├─── Browse EV Catalog ──────────────────────────────────────────►
      │    GET /api/vehicles                                            │
      │    ◄── VehicleResponse[] ──────────────────────────────────────┘
      │
      ├─── View Seminars ──────────────────────────────────────────────►
      │    GET /api/seminars                                            │
      │    ◄── SeminarResponse[] (with available seats) ───────────────┘
      │
      ├─── Register Account ──────────────────────────────────────────►
      │    POST /api/auth/register                                      │
      │    ◄── 200 OK (OTP sent to email) ─────────────────────────────┘
      │         │
      │         ▼
      │    POST /api/auth/verify-email (submit OTP)
      │    ◄── AuthResponse (JWT issued, auto-login)
      │
      ├─── Login ─────────────────────────────────────────────────────►
      │    POST /api/auth/login                                         │
      │    ◄── AuthResponse (JWT token) ───────────────────────────────┘
      │         │
      │         ▼ [JWT stored in localStorage]
      │
[Authenticated Customer]
      │
      ├─── View Dashboard ────────────────────────────────────────────►
      │    GET /api/customers/profile                                   │
      │    ◄── CustomerProfileResponse ───────────────────────────────┘
      │
      ├─── Register for Seminar ──────────────────────────────────────►
      │    POST /api/registrations                                      │
      │    ◄── RegistrationResponse (status: SUCCESS or WAIT) ─────────┘
      │         │
      │         ▼ [Email notification dispatched]
      │
      ├─── View Registration History ─────────────────────────────────►
      │    GET /api/registrations (past 12 months)                      │
      │    ◄── RegistrationResponse[] ────────────────────────────────┘
      │
      ├─── View Registration Detail ──────────────────────────────────►
      │    GET /api/registrations/{id}                                  │
      │    ◄── RegistrationResponse ───────────────────────────────────┘
      │
      ├─── Cancel Registration ───────────────────────────────────────►
      │    DELETE /api/registrations/{id}                               │
      │    ◄── RegistrationResponse (status: CANCEL) ──────────────────┘
      │         │
      │         ▼ [Cancellation email sent]
      │         ▼ [If was SUCCESS: FIFO waitlist promotion triggered]
      │              │
      │              ▼ [Eligible WAIT registrations → SUCCESS]
      │              ▼ [Promotion email sent to each promoted customer]
      │
      └─── Logout ────────────────────────────────────────────────────►
           [JWT removed from localStorage — client-side only]
```

The process flow charts for individual functions are available in [`docs/Process Flow Charts.drawio.png`](docs/Process%20Flow%20Charts.drawio.png).

---

### 5.4 Comprehensive ER Diagram

The following describes the complete entity-relationship model of the `sehs4701` database schema. The visual ER diagram is available at [`docs/Relationship_Page.drawio.png`](docs/Relationship_Page.drawio.png).

#### 5.4.1 Entity Summary

| Entity | Table | Primary Key | Description |
|---|---|---|---|
| Customer | `customer` | `id` (BIGINT, AUTO_INCREMENT) | Registered customer account |
| EmailVerification | `email_verification` | `id` (BIGINT, AUTO_INCREMENT) | OTP records for email verification |
| EmailLog | `email_log` | `id` (BIGINT, AUTO_INCREMENT) | Audit log of all dispatched emails |
| Vehicle | `vehicle` | `id` (BIGINT, AUTO_INCREMENT) | EV model in the catalog |
| Seminar | `seminar` | `id` (BIGINT, AUTO_INCREMENT) | Scheduled seminar event |
| Registration | `registration` | `id` (BIGINT, AUTO_INCREMENT) | Customer booking for a seminar |

#### 5.4.2 Relationships

| Relationship | Type | Foreign Key | Description |
|---|---|---|---|
| Customer → EmailVerification | One-to-Many | `email_verification.customer_id → customer.id` | A customer may have multiple OTP records (one per registration attempt) |
| Customer → Registration | One-to-Many | `registration.customer_id → customer.id` | A customer may have multiple seminar registrations |
| Vehicle → Seminar | One-to-Many | `seminar.vehicle_id → vehicle.id` | A vehicle may be featured in multiple seminars |
| Seminar → Registration | One-to-Many | `registration.seminar_id → seminar.id` | A seminar may have multiple registrations |

#### 5.4.3 Entity Attribute Detail

**`customer`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT | Surrogate primary key |
| `name` | VARCHAR(100) | NOT NULL | Customer full name |
| `telephone` | VARCHAR(20) | NOT NULL | Contact telephone number |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Login identifier; normalised to lowercase |
| `password_hash` | VARCHAR(255) | NOT NULL | BCrypt-hashed password |
| `customer_type` | ENUM('COMPANY','PERSONAL') | NOT NULL | Customer classification |
| `email_verified` | BOOLEAN | DEFAULT FALSE | Account activation flag |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last modification time |

**`email_verification`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT | Surrogate primary key |
| `customer_id` | BIGINT | NOT NULL, FK → customer.id | Owning customer |
| `otp_code` | VARCHAR(6) | NOT NULL | 6-digit OTP value |
| `expires_at` | TIMESTAMP | NOT NULL | OTP expiry time (10 minutes from creation) |
| `verified` | BOOLEAN | DEFAULT FALSE | Whether this OTP was successfully used |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**`email_log`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT | Surrogate primary key |
| `recipient` | VARCHAR(255) | NOT NULL | Recipient email address |
| `email_type` | VARCHAR(50) | NOT NULL | Email category (e.g., OTP, CONFIRMATION) |
| `subject` | VARCHAR(200) | NOT NULL | Email subject line |
| `body` | TEXT | — | Email body content |
| `status` | VARCHAR(20) | NOT NULL | Dispatch status (e.g., SENT, FAILED) |
| `error_message` | TEXT | — | Error detail if dispatch failed |
| `sent_at` | TIMESTAMP | NULL | Actual dispatch timestamp |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**`vehicle`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT | Surrogate primary key |
| `model_number` | VARCHAR(50) | NOT NULL, UNIQUE | EV model identifier |
| `description` | TEXT | — | Model description |
| `picture_url` | VARCHAR(500) | — | URL to model image |
| `features` | TEXT | — | Feature list |
| `unit_price` | DECIMAL(12,2) | NOT NULL | Retail price |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**`seminar`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT | Surrogate primary key |
| `vehicle_id` | BIGINT | NOT NULL, FK → vehicle.id | Featured EV model |
| `seminar_date` | DATETIME | NOT NULL | Scheduled date and time |
| `max_seats` | INT | NOT NULL | Total seat capacity |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

**`registration`**

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT | Surrogate primary key |
| `customer_id` | BIGINT | NOT NULL, FK → customer.id | Registering customer |
| `seminar_id` | BIGINT | NOT NULL, FK → seminar.id | Target seminar |
| `seats_booked` | INT | NOT NULL, CHECK (1–2) | Number of seats requested |
| `status` | ENUM('SUCCESS','WAIT','CANCEL') | NOT NULL | Registration status |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time (used for FIFO ordering) |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last status change time |

#### 5.4.4 Database Indexes

| Index Name | Table | Column(s) | Purpose |
|---|---|---|---|
| `idx_customer_email` | `customer` | `email` | Fast customer lookup by email (login, auth) |
| `idx_seminar_date` | `seminar` | `seminar_date` | Fast seminar filtering by date |
| `idx_registration_customer` | `registration` | `customer_id` | Fast registration history retrieval |
| `idx_registration_seminar` | `registration` | `seminar_id` | Fast seat count aggregation per seminar |
| `idx_registration_status` | `registration` | `status` | Fast filtering by registration status |
| `idx_email_log_recipient` | `email_log` | `recipient` | Fast email log lookup by recipient |
| `idx_email_log_type` | `email_log` | `email_type` | Fast email log filtering by type |

---

## 6. System Functions (Functional Requirements)

Each system function is documented with the following subsections: **Description**, **Function Implementation**, **Validation**, and **Data Dictionary**. All functions are derived directly from the implemented source code and database schema.

---

### 6.1 User Registration (SF-001)

#### Description

SF-001 enables a new visitor to create a customer account in the ZhongNeng EV Seminar Registration System. The customer provides their personal details and selects an account type (`PERSONAL` or `COMPANY`). Upon successful submission, the system creates an unverified account record, generates a 6-digit OTP, and dispatches a verification email. The account remains inactive until email verification (SF-002) is completed.

- **Function ID:** SF-001
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public (no authentication required)
- **Frontend Page:** [`RegisterPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/RegisterPage.jsx) at route `/register`
- **Related Business Rules:** BR-001, BR-002, BR-003, BR-004, BR-005, BR-006, BR-007, BR-008, BR-013

---

#### Function Implementation

**Step-by-step process:**

1. The customer navigates to `/register` and completes the registration form with: full name, telephone number, email address, password, password confirmation, and customer type (`PERSONAL` or `COMPANY`).
2. The frontend performs client-side pre-validation:
   - Checks that `password` matches `confirmPassword`.
   - Checks that `password.length >= 6`.
   - Normalises the email to lowercase and trims whitespace.
3. On form submission, the frontend calls `POST /api/auth/register` via [`authService.js`](frontend/electric-vehicle-seminar-ui/src/api/authService.js) with the payload: `{ name, telephone, email, password, customerType }`.
4. The [`AuthController`](backend/src/main/java/com/sehs4701/backend/controller/AuthController.java) receives the request and delegates to [`AuthService.register()`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java).
5. [`AuthService`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) normalises the email (lowercase + trim) and checks whether a customer record already exists for that email:
   - **Email already registered and verified** → throws `BadRequestException`: *"Email already registered and verified. Please login."*
   - **Email exists but unverified** → updates the existing customer record with the new submission details and resets `email_verified = false`. A new OTP is generated and the previous OTP is superseded.
   - **New email** → creates a new `Customer` entity with `email_verified = false` and persists it.
6. A 6-digit OTP is generated using `SecureRandom` (range 100000–999999) and an `EmailVerification` record is created with `expires_at = now() + 10 minutes`.
7. The system attempts to dispatch the OTP verification email via [`EmailService`](backend/src/main/java/com/sehs4701/backend/service/EmailService.java):
   - **Email sent successfully** → returns HTTP 200 with message: *"Registration successful. Please check your email for the verification code."*
   - **Email dispatch fails** → the OTP record is still persisted; returns HTTP 200 with degraded-mode message advising retrieval from the database.
8. The frontend stores the normalised email in `localStorage` as `pendingEmail` and navigates to `/verify` to await OTP entry (SF-002).

**Sequence:**

```
Browser          RegisterPage        AuthService         EmailService        DB
   │                  │                   │                   │               │
   │──[fill form]────►│                   │                   │               │
   │──[submit]───────►│                   │                   │               │
   │                  │──POST /register──►│                   │               │
   │                  │                  │──findByEmail──────────────────────►│
   │                  │                  │◄──customer (or null)───────────────│
   │                  │                  │──save Customer────────────────────►│
   │                  │                  │──save EmailVerification───────────►│
   │                  │                  │──sendVerificationEmail────────────►│
   │                  │                  │                   │──SMTP dispatch─►
   │                  │◄──200 OK─────────│                   │               │
   │◄─[navigate /verify]─────────────────│                   │               │
```

---

#### Validation

| Field | Rule | Error Message |
|---|---|---|
| `name` | Not blank; max 100 characters | *"Name is required"* / *"size must be between 0 and 100"* |
| `telephone` | Not blank; max 20 characters | *"Telephone is required"* / *"size must be between 0 and 20"* |
| `email` | Not blank; valid RFC email format | *"Email is required"* / *"Invalid email format"* |
| `password` | Not blank; min 6 characters | *"Password is required"* / *"Password must be at least 6 characters"* |
| `confirmPassword` | Must match `password` (client-side only) | *"Passwords do not match."* |
| `customerType` | Not null; must be `PERSONAL` or `COMPANY` | *"Customer type is required"* |
| Email uniqueness | Email must not already be registered and verified | *"Email already registered and verified. Please login."* |

Validation errors from Bean Validation (JSR-380) are returned as HTTP 400 with the [`ApiErrorResponse`](backend/src/main/java/com/sehs4701/backend/dto/response/ApiErrorResponse.java) structure:

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": ["email: Invalid email format", "password: Password must be at least 6 characters"],
  "timestamp": "2026-04-26T12:00:00"
}
```

---

#### Data Dictionary

**Tables affected:** `customer`, `email_verification`

**`customer` — INSERT or UPDATE**

| Column | Operation | Value |
|---|---|---|
| `name` | Write | Trimmed value from `RegisterRequest.name` |
| `telephone` | Write | Trimmed value from `RegisterRequest.telephone` |
| `email` | Write | Normalised (lowercase + trimmed) email |
| `password_hash` | Write | BCrypt hash of `RegisterRequest.password` |
| `customer_type` | Write | `PERSONAL` or `COMPANY` from `RegisterRequest.customerType` |
| `email_verified` | Write | `false` (always set to false on registration) |
| `created_at` | Auto | Set by `@CreationTimestamp` on first insert |
| `updated_at` | Auto | Set by `@UpdateTimestamp` on every save |

**`email_verification` — INSERT**

| Column | Operation | Value |
|---|---|---|
| `customer_id` | Write | FK to the saved `customer.id` |
| `otp_code` | Write | 6-digit string generated by `SecureRandom` (100000–999999) |
| `expires_at` | Write | `LocalDateTime.now().plusMinutes(10)` |
| `verified` | Write | `false` |
| `created_at` | Auto | Set by database `DEFAULT CURRENT_TIMESTAMP` |

**Entity Relationship (local):**

```
customer (1) ──────────────────── (many) email_verification
  id ◄──────────────────────────────── customer_id
```

---

### 6.2 Email OTP Verification (SF-002)

#### Description

SF-002 enables a newly registered customer to verify their email address by submitting the 6-digit OTP that was dispatched during SF-001. Upon successful verification, the customer's account is activated (`email_verified = true`), a JWT is immediately issued (auto-login), and a registration success email is dispatched. The customer is then redirected to their dashboard without requiring a separate login step.

- **Function ID:** SF-002
- **Endpoint:** `POST /api/auth/verify-email`
- **Access:** Public (no authentication required)
- **Frontend Page:** [`VerificationPage.jsx`](frontend/electric-vehicle-seminar-ui/src/pages/VerificationPage.jsx) at route `/verify`
- **Related Business Rules:** BR-006, BR-009, BR-010, BR-011, BR-012

---

#### Function Implementation

**Step-by-step process:**

1. After completing SF-001, the frontend navigates to `/verify` and passes the normalised email via React Router `location.state`. If `location.state` is absent, the email is retrieved from `localStorage` key `pendingEmail`. If neither is available, the user is redirected back to `/register`.
2. The customer enters the 6-digit OTP received in their email into the verification form.
3. The frontend performs client-side pre-validation: the OTP must match the pattern `^\d{6}$` (exactly 6 numeric digits). If not, an error is displayed without making an API call.
4. On form submission, the frontend calls `POST /api/auth/verify-email` via [`authService.js`](frontend/electric-vehicle-seminar-ui/src/api/authService.js) with payload: `{ email, otpCode }`.
5. The [`AuthController`](backend/src/main/java/com/sehs4701/backend/controller/AuthController.java) receives the request and delegates to [`AuthService.verifyEmail()`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java).
6. [`AuthService`](backend/src/main/java/com/sehs4701/backend/service/AuthService.java) normalises the email and looks up the customer record:
   - **Customer not found** → throws `ResourceNotFoundException`.
   - **Email already verified** → throws `BadRequestException`: *"Email already verified."*
7. The most recent `EmailVerification` record for the customer is retrieved (`findTopByCustomerIdOrderByCreatedAtDesc`):
   - **No verification record found** → throws `BadRequestException`: *"No verification code found. Please register again."*
   - **OTP expired** (`expires_at` before `now()`) → throws `BadRequestException`: *"Verification code has expired. Please register again."*
   - **OTP mismatch** → throws `BadRequestException`: *"Invalid verification code."*
8. On successful OTP match:
   - `email_verification.verified` is set to `true`.
   - `customer.email_verified` is set to `true`.
   - A registration success email is dispatched via [`EmailService`](backend/src/main/java/com/sehs4701/backend/service/EmailService.java).
   - A JWT is generated via [`JwtUtil.generateToken(email)`](backend/src/main/java/com/sehs4701/backend/security/JwtUtil.java) and returned in the [`AuthResponse`](backend/src/main/java/com/sehs4701/backend/dto/response/AuthResponse.java).
9. The frontend receives the `AuthResponse`, calls `login()` from [`AuthContext`](frontend/electric-vehicle-seminar-ui/src/context/AuthContext.jsx) to store the JWT and user details, displays a success message, and navigates to `/dashboard` after a 700 ms delay.

**Sequence:**

```
Browser        VerificationPage      AuthService        EmailService        DB
   │                  │                   │                   │              │
   │──[enter OTP]────►│                   │                   │              │
   │──[submit]───────►│                   │                   │              │
   │                  │──POST /verify────►│                   │              │
   │                  │                  │──findByEmail──────────────────────►│
   │                  │                  │◄──customer────────────────────────│
   │                  │                  │──findTopOTP───────────────────────►│
   │                  │                  │◄──EmailVerification───────────────│
   │                  │                  │  [validate expiry + OTP match]    │
   │                  │                  │──update verified=true─────────────►│
   │                  │                  │──update email_verified=true───────►│
   │                  │                  │──sendRegistrationSuccess──────────►│
   │                  │                  │                   │──SMTP dispatch─►
   │                  │                  │──generateToken()  │              │
   │                  │◄──AuthResponse───│                   │              │
   │◄─[login + navigate /dashboard]──────│                   │              │
```

---

#### Validation

| Field | Rule | Error Message |
|---|---|---|
| `email` | Not blank; valid RFC email format | *"Email is required"* / *"must be a well-formed email address"* |
| `otpCode` | Not blank; exactly 6 characters | *"OTP code is required"* / *"OTP must be 6 digits"* |
| OTP format (client-side) | Must match `^\d{6}$` | *"Please enter the 6-digit OTP code sent to your email."* |
| Customer existence | Customer must exist for the given email | HTTP 404 `ResourceNotFoundException` |
| Already verified | Account must not already be verified | *"Email already verified."* |
| OTP record existence | A verification record must exist | *"No verification code found. Please register again."* |
| OTP expiry | `expires_at` must be after `now()` | *"Verification code has expired. Please register again."* |
| OTP correctness | Submitted `otpCode` must match stored `otp_code` | *"Invalid verification code."* |

---

#### Data Dictionary

**Tables affected:** `customer` (UPDATE), `email_verification` (UPDATE)

**`email_verification` — UPDATE**

| Column | Operation | Value |
|---|---|---|
| `verified` | Write | `true` (set on successful OTP match) |

**`customer` — UPDATE**

| Column | Operation | Value |
|---|---|---|
| `email_verified` | Write | `true` (set on successful OTP match) |
| `updated_at` | Auto | Updated by `@UpdateTimestamp` |

**Response payload — [`AuthResponse`](backend/src/main/java/com/sehs4701/backend/dto/response/AuthResponse.java)**

| Field | Type | Description |
|---|---|---|
| `token` | String | JWT Bearer token (24-hour expiry) |
| `email` | String | Normalised customer email address |
| `name` | String | Customer full name |
| `verified` | Boolean | `true` — account is now verified |

**Entity Relationship (local):**

```
customer (1) ──────────────────── (many) email_verification
  id ◄──────────────────────────────── customer_id
  email_verified = true               verified = true
```

---