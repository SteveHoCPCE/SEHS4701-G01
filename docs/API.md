# Backend API Documentation (for Frontend)

Base URL: `http://localhost:8080`

Frontend runs on `http://localhost:5173` (CORS is configured for both `5173` and `3000`).

---

## Authentication Flow

```
Register → Verify Email (OTP) → Login (get JWT) → Use Protected APIs
```

JWT token expires after **24 hours**. Store it in `localStorage` after login.

For all **protected** APIs, add this header:
```
Authorization: Bearer <token>
```

---

## 1. Register

Creates a new customer account and sends a 6-digit OTP to the email.

```
POST /api/auth/register
```

No auth required.

**Request:**
```json
{
  "name": "Chan Tai Man",
  "telephone": "91234567",
  "email": "test@gmail.com",
  "password": "123456",
  "customerType": "PERSONAL"
}
```

| Field | Type | Rules |
|-------|------|-------|
| name | string | Required |
| telephone | string | Required |
| email | string | Required, must be valid email, unique |
| password | string | Required, min 6 characters |
| customerType | string | `"PERSONAL"` or `"COMPANY"` |

**Success (200):**
```json
{
  "message": "Registration successful. Please check your email for verification code."
}
```

**Error (400):**
```json
{
  "status": 400,
  "message": "Email already registered",
  "errors": ["Email already registered"],
  "timestamp": "2026-04-07T16:07:52.501176"
}
```

---

## 2. Verify Email

Verifies the customer's email using the 6-digit OTP.

```
POST /api/auth/verify-email
```

No auth required.

**Request:**
```json
{
  "email": "test@gmail.com",
  "otpCode": "866057"
}
```

| Field | Type | Rules |
|-------|------|-------|
| email | string | Required, valid email |
| otpCode | string | Required, exactly 6 characters |

**Success (200):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "email": "test@gmail.com",
  "name": "Chan Tai Man",
  "verified": true
}
```

**Possible errors:**
- `400` — Invalid or expired OTP
- `404` — Email not found

---

## 3. Login

Authenticates the customer and returns a JWT token.

```
POST /api/auth/login
```

No auth required.

**Request:**
```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Success (200):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "email": "test@gmail.com",
  "name": "Chan Tai Man"
}
```

| Response Field | Type | Description |
|----------------|------|-------------|
| token | string | JWT token, use in Authorization header |
| email | string | Customer's email |
| name | string | Customer's name |

**Error (401):** Invalid email or password.

---

## 4. Get My Profile

Returns the logged-in customer's profile.

```
GET /api/users/profile
```

**Auth required.**

**Success (200):**
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

| Response Field | Type | Description |
|----------------|------|-------------|
| id | number | Customer ID |
| name | string | Customer name |
| telephone | string | Phone number |
| email | string | Email address |
| customerType | string | `"PERSONAL"` or `"COMPANY"` |
| emailVerified | boolean | Whether email is verified |
| createdAt | string | ISO datetime |

---

## 5. List All Vehicles

Returns all EV models (currently 5).

```
GET /api/vehicles
```

No auth required.

**Success (200):**
```json
[
  {
    "id": 1,
    "modelNumber": "BYD-SEAL",
    "description": "BYD Seal - Premium Electric Sedan",
    "pictureUrl": "https://example.com/images/byd-seal.jpg",
    "features": "Blade Battery Technology, 0-100km/h in 3.8s, 700km Range, ...",
    "unitPrice": 268800.00
  },
  {
    "id": 2,
    "modelNumber": "NIO-ET7",
    "description": "NIO ET7 - Luxury Smart Electric Sedan",
    "pictureUrl": "https://example.com/images/nio-et7.jpg",
    "features": "150kWh Solid-State Battery, 1000km Range, ...",
    "unitPrice": 448000.00
  }
]
```

| Response Field | Type | Description |
|----------------|------|-------------|
| id | number | Vehicle ID |
| modelNumber | string | Model number (e.g. "BYD-SEAL") |
| description | string | Vehicle description |
| pictureUrl | string | Image URL |
| features | string | Comma-separated feature list |
| unitPrice | number | Price in RMB |

---

## 6. Get Single Vehicle

Returns details of one vehicle.

```
GET /api/vehicles/{id}
```

No auth required.

**Example:** `GET /api/vehicles/1`

**Success (200):** Same format as one item in the list above.

**Error (404):** Vehicle not found.

---

## 7. List Upcoming Seminars

Returns only future seminars (seminar_date > now), with seat availability info.

```
GET /api/seminars/upcoming
```

No auth required.

**Success (200):**
```json
[
  {
    "id": 1,
    "vehicleId": 1,
    "vehicleModelNumber": "BYD-SEAL",
    "vehicleDescription": "BYD Seal - Premium Electric Sedan",
    "seminarDate": "2026-05-10T14:00:00",
    "maxSeats": 30,
    "bookedSeats": 2,
    "availableSeats": 28
  }
]
```

| Response Field | Type | Description |
|----------------|------|-------------|
| id | number | Seminar ID |
| vehicleId | number | Related vehicle ID |
| vehicleModelNumber | string | Vehicle model number |
| vehicleDescription | string | Vehicle description |
| seminarDate | string | ISO datetime of the seminar |
| maxSeats | number | Total seats available |
| bookedSeats | number | Seats already booked (SUCCESS only) |
| availableSeats | number | Remaining seats (maxSeats - bookedSeats) |

---

## 8. Register for Seminar

Books 1 or 2 seats for a seminar. Customer must be logged in and email verified.

```
POST /api/seminars/{seminarId}/register
```

**Auth required.**

**Example:** `POST /api/seminars/1/register`

**Request:**
```json
{
  "seatsBooked": 1
}
```

| Field | Type | Rules |
|-------|------|-------|
| seatsBooked | number | `1` or `2` only |

**Success (200):**
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

**Status logic:**
- `"SUCCESS"` — seats are available, booking confirmed
- `"WAIT"` — seminar is full, placed on waitlist

**Possible errors:**
- `400` — Email not verified / invalid seats / seminar already passed
- `404` — Seminar not found

---

## 9. Get Registration History

Returns the logged-in customer's registrations from the past 1 year.

```
GET /api/registrations/history
```

**Auth required.**

**Success (200):**
```json
[
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
]
```

| Response Field | Type | Description |
|----------------|------|-------------|
| id | number | Registration ID |
| seminarId | number | Seminar ID |
| vehicleModelNumber | string | Vehicle model |
| seminarDate | string | Seminar datetime |
| seatsBooked | number | 1 or 2 |
| status | string | `"SUCCESS"`, `"WAIT"`, or `"CANCEL"` |
| createdAt | string | When registered |
| updatedAt | string | Last status change |

---

## 10. Get Single Registration

Returns one registration's detail. Customer can only view their own.

```
GET /api/registrations/{id}
```

**Auth required.**

**Example:** `GET /api/registrations/1`

**Success (200):** Same format as one item in history.

**Error (404):** Registration not found or not owned by current user.

---

## 11. Cancel Registration

Cancels a registration. If a SUCCESS registration is cancelled, the earliest WAIT registration will be automatically promoted to SUCCESS.

```
PUT /api/registrations/{id}/cancel
```

**Auth required.**

**Example:** `PUT /api/registrations/1/cancel`

No request body needed.

**Success (200):** Returns the updated registration with `status: "CANCEL"`.

**Error (404):** Registration not found or not owned by current user.

---

## Frontend Page → API Mapping

| Page | APIs to use |
|------|-------------|
| Register page | `POST /api/auth/register` |
| OTP verification page | `POST /api/auth/verify-email` (returns JWT for auto-login) |
| Login page | `POST /api/auth/login` |
| Profile page | `GET /api/users/profile` |
| Vehicle listing page | `GET /api/vehicles` |
| Vehicle detail page | `GET /api/vehicles/{id}` |
| Seminar listing page | `GET /api/seminars/upcoming` |
| Seminar registration | `POST /api/seminars/{seminarId}/register` |
| My registrations page | `GET /api/registrations/history` |
| Registration detail page | `GET /api/registrations/{id}` |
| Cancel registration | `PUT /api/registrations/{id}/cancel` |

---

## Error Response Format

All errors follow this structure:

```json
{
  "status": 400,
  "message": "Email already registered",
  "errors": ["Email already registered"],
  "timestamp": "2026-04-07T16:07:52.501176"
}
```

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad request — validation failed, duplicate email, business rule violation |
| 401 | Unauthorized — missing/invalid/expired JWT token |
| 404 | Not found — resource does not exist |
| 500 | Server error — unexpected backend issue |

---

## Quick Reference: React Fetch Example

```javascript
const API_BASE = "http://localhost:8080";

// Login
const res = await fetch(`${API_BASE}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@gmail.com", password: "123456" }),
});
const data = await res.json();
localStorage.setItem("token", data.token);

// Protected API call
const profile = await fetch(`${API_BASE}/api/users/profile`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
const profileData = await profile.json();
```
