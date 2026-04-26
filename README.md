# ZhongNeng EV Seminar Registration System

A full-stack J2EE web application for an electric vehicle seminar registration
platform. Built with **Spring Boot + MySQL** (backend) and **React + Vite**
(frontend).

> SEHS4701 Group Project

---

## Features

*   **User Authentication:** Secure user registration, email OTP verification, and JWT-based login.
*   **EV Catalog:** Publicly browse all available electric vehicle models.
*   **Seminar Listings:** View upcoming seminars with details and seat availability.
*   **Seminar Registration:** Authenticated users can book 1-2 seats for a seminar.
*   **Waitlist System:** Automatically waitlists users if a seminar is full.
*   **Registration Management:** Users can view their registration history and cancel active registrations.
*   **Automated Notifications:** Receive email notifications for OTP verification and waitlist promotions.
*   **User Profile:** View and manage personal account details.

---

## Technology Stack

*   **Backend:**
    *   Java 17
    *   Spring Boot 3
    *   Spring Security (JWT Authentication)
    *   Spring Data JPA (Hibernate)
    *   Maven
    *   Lombok
*   **Frontend:**
    *   React 18
    *   Vite
    *   JavaScript (ES6+)
    *   Tailwind CSS
    *   Axios
*   **Database:**
    *   MySQL 8

---

## Application Screenshots

*(It is recommended to add your application screenshots here to showcase the UI, for example:)*
*   Home Page
*   EV Catalog
*   Login / Register Page
*   My Registrations Dashboard

---

## Project Structure

```
SEHS4701-G01
├── README.md
├── backend
│   ├── .env.example
│   ├── pom.xml
│   └── src
│       ├── main
│       │   ├── java
│       │   │   └── com
│       │   │       └── sehs4701
│       │   │           └── backend
│       │   │               ├── BackendApplication.java
│       │   │               ├── config
│       │   │               │   ├── CorsConfig.java
│       │   │               │   └── SecurityConfig.java
│       │   │               ├── controller
│       │   │               │   ├── AuthController.java
│       │   │               │   ├── CustomerController.java
│       │   │               │   ├── RegistrationController.java
│       │   │               │   ├── SeminarController.java
│       │   │               │   └── VehicleController.java
│       │   │               ├── dto
│       │   │               │   ├── request
│       │   │               │   │   ├── LoginRequest.java
│       │   │               │   │   ├── RegisterRequest.java
│       │   │               │   │   ├── SeminarRegistrationRequest.java
│       │   │               │   │   └── VerifyEmailRequest.java
│       │   │               │   └── response
│       │   │               │       ├── ApiErrorResponse.java
│       │   │               │       ├── AuthResponse.java
│       │   │               │       ├── CustomerProfileResponse.java
│       │   │               │       ├── RegistrationResponse.java
│       │   │               │       ├── SeminarResponse.java
│       │   │               │       └── VehicleResponse.java
│       │   │               ├── entity
│       │   │               │   ├── Customer.java
│       │   │               │   ├── EmailLog.java
│       │   │               │   ├── EmailVerification.java
│       │   │               │   ├── Registration.java
│       │   │               │   ├── Seminar.java
│       │   │               │   ├── Vehicle.java
│       │   │               │   └── enums
│       │   │               │       ├── CustomerType.java
│       │   │               │       └── RegistrationStatus.java
│       │   │               ├── exception
│       │   │               │   ├── BadRequestException.java
│       │   │               │   ├── GlobalExceptionHandler.java
│       │   │               │   ├── ResourceNotFoundException.java
│       │   │               │   └── UnauthorizedException.java
│       │   │               ├── repository
│       │   │               │   ├── CustomerRepository.java
│       │   │               │   ├── EmailLogRepository.java
│       │   │               │   ├── EmailVerificationRepository.java
│       │   │               │   ├── RegistrationRepository.java
│       │   │               │   ├── SeminarRepository.java
│       │   │               │   └── VehicleRepository.java
│       │   │               ├── security
│       │   │               │   ├── CustomerDetailsService.java
│       │   │               │   ├── JwtAuthenticationEntryPoint.java
│       │   │               │   ├── JwtAuthenticationFilter.java
│       │   │               │   └── JwtUtil.java
│       │   │               └── service
│       │   │                   ├── AuthService.java
│       │   │                   ├── CustomerService.java
│       │   │                   ├── EmailService.java
│       │   │                   ├── RegistrationService.java
│       │   │                   ├── SeminarService.java
│       │   │                   └── VehicleService.java
│       │   └── resources
│       │       ├── application.yml
│       │       └── data.sql
│       └── test
│           └── java
│               └── com
│                   └── sehs4701
│                       └── backend
│                           └── service
│                               ├── AuthServiceTest.java
│                               ├── EmailServiceTest.java
│                               └── RegistrationServiceTest.java
├── database
│   ├── data.sql
│   └── schema.sql
├── docs
│   ├── Business Rules.xlsx
│   ├── api_documentation.md
│   ├── EV Seminar Registration System Process Flow List.xlsx
│   ├── EV Seminar Registration System Functional Specification.docx
│   ├── Process Flow Charts.drawio.png
│   ├── Relationship_Page.drawio.png
│   ├── SEHS4701 Group Project 2526S2.pdf
│   ├── UI, Documents, Reports, Task and Database Lists.xlsx
│   └── test-plans
│       ├── integration_test_plan.csv
│       ├── smoke_test_plan.csv
│       ├── system_test_plan.csv
│       └── unit_test_plan.csv
├── frontend
│   └── electric-vehicle-seminar-ui
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.js
│       ├── tailwind.config.js
│       ├── vite.config.js
│       ├── public
│       │   ├── favicon.svg
│       │   └── icons.svg
│       └── src
│           ├── App.jsx
│           ├── index.css
│           ├── main.jsx
│           ├── api
│           │   ├── authService.js
│           │   ├── axiosInstance.js
│           │   ├── customerService.js
│           │   ├── seminarService.js
│           │   └── vehicleService.js
│           ├── components
│           │   └── layout
│           │       ├── Footer.jsx
│           │       ├── MainLayout.jsx
│           │       └── Navbar.jsx
│           ├── context
│           │   ├── AuthContext.jsx
│           │   └── useAuth.jsx
│           └── pages
│               ├── DashboardPage.jsx
│               ├── EVCatalogPage.jsx
│               ├── HomePage.jsx
│               ├── LoginPage.jsx
│               ├── MyRegistrationsPage.jsx
│               ├── NotFoundPage.jsx
│               ├── RegisterPage.jsx
│               ├── RegistrationDetailPage.jsx
│               ├── SeminarRegistrationPage.jsx
│               └── VerificationPage.jsx
└── Screenshot
```

---

## Prerequisites

| Tool    | Version        | Download                                                                                   |
| ------- | -------------- | ------------------------------------------------------------------------------------------ |
| Java    | **17** (exact) | [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)     |
| Maven   | 3.x            | [maven.apache.org](https://maven.apache.org/download.cgi) · [Video](https://www.youtube.com/watch?v=cIneTHgkrQw) |
| Node.js | 18+            |                                                                                            |
| MySQL   | 8.x            | via **XAMPP** (Windows) or `brew` (macOS)                                                  |
| Git     | any            |                                                                                            |

> Newer Java versions (21, 25) will break Lombok / compile. Use JDK 17.

---

## Quick Start

### 0. Clone (for teammates)

```bash
git clone https://github.com/SteveHoCPCE/SEHS4701-G01.git
cd SEHS4701-G01
```

### 1. Start MySQL via XAMPP

```bash
brew services start mysql              # macOS
# or start the "MySQL" service in XAMPP on Windows
```

(First time only) Initialize the database:

```bash
mysql -u root < database/schema.sql
```

### 2. Configure environment variables

Copy the backend environment template:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`.

**Gmail credentials** for OTP emails:

```env
MAIL_USERNAME=your_google_email@gmail.com
MAIL_PASSWORD=your_16_character_gmail_app_password
```
**Optional** only if your local MySQL root account has a password.

```
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

Use a Gmail **App Password**, not your normal Google password. If MySQL root has a password, set `DB_PASSWORD` in the same file.

### 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

If Maven is not installed globally:

```bash
cd backend
./mvnw spring-boot:run        # macOS / Linux
mvnw.cmd spring-boot:run      # Windows
```

Backend runs at **http://localhost:8080**. A successful start shows:

```
INFO ... o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port 8080 (http) with context path ''
INFO ... c.sehs4701.backend.BackendApplication   : Started BackendApplication in 3.807 seconds (process running for 4.119)
```

### 4. Run the frontend

```bash
cd frontend/electric-vehicle-seminar-ui
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**.

---

## Gmail App Password

The backend sends OTP + notification emails via Gmail.

1. [myaccount.google.com](https://myaccount.google.com) → Security
2. Enable **2-Step Verification**
3. Create an **App Password** (16 characters) → use as `MAIL_PASSWORD`

---

## Environment Variables

| Variable        | Required | Default | Purpose            |
| --------------- | -------- | ------- | ------------------ |
| `MAIL_USERNAME` | yes      | —       | Gmail sender       |
| `MAIL_PASSWORD` | yes      | —       | Gmail App Password |
| `DB_USERNAME`   | no       | `root`  | MySQL username     |
| `DB_PASSWORD`   | no       | *empty* | MySQL password     |
| `JWT_SECRET`    | no       | builtin | JWT signing key    |

---

## API Reference

Full reference: `docs/api_documentation.md`.

| Method | Endpoint                         | Auth | Description                  |
| ------ | -------------------------------- | ---- | ---------------------------- |
| POST   | `/api/auth/register`             | no   | Register + send OTP          |
| POST   | `/api/auth/verify-email`         | no   | Verify OTP (returns JWT)     |
| POST   | `/api/auth/login`                | no   | Login                        |
| GET    | `/api/vehicles`                  | no   | List EVs                     |
| GET    | `/api/vehicles/{id}`             | no   | EV details                   |
| GET    | `/api/seminars/upcoming`         | no   | Upcoming seminars            |
| GET    | `/api/users/profile`             | yes  | Profile                      |
| POST   | `/api/seminars/{id}/register`    | yes  | Book seminar (1–2 seats)     |
| GET    | `/api/registrations/history`     | yes  | My registrations (last year) |
| GET    | `/api/registrations/{id}`        | yes  | Registration detail          |
| PUT    | `/api/registrations/{id}/cancel` | yes  | Cancel registration          |

---

## Testing

This project includes unit tests for the backend services. To run the tests, execute the following command in your terminal:

```bash
cd backend
mvn test
```

---

## Troubleshooting

**Port 8080 in use**

```bash
lsof -ti:8080 | xargs kill -9
```

**Can't send email / OTP**

Check `backend/.env` has `MAIL_USERNAME` and a valid Gmail App Password in `MAIL_PASSWORD`. If your network blocks SMTP, the system keeps the OTP in MySQL for local testing:

```bash
mysql -u root -e "USE sehs4701; \
  SELECT otp_code FROM email_verification ORDER BY created_at DESC LIMIT 1;"
```

**Reset all accounts**

```sql
USE sehs4701;

-- 1. Delete all registrations first (child table)
DELETE FROM registration;

-- 2. Delete all email verification records
DELETE FROM email_verification;

-- 3. Now safely delete all customers
DELETE FROM customer;

-- Optional: verify everything is cleared
SELECT 'Customers left:'            AS info, COUNT(*) FROM customer;
SELECT 'Registrations left:'        AS info, COUNT(*) FROM registration;
SELECT 'Email verifications left:'  AS info, COUNT(*) FROM email_verification;
```

**Delete a single account by email**

```sql
USE sehs4701;

DELETE FROM email_verification
  WHERE customer_id IN (SELECT id FROM customer WHERE email = 'your_google_email');

DELETE FROM customer WHERE email = 'your_google_email';

SELECT 'User deleted successfully' AS result;
```
