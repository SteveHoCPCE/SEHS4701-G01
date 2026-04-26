# Functional Specifications of Standard API Interface

* **Company:** ZhongNeng EV
* **Version:** 1.0
* **Prepared by:** Backend Engineering Team
* **Date:** 2026-04-24

---

## Document Version

| Version | Modifications | Date | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | Initial Draft | 2026-04-24 | Backend Team |

---

## Detailed API Specification

### 1. User Registration
Register a new customer account in the EV Seminar Registration System. After successful registration, an OTP verification email will be sent to the provided email address.

* **Url [POST]:** `/api/auth/register`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Content-Type: `application/json`
    * **Path Variables / Query Parameters:**
        * None
    * **Body:**

| Name | Mandatory/ Optional | Data Type | Validation | Sample / Possible Values | Remark |
| :--- | :--- | :--- | :--- | :--- | :--- |
| name | M | String | Max 100 characters, Not blank | "John Doe" | Customer full name |
| telephone | M | String | Max 20 characters, Not blank | "+852 9123 4567" | Contact telephone number |
| email | M | String | Valid email format, Not blank | "john.doe@example.com" | Must be unique in system |
| password | M | String | Min 6 characters, Not blank | "password123" | Will be encrypted before storage |
| customerType | M | Enum | Must be COMPANY or PERSONAL | "PERSONAL" | Customer account type |

* **Output in JSON format:**

**Response Sample (Success)**
```json
{
    "message": "Registration successful. Please check your email for verification code."
}
```

**Response Sample (Fail - Validation Error)**
```json
{
    "status": 400,
    "message": "Validation failed",
    "errors": [
        "email: Invalid email format",
        "password: Password must be at least 6 characters"
    ],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Duplicate Email)**
```json
{
    "status": 400,
    "message": "Email already registered",
    "errors": ["Email already registered"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * Email must be unique in the system
    * Password must be at least 6 characters long
    * Customer type must be either COMPANY or PERSONAL
    * Upon successful registration, a 6-digit OTP code is generated and sent to the email
    * Account remains unverified until email verification is completed

---

### 2. Email Verification
Verify customer email address using the OTP code sent during registration. Upon successful verification, a JWT token is returned for authentication.

* **Url [POST]:** `/api/auth/verify-email`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Content-Type: `application/json`
    * **Path Variables / Query Parameters:**
        * None
    * **Body:**

| Name | Mandatory/ Optional | Data Type | Validation | Sample / Possible Values | Remark |
| :--- | :--- | :--- | :--- | :--- | :--- |
| email | M | String | Valid email format, Not blank | "john.doe@example.com" | Registered email address |
| otpCode | M | String | Exactly 6 characters, Not blank | "123456" | OTP code received via email |

* **Output in JSON format:**

**Response Sample (Success)**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "verified": true
}
```

**Response Sample (Fail - Invalid OTP)**
```json
{
    "status": 400,
    "message": "Invalid or expired OTP code",
    "errors": ["Invalid or expired OTP code"],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - User Not Found)**
```json
{
    "status": 404,
    "message": "User not found",
    "errors": ["User not found"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * OTP code must be exactly 6 digits
    * OTP code expires after **10 minutes** from the time of registration
    * Email must match a registered but unverified account
    * Upon successful verification, emailVerified flag is set to true
    * JWT token is generated and returned for subsequent authenticated requests

---

### 3. User Login
Authenticate an existing customer and obtain a JWT token for accessing protected endpoints.

* **Url [POST]:** `/api/auth/login`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Content-Type: `application/json`
    * **Path Variables / Query Parameters:**
        * None
    * **Body:**

| Name | Mandatory/ Optional | Data Type | Validation | Sample / Possible Values | Remark |
| :--- | :--- | :--- | :--- | :--- | :--- |
| email | M | String | Valid email format, Not blank | "john.doe@example.com" | Registered email address |
| password | M | String | Not blank | "password123" | Account password |

* **Output in JSON format:**

**Response Sample (Success)**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "verified": true
}
```

**Response Sample (Fail - Invalid Credentials)**
```json
{
    "status": 401,
    "message": "Invalid email or password",
    "errors": ["Invalid email or password"],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Email Not Verified)**
```json
{
    "status": 401,
    "message": "Email not verified. Please verify your email first.",
    "errors": ["Email not verified. Please verify your email first."],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * Email and password must match an existing account
    * Account must be email-verified before login is allowed
    * Password is compared against encrypted stored password
    * JWT token is generated upon successful authentication
    * JWT token expires after **24 hours** (configured as `86400000 ms` in `application.yml`)
    * No refresh token mechanism is implemented
    * Token should be included in Authorization header for subsequent requests

---

### 4. Get Customer Profile
Retrieve the authenticated customer's profile information.

* **Url [GET]:** `/api/users/profile`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Authorization: `Bearer {JWT_TOKEN}` (Required)
    * **Path Variables / Query Parameters:**
        * None
    * **Body:**
        * None

* **Output in JSON format:**

**Response Sample (Success)**
```json
{
    "id": 1,
    "name": "John Doe",
    "telephone": "+852 9123 4567",
    "email": "john.doe@example.com",
    "customerType": "PERSONAL",
    "emailVerified": true,
    "createdAt": "2026-04-20T10:30:00"
}
```

**Response Sample (Fail - Unauthorized)**
```json
{
    "status": 401,
    "message": "Unauthorized access",
    "errors": ["Unauthorized access"],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Invalid Token)**
```json
{
    "status": 401,
    "message": "Invalid or expired token",
    "errors": ["Invalid or expired token"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * Valid JWT token must be provided in Authorization header
    * Token must not be expired
    * User extracted from token must exist in the system
    * Returns profile information for the authenticated user only

---

### 5. Get All Vehicles
Retrieve a list of all available electric vehicles in the catalog.

* **Url [GET]:** `/api/vehicles`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
    * **Path Variables / Query Parameters:**
        * None
    * **Body:**
        * None

* **Output in JSON format:**

**Response Sample (Success)**
```json
[
    {
        "id": 1,
        "modelNumber": "EV-2024-001",
        "description": "Tesla Model 3 - Long Range AWD",
        "pictureUrl": "https://example.com/images/tesla-model3.jpg",
        "features": "Autopilot, Premium Interior, 358 miles range",
        "unitPrice": 45000.00
    },
    {
        "id": 2,
        "modelNumber": "EV-2024-002",
        "description": "BYD Seal - Premium Edition",
        "pictureUrl": "https://example.com/images/byd-seal.jpg",
        "features": "Advanced Driver Assistance, Luxury Interior, 520km range",
        "unitPrice": 38000.00
    }
]
```

**Response Sample (Fail - Server Error)**
```json
{
    "status": 500,
    "message": "An unexpected error occurred",
    "errors": ["An unexpected error occurred"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * No authentication required (public endpoint)
    * Returns all vehicles in the database
    * Empty array returned if no vehicles exist
    * Unit price is in decimal format with 2 decimal places

---

### 6. Get Vehicle by ID
Retrieve detailed information about a specific electric vehicle.

* **Url [GET]:** `/api/vehicles/{id}`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
    * **Path Variables / Query Parameters:**
        * `id`: Vehicle ID (Long, Required)
    * **Body:**
        * None

* **Output in JSON format:**

**Response Sample (Success)**
```json
{
    "id": 1,
    "modelNumber": "EV-2024-001",
    "description": "Tesla Model 3 - Long Range AWD",
    "pictureUrl": "https://example.com/images/tesla-model3.jpg",
    "features": "Autopilot, Premium Interior, 358 miles range",
    "unitPrice": 45000.00
}
```

**Response Sample (Fail - Not Found)**
```json
{
    "status": 404,
    "message": "Vehicle not found with id: 999",
    "errors": ["Vehicle not found with id: 999"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * No authentication required (public endpoint)
    * Vehicle ID must exist in the database
    * Returns 404 if vehicle with specified ID is not found

---

### 7. Get Upcoming Seminars
Retrieve a list of all upcoming seminars with available seats.

* **Url [GET]:** `/api/seminars/upcoming`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
    * **Path Variables / Query Parameters:**
        * None
    * **Body:**
        * None

* **Output in JSON format:**

**Response Sample (Success)**
```json
[
    {
        "id": 1,
        "vehicleId": 1,
        "vehicleModelNumber": "EV-2024-001",
        "vehicleDescription": "Tesla Model 3 - Long Range AWD",
        "seminarDate": "2026-05-15T14:00:00",
        "maxSeats": 50,
        "bookedSeats": 35,
        "availableSeats": 15
    },
    {
        "id": 2,
        "vehicleId": 2,
        "vehicleModelNumber": "EV-2024-002",
        "vehicleDescription": "BYD Seal - Premium Edition",
        "seminarDate": "2026-05-20T10:00:00",
        "maxSeats": 40,
        "bookedSeats": 40,
        "availableSeats": 0
    }
]
```

**Response Sample (Fail - Server Error)**
```json
{
    "status": 500,
    "message": "An unexpected error occurred",
    "errors": ["An unexpected error occurred"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * No authentication required (public endpoint)
    * Returns only seminars scheduled for future dates
    * Available seats calculated as: maxSeats - bookedSeats
    * Seminars with 0 available seats are still included in the list
    * Empty array returned if no upcoming seminars exist

---

### 8. Register for Seminar
Register the authenticated customer for a specific seminar with a specified number of seats.

* **Url [POST]:** `/api/seminars/{seminarId}/register`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Content-Type: `application/json`
        * Authorization: `Bearer {JWT_TOKEN}` (Required)
    * **Path Variables / Query Parameters:**
        * `seminarId`: Seminar ID (Long, Required)
    * **Body:**

| Name | Mandatory/ Optional | Data Type | Validation | Sample / Possible Values | Remark |
| :--- | :--- | :--- | :--- | :--- | :--- |
| seatsBooked | M | Integer | Min: 1, Max: 2 | 1 or 2 | Number of seats to book |

* **Output in JSON format:**

**Response Sample (Success - Confirmed)**
```json
{
    "id": 101,
    "seminarId": 1,
    "vehicleModelNumber": "EV-2024-001",
    "seminarDate": "2026-05-15T14:00:00",
    "seatsBooked": 2,
    "status": "SUCCESS",
    "createdAt": "2026-04-24T19:30:00",
    "updatedAt": "2026-04-24T19:30:00"
}
```

**Response Sample (Success - Waitlisted)**
```json
{
    "id": 102,
    "seminarId": 1,
    "vehicleModelNumber": "EV-2024-001",
    "seminarDate": "2026-05-15T14:00:00",
    "seatsBooked": 2,
    "status": "WAIT",
    "createdAt": "2026-04-24T19:30:00",
    "updatedAt": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Validation Error)**
```json
{
    "status": 400,
    "message": "Validation failed",
    "errors": [
        "seatsBooked: Maximum 2 seats per registration"
    ],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Seminar Not Found)**
```json
{
    "status": 404,
    "message": "Seminar not found with id: 999",
    "errors": ["Seminar not found with id: 999"],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Unauthorized)**
```json
{
    "status": 401,
    "message": "Unauthorized access",
    "errors": ["Unauthorized access"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * Valid JWT token required in Authorization header
    * Seats booked must be between 1 and 2 (inclusive)
    * Seminar must exist and be scheduled for a future date
    * If sufficient seats available: status = SUCCESS
    * If insufficient seats available: status = WAIT (waitlist)
    * A customer with an active registration (status = SUCCESS or WAIT) cannot register for the same seminar again — returns HTTP 400 with message: `"You already have an active registration for this seminar"`
    * Registration status can be SUCCESS, WAIT, or CANCEL

---

### 9. Cancel Registration
Cancel an existing seminar registration for the authenticated customer.

* **Url [PUT]:** `/api/registrations/{id}/cancel`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Authorization: `Bearer {JWT_TOKEN}` (Required)
    * **Path Variables / Query Parameters:**
        * `id`: Registration ID (Long, Required)
    * **Body:**
        * None

* **Output in JSON format:**

**Response Sample (Success)**
```json
{
    "id": 101,
    "seminarId": 1,
    "vehicleModelNumber": "EV-2024-001",
    "seminarDate": "2026-05-15T14:00:00",
    "seatsBooked": 2,
    "status": "CANCEL",
    "createdAt": "2026-04-24T19:30:00",
    "updatedAt": "2026-04-24T20:00:00"
}
```

**Response Sample (Fail - Registration Not Found)**
```json
{
    "status": 404,
    "message": "Registration not found with id: 999",
    "errors": ["Registration not found with id: 999"],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Unauthorized)**
```json
{
    "status": 401,
    "message": "You are not authorized to cancel this registration",
    "errors": ["You are not authorized to cancel this registration"],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Already Cancelled)**
```json
{
    "status": 400,
    "message": "Registration is already cancelled",
    "errors": ["Registration is already cancelled"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * Valid JWT token required in Authorization header
    * Registration must belong to the authenticated customer
    * Registration must exist in the database
    * Registration status is updated to CANCEL
    * Cancellation is only allowed before the seminar start time; attempting to cancel after the seminar has started returns HTTP 400 with message: `"Cannot cancel a registration after the seminar has started"`
    * When a SUCCESS registration is cancelled, the system automatically promotes eligible WAIT registrations to SUCCESS in FIFO order (earliest registration first), and sends a promotion email to each promoted customer
    * updatedAt timestamp is updated to current time

---

### 10. Get Registration History
Retrieve all seminar registrations for the authenticated customer.

* **Url [GET]:** `/api/registrations/history`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Authorization: `Bearer {JWT_TOKEN}` (Required)
    * **Path Variables / Query Parameters:**
        * None
    * **Body:**
        * None

* **Output in JSON format:**

**Response Sample (Success)**
```json
[
    {
        "id": 101,
        "seminarId": 1,
        "vehicleModelNumber": "EV-2024-001",
        "seminarDate": "2026-05-15T14:00:00",
        "seatsBooked": 2,
        "status": "SUCCESS",
        "createdAt": "2026-04-24T19:30:00",
        "updatedAt": "2026-04-24T19:30:00"
    },
    {
        "id": 102,
        "seminarId": 3,
        "vehicleModelNumber": "EV-2024-003",
        "seminarDate": "2026-06-01T15:00:00",
        "seatsBooked": 1,
        "status": "WAIT",
        "createdAt": "2026-04-23T10:15:00",
        "updatedAt": "2026-04-23T10:15:00"
    },
    {
        "id": 100,
        "seminarId": 2,
        "vehicleModelNumber": "EV-2024-002",
        "seminarDate": "2026-04-10T14:00:00",
        "seatsBooked": 2,
        "status": "CANCEL",
        "createdAt": "2026-04-05T09:00:00",
        "updatedAt": "2026-04-08T11:30:00"
    }
]
```

**Response Sample (Success - No Registrations)**
```json
[]
```

**Response Sample (Fail - Unauthorized)**
```json
{
    "status": 401,
    "message": "Unauthorized access",
    "errors": ["Unauthorized access"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * Valid JWT token required in Authorization header
    * Returns all registrations (SUCCESS, WAIT, CANCEL) for the authenticated customer
    * Empty array returned if customer has no registrations
    * Only returns registrations where the seminar date is within the past 1 year from the current date
    * Results are ordered by seminar date descending (most recent first)

---

### 11. Get Registration by ID
Retrieve detailed information about a specific registration for the authenticated customer.

* **Url [GET]:** `/api/registrations/{id}`
* **Input Parameters:**
    * **Header:**
        * Accept: `application/json`
        * Authorization: `Bearer {JWT_TOKEN}` (Required)
    * **Path Variables / Query Parameters:**
        * `id`: Registration ID (Long, Required)
    * **Body:**
        * None

* **Output in JSON format:**

**Response Sample (Success)**
```json
{
    "id": 101,
    "seminarId": 1,
    "vehicleModelNumber": "EV-2024-001",
    "seminarDate": "2026-05-15T14:00:00",
    "seatsBooked": 2,
    "status": "SUCCESS",
    "createdAt": "2026-04-24T19:30:00",
    "updatedAt": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Registration Not Found)**
```json
{
    "status": 404,
    "message": "Registration not found with id: 999",
    "errors": ["Registration not found with id: 999"],
    "timestamp": "2026-04-24T19:30:00"
}
```

**Response Sample (Fail - Unauthorized)**
```json
{
    "status": 401,
    "message": "You are not authorized to view this registration",
    "errors": ["You are not authorized to view this registration"],
    "timestamp": "2026-04-24T19:30:00"
}
```

* **Rules and Validations:**
    * Valid JWT token required in Authorization header
    * Registration must belong to the authenticated customer
    * Registration must exist in the database
    * Returns 404 if registration not found
    * Returns 401 if registration belongs to a different customer

---

## Common Error Responses

All endpoints may return the following common error responses:

### 400 Bad Request
Returned when request validation fails or business logic constraints are violated.
```json
{
    "status": 400,
    "message": "Validation failed",
    "errors": [
        "field: error message"
    ],
    "timestamp": "2026-04-24T19:30:00"
}
```

### 401 Unauthorized
Returned when authentication fails or token is invalid/expired.
```json
{
    "status": 401,
    "message": "Unauthorized access",
    "errors": ["Unauthorized access"],
    "timestamp": "2026-04-24T19:30:00"
}
```

### 404 Not Found
Returned when requested resource does not exist.
```json
{
    "status": 404,
    "message": "Resource not found",
    "errors": ["Resource not found"],
    "timestamp": "2026-04-24T19:30:00"
}
```

### 500 Internal Server Error
Returned when an unexpected server error occurs.
```json
{
    "status": 500,
    "message": "An unexpected error occurred",
    "errors": ["An unexpected error occurred"],
    "timestamp": "2026-04-24T19:30:00"
}
```

---

## Authentication Flow

1. **Registration**: User registers via `/api/auth/register` → Receives OTP via email
2. **Verification**: User verifies email via `/api/auth/verify-email` with OTP → Receives JWT token
3. **Login**: Verified user logs in via `/api/auth/login` → Receives JWT token
4. **Protected Endpoints**: Include JWT token in Authorization header as `Bearer {token}`

---

## Data Type Reference

### CustomerType Enum
- `COMPANY`: Corporate customer account
- `PERSONAL`: Individual customer account

### RegistrationStatus Enum
- `SUCCESS`: Registration confirmed with allocated seats
- `WAIT`: Registration waitlisted due to insufficient seats
- `CANCEL`: Registration cancelled by customer

