# ZhongNeng EV Seminar Registration System

A full-stack web application for registering electric vehicle seminars.

## Project Structure

SEHS4701-G01/

├── backend/ # Spring Boot Backend

├── frontend/

│ └── electric-vehicle-seminar-ui/ # React + Vite Frontend

└── README.md

## How to Run (Backend + Frontend)

### 1. Prerequisites

- **Node.js** (v18 or higher)

- **Java 17** : https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html

- **Maven** : https://maven.apache.org/download.cgi

YouTube:https://www.youtube.com/watch?v=cIneTHgkrQw

- **XAMPP** (start MySQL)

- Git

## 2. Backend Setup

#### 1. Go to backend folder

```bash
cd backend

```

# 2. Configure database and email (important!)

### -Open src/main/resources/application.yml and update:

### - MySQL username/password

### - Gmail username + App Password (for OTP emails)

YouTube:https://www.youtube.com/watch?v=ZfEK3WP73eY

## Configuration on application.yml (path: backend/src/main/resources/application.yml)

**Database password (add your db password here/ without password show " ")**

### ymal

```yaml
spring:

datasource:

password: "your-mysql-password"
```

```yaml

mail:

host: smtp.gmail.com port: 587 username: ${MAIL_USERNAME=your_google_email} password: ${MAIL_PASSWORD=16-digit passcode from app password without blank space}
```

# Step by step:

## Step 1: Run backend Server

### Backend (Terminal 1)

```git bash
cd backend
```

## If you are login frontend first

```bash
$ git checkout feature/backend
```

```
Deletion of directory 'frontend/electric-vehicle-seminar-ui/public' failed. Should I try again? (y/n) n

Deletion of directory 'frontend/electric-vehicle-seminar-ui/src/api' failed. Should I try again? (y/n) n

Deletion of directory 'frontend/electric-vehicle-seminar-ui/src/components/layout' failed. Should I try again? (y/n) n

Deletion of directory 'frontend/electric-vehicle-seminar-ui/src/components/ui' failed. Should I try again? (y/n) n

Deletion of directory 'frontend/electric-vehicle-seminar-ui/src/context' failed. Should I try again? (y/n) n

Deletion of directory 'frontend/electric-vehicle-seminar-ui/src/pages' failed. Should I try again? (y/n) n

Deletion of directory 'frontend/electric-vehicle-seminar-ui/src/routes' failed. Should I try again? (y/n) n

Deletion of directory 'frontend/plans' failed. Should I try again? (y/n) n

Updating files: 100% (98/98), done.

Switched to branch 'feature/backend'

Your branch is up to date with 'origin/feature/backend'.
```

## Then start backend server

```
mvn spring-boot:run

```

## Run Successfully shows (check the last two script shows)

```
INFO 50992 --- [ restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port 8080 (http) with context path ''

INFO 50992 --- [ restartedMain] c.sehs4701.backend.BackendApplication : Started BackendApplication in 3.807 seconds (process running for 4.119)

```

## Access to:

http://localhost:8080/

# Step 2: Run Frontend React

## Frontend (Terminal 2)

```
cd frontend/electric-vehicle-seminar-ui
```

## 1. Stash your changes (saves application.yml changes locally)

```
git stash push -m "temp: application.yml personal config --locally"
```

## 2. Now switch to frontend branch

```
git checkout frontend
```

## 3. (Optional) Check your current branch

```
git branch
```

## If you are login backend first

```
$ git checkout frontend

```

```
Deletion of directory 'backend/src/main/java/com/sehs4701/backend/config' failed. Should I try again? (y/n)

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/controller' failed. Should I try again? (y/n) n

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/dto/request' failed. Should I try again? (y/n) n

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/dto/response' failed. Should I try again? (y/n) n

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/entity/enums' failed. Should I try again? (y/n) n

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/exception' failed. Should I try again? (y/n) n

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/repository' failed. Should I try again? (y/n) n

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/security' failed. Should I try again? (y/n) n

Deletion of directory 'backend/src/main/java/com/sehs4701/backend/service' failed. Should I try again? (y/n)

n

Deletion of directory 'backend/src/main/resources' failed. Should I try again? (y/n) n

Deletion of directory 'database' failed. Should I try again? (y/n) n

Updating files: 100% (98/98), done.

Switched to branch 'frontend'

Your branch is up to date with 'origin/frontend'.
```

```
npm run dev
```

## Access to :

http://localhost:5173/

## 3. Other for test case: For test OTP code in google email

#### **Run this in MySQL (Git Bash or MySQL Workbench -- to delete the google email account in your db):**

```

mysql -u root -p

```

```

USE sehs4701;

-- 1. Delete all registrations first (child table)

DELETE FROM registration;

-- 2. Delete all email verification records

DELETE FROM email_verification;

-- 3. Now safely delete all customers

DELETE FROM customer;

-- Optional: Check if everything is gone

SELECT 'Customers left:' as info, COUNT(*) FROM customer;

SELECT 'Registrations left:' as info, COUNT(*) FROM registration;

SELECT 'Email verifications left:' as info, COUNT(*) FROM email_verification;

```

```

USE sehs4701;

DELETE FROM customer WHERE email = 'your_google email';

DELETE FROM email_verification WHERE customer_id IN (SELECT id FROM customer WHERE email = 'your_google email');

SELECT 'User deleted successfully' AS result;

```
