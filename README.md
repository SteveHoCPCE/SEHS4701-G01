# SEHS4701 EV Seminar Registration System

A web application for a Chinese EV manufacturer's online seminar registration system.

- **Backend**: Spring Boot 3.2.5 + Spring Data JPA + MySQL
- **Frontend**: React

---

## Prerequisites

Make sure you have the following installed:

- **Java 17+** — [Download](https://www.oracle.com/java/technologies/downloads/#java17)
- **MySQL 8.x** — via [XAMPP](https://www.apachefriends.org/) or [Homebrew](https://brew.sh/) (`brew install mysql`)
- **Git**

Verify Java version:
```bash
java -version
# Should show: openjdk version "17.x.x" or higher
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Start MySQL

**Option A — XAMPP (Windows / Mac):**
Open XAMPP → Manage Servers → Start **MySQL Database**

**Option B — Homebrew (Mac only):**
```bash
brew services start mysql
```

### 3. Set up the database

Connect to MySQL and run the schema script:

```bash
mysql -u root < database/schema.sql
```

> If your MySQL root has a password, use `mysql -u root -p < database/schema.sql`

Seed data (vehicles & seminars) is loaded automatically when Spring Boot starts.

### 4. Configure Gmail for OTP emails

The system sends OTP verification emails via Gmail SMTP. You need a **Gmail App Password**:

1. Go to [myaccount.google.com](https://myaccount.google.com) → Security
2. Enable **2-Step Verification**
3. Go to **App Passwords** → Generate a password (16 characters)

Then set environment variables **in the same terminal** before starting the server:

```bash
# Mac / Linux
export MAIL_USERNAME=your-email@gmail.com
export MAIL_PASSWORD="your-16-char-app-password"

# Windows (Command Prompt)
set MAIL_USERNAME=your-email@gmail.com
set MAIL_PASSWORD=your-16-char-app-password

# Windows (PowerShell)
$env:MAIL_USERNAME="your-email@gmail.com"
$env:MAIL_PASSWORD="your-16-char-app-password"
```

> **Note:** If email sending fails due to network issues, you can still test by reading the OTP directly from the database:
> ```bash
> mysql -u root -e "USE sehs4701; SELECT otp_code FROM email_verification ORDER BY created_at DESC LIMIT 1;"
> ```

### 5. Start the backend server

```bash
cd backend
mvn spring-boot:run              # if Maven is installed globally
./mvnw spring-boot:run           # Mac / Linux (Maven wrapper)
mvnw.cmd spring-boot:run         # Windows (Maven wrapper)
```

Server starts at **http://localhost:8080**

You should see:
```
Started BackendApplication in X.XXX seconds
```

---

## API Reference

Base URL: `http://localhost:8080`

### Auth — No login required

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new account |
| POST | `/api/auth/verify-email` | Verify email with 6-digit OTP |
| POST | `/api/auth/login` | Login, returns JWT token |

### Vehicles & Seminars — No login required

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles` | List all EVs (5 models) |
| GET | `/api/vehicles/{id}` | Get single EV details |
| GET | `/api/seminars/upcoming` | List future seminars only |

### Protected — Login required (Bearer Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get logged-in user profile |
| POST | `/api/seminars/{seminarId}/register` | Register for a seminar (1-2 seats) |
| GET | `/api/registrations/history` | My registrations (past 1 year) |
| GET | `/api/registrations/{id}` | Single registration detail |
| PUT | `/api/registrations/{id}/cancel` | Cancel a registration |

---

## Testing Guide (for Frontend developers)

Use [Postman](https://www.postman.com/) or your frontend code to test. Follow this order:

### Step 1 — Register

```
POST http://localhost:8080/api/auth/register
Content-Type: application/json
```
```json
{
  "name": "Chan Tai Man",
  "telephone": "91234567",
  "email": "test@gmail.com",
  "password": "123456",
  "customerType": "PERSONAL"
}
```
`customerType` accepts: `"PERSONAL"` or `"COMPANY"`

**Success response** (200):
```json
{
  "message": "Registration successful. Please check your email for verification code."
}
```

### Step 2 — Verify Email

```
POST http://localhost:8080/api/auth/verify-email
Content-Type: application/json
```
```json
{
  "email": "test@gmail.com",
  "otpCode": "866057"
}
```
OTP is sent to the registered email (6 digits, expires in 5 minutes).

### Step 3 — Login

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json
```
```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```
**Success response** (200):
```json
{
  "token": "eyJhbGci...",
  "email": "test@gmail.com",
  "name": "Chan Tai Man"
}
```

### Step 4 — Use Protected APIs

Add this header to **every** protected request:
```
Authorization: Bearer <token from login>
```

**Get Profile:**
```
GET http://localhost:8080/api/users/profile
Authorization: Bearer eyJhbGci...
```
Response:
```json
{
  "id": 1,
  "name": "Chan Tai Man",
  "telephone": "91234567",
  "email": "test@gmail.com",
  "customerType": "PERSONAL",
  "emailVerified": true,
  "createdAt": "2026-04-07T16:04:48"
}
```

**List All Vehicles** (no auth needed):
```
GET http://localhost:8080/api/vehicles
```
Response:
```json
[
  {
    "id": 1,
    "modelNumber": "BYD-SEAL",
    "description": "BYD Seal - Premium Electric Sedan",
    "pictureUrl": "https://example.com/images/byd-seal.jpg",
    "features": "Blade Battery Technology, 0-100km/h in 3.8s, ...",
    "unitPrice": 268800.00
  }
]
```

**List Upcoming Seminars** (no auth needed):
```
GET http://localhost:8080/api/seminars/upcoming
```
Response:
```json
[
  {
    "id": 1,
    "vehicleId": 1,
    "vehicleModelNumber": "BYD-SEAL",
    "vehicleDescription": "BYD Seal - Premium Electric Sedan",
    "seminarDate": "2026-05-10T14:00:00",
    "maxSeats": 30,
    "bookedSeats": 0,
    "availableSeats": 30
  }
]
```

**Register for Seminar:**
```
POST http://localhost:8080/api/seminars/1/register
Authorization: Bearer eyJhbGci...
Content-Type: application/json
```
```json
{
  "seatsBooked": 1
}
```
`seatsBooked` accepts `1` or `2` only.

Response:
```json
{
  "id": 1,
  "seminarId": 1,
  "vehicleModelNumber": "BYD-SEAL",
  "seminarDate": "2026-05-10T14:00:00",
  "seatsBooked": 1,
  "status": "SUCCESS",
  "createdAt": "2026-04-07T16:30:00",
  "updatedAt": "2026-04-07T16:30:00"
}
```
`status` will be `"SUCCESS"` if seats available, `"WAIT"` if full.

**Get Registration History:**
```
GET http://localhost:8080/api/registrations/history
Authorization: Bearer eyJhbGci...
```

**Cancel Registration:**
```
PUT http://localhost:8080/api/registrations/1/cancel
Authorization: Bearer eyJhbGci...
```

### Error Responses

All errors follow this format:
```json
{
  "status": 400,
  "message": "Email already registered",
  "errors": ["Email already registered"],
  "timestamp": "2026-04-07T16:07:52.501176"
}
```

Common error codes:
| Status | Meaning |
|--------|---------|
| 400 | Bad request (validation failed, duplicate email, etc.) |
| 401 | Not logged in or invalid/expired token |
| 404 | Resource not found |

---

## Frontend Integration Notes

- Backend runs on `http://localhost:8080`, CORS is configured for `http://localhost:3000`
- Store the JWT token after login (e.g. in `localStorage`)
- Attach `Authorization: Bearer <token>` header to all protected API calls
- Token expires after **24 hours**

---

## Project Structure

```
SEHS4701-G01/
├── backend/                  # Spring Boot application
│   └── src/main/java/com/sehs4701/backend/
│       ├── controller/       # API endpoints
│       ├── service/          # Business logic
│       ├── entity/           # Database models
│       ├── repository/       # Database queries
│       ├── dto/              # Request / Response objects
│       ├── security/         # JWT authentication
│       ├── config/           # CORS, Security config
│       └── exception/        # Error handling
├── database/
│   ├── schema.sql            # Table definitions
│   └── data.sql              # Sample data
└── frontend/                 # React application (separate)
```

---

## Common Issues

**Port 8080 already in use**
```bash
lsof -ti:8080 | xargs kill -9     # Mac / Linux
netstat -ano | findstr :8080       # Windows (find PID, then taskkill /PID <pid> /F)
```

**Port 3306 already in use**
You may have two MySQL instances running (e.g. XAMPP + Homebrew). Stop one:
```bash
brew services stop mysql   # stop Homebrew MySQL if using XAMPP
```

**`Failed to send email` / `Connection timed out`**
Your network may block SMTP port 587. Workaround: read OTP directly from DB:
```bash
mysql -u root -e "USE sehs4701; SELECT otp_code FROM email_verification ORDER BY created_at DESC LIMIT 1;"
```

**`Access denied for user 'root'`**
Your MySQL root user has a password. Update `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    password: "your-mysql-password"
```
