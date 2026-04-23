# ZhongNeng EV Seminar Registration System

A full-stack J2EE web application for an electric vehicle seminar registration
platform. Built with **Spring Boot + MySQL** (backend) and **React + Vite**
(frontend).

> SEHS4701 Group Project

---

## Prerequisites

| Tool    | Version          |
| ------- | ---------------- |
| Java    | **17** (exact)   |
| Maven   | 3.x              |
| Node.js | 18+              |
| MySQL   | 8.x              |

> Newer Java versions (21, 25) will break Lombok / compile. Use JDK 17.

---

## Quick start

### 0. Clone (for teammates)

```bash
git clone <your-repo-url>
cd SEHS4701-G01
```

### 1. Start MySQL

```bash
brew services start mysql              # macOS
# or start the "MySQL" service in XAMPP on Windows
```

(First time only) Initialize the database:

```bash
mysql -u root < database/schema.sql
```

### 2. Run the backend

```bash
cd backend
export MAIL_USERNAME=your@gmail.com
export MAIL_PASSWORD="xxxx xxxx xxxx xxxx"   # Gmail App Password
# export DB_PASSWORD=...                     # only if MySQL root has one
mvn spring-boot:run
```

If Maven is not installed globally:

```bash
cd backend
./mvnw spring-boot:run        # macOS / Linux
mvnw.cmd spring-boot:run      # Windows
```

Backend runs at **http://localhost:8080**.

### 3. Run the frontend

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

## Environment variables

| Variable        | Required | Default | Purpose             |
| --------------- | -------- | ------- | ------------------- |
| `MAIL_USERNAME` | yes      | —       | Gmail sender        |
| `MAIL_PASSWORD` | yes      | —       | Gmail App Password  |
| `DB_USERNAME`   | no       | `root`  | MySQL username      |
| `DB_PASSWORD`   | no       | *empty* | MySQL password      |
| `JWT_SECRET`    | no       | builtin | JWT signing key     |

---

## API reference

Full reference: [`docs/API.md`](docs/API.md).

| Method | Endpoint                           | Auth | Description                   |
| ------ | ---------------------------------- | ---- | ----------------------------- |
| POST   | `/api/auth/register`               | no   | Register + send OTP           |
| POST   | `/api/auth/verify-email`           | no   | Verify OTP (returns JWT)      |
| POST   | `/api/auth/login`                  | no   | Login                         |
| GET    | `/api/vehicles`                    | no   | List EVs                      |
| GET    | `/api/vehicles/{id}`               | no   | EV details                    |
| GET    | `/api/seminars/upcoming`           | no   | Upcoming seminars             |
| GET    | `/api/users/profile`               | yes  | Profile                       |
| POST   | `/api/seminars/{id}/register`      | yes  | Book seminar (1–2 seats)      |
| GET    | `/api/registrations/history`       | yes  | My registrations (last year)  |
| GET    | `/api/registrations/{id}`          | yes  | Registration detail           |
| PUT    | `/api/registrations/{id}/cancel`   | yes  | Cancel registration           |

---

## Troubleshooting

**Port 8080 in use**

```bash
lsof -ti:8080 | xargs kill -9
```

**Can't send email / OTP**
Check `MAIL_USERNAME` / `MAIL_PASSWORD`. If your network blocks SMTP, read the
OTP directly from the database:

```bash
mysql -u root -e "USE sehs4701; \
  SELECT otp_code FROM email_verification ORDER BY created_at DESC LIMIT 1;"
```

**Reset all accounts**

```sql
USE sehs4701;
DELETE FROM registration;
DELETE FROM email_verification;
DELETE FROM customer;
```
