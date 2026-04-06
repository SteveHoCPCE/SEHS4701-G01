# Backend Development Plan

## 1. Overview

This document outlines the development plan for the backend of the online electric vehicle seminar registration system. The backend will implement all core business logic, manage data persistence, and expose RESTful APIs for the frontend application.

## 2. Technical Stack

*   **Architecture:** J2EE Concepts
*   **Framework:** Spring Boot (with Spring Data JPA for database interaction, Spring Security for authentication/authorization).
*   **Database:** MySQL.
*   **Email Service:** JavaMailSender (or integration with a third-party email service like SendGrid, Mailgun).
*   **Build Tool:** Maven or Gradle.

## 3. Core Modules / Services

The backend will be structured around the following key functional modules:

*   **User Management Service:**
    *   Handles customer registration (name, telephone, email).
    *   Manages customer types (Company/Personal).
    *   User authentication (login using email as ID).
    *   User profile management.
*   **Email Verification Service:**
    *   Generates and sends 6-digit OTP for email verification during registration.
    *   Validates OTPs.
*   **EV Catalog Service:**
    *   Manages EV details (Model Number, Description, Picture, Feature Functions, Unit Price).
    *   Provides APIs to retrieve EV information.
*   **Seminar Management Service:**
    *   Manages seminar dates and maximum seat capacities.
    *   Provides APIs to list upcoming seminars.
    *   Handles seminar cancellation logic.
*   **Registration Service:**
    *   Processes seminar registrations, ensuring customer login.
    *   Enforces seat limits (1 to 2 seats per registration).
    *   Manages registration statuses: "Success", "Cancel", "Wait".
    *   Implements the automated waitlist mechanism (Wait -> Success upon cancellation).
*   **Enquiry Service:**
    *   Allows customers to search their own seminar registration history.
    *   Limits search to seminars from the past year.
    *   Provides detailed registration information.
*   **Email Notification Service:**
    *   Triggers emails for: successful membership registration, successful seminar registration, cancelled seminar registration, waitlist status change.

## 4. API Design (RESTful Endpoints)

A set of RESTful APIs will be designed for each core function. Example endpoints:

*   `POST /api/auth/register`: Register a new customer.
*   `POST /api/auth/verify-email`: Verify email with OTP.
*   `POST /api/auth/login`: Customer login.
*   `GET /api/users/profile`: Get customer profile (requires authentication).
*   `GET /api/evs`: List all electric vehicles.
*   `GET /api/evs/{id}`: Get details of a specific EV.
*   `GET /api/seminars/upcoming`: List upcoming seminars.
*   `POST /api/seminars/{seminarId}/register`: Register for a seminar (requires authentication).
*   `PUT /api/registrations/{registrationId}/cancel`: Cancel a seminar registration (requires authentication).
*   `GET /api/registrations/history`: Get customer's registration history (past year, requires authentication).
*   `GET /api/registrations/{registrationId}`: Get detailed registration info.

## 5. Database Design Considerations (MySQL)

*   **Entities:**
    *   `User`: id, name, telephone, email (unique), password_hash, customer_type (Company/Personal), created_at, updated_at.
    *   `EmailVerification`: id, user_id, otp, expiry_time, verified_at.
    *   `ElectricVehicle`: id, model_number (unique), description, picture_url, feature_functions, unit_price.
    *   `Seminar`: id, ev_id (FK), seminar_date, max_seats, available_seats, created_at, updated_at.
    *   `Registration`: id, user_id (FK), seminar_id (FK), seats_booked, status (Success/Cancel/Wait), registration_date, cancelled_date.
*   **Relationships:** One-to-many and Many-to-many relationships will be defined between these entities.
*   **Indexes:** Appropriate indexes for frequently queried columns (e.g., email, seminar_date, user_id).

## 6. Backend Development Considerations

*   **Security:** Implement Spring Security for authentication (JWT or session-based) and authorization. Secure password storage (hashing).
*   **Business Logic Implementation:** Rigorously implement all rules for seminar registration, waitlist processing, and email triggers.
*   **Error Handling:** Global exception handling and meaningful error responses.
*   **Logging:** Implement comprehensive logging for debugging and auditing.
*   **Validation:** Server-side validation for all incoming API requests.
*   **Transaction Management:** Ensure data consistency for operations involving multiple database updates (e.g., registration and seat updates).
*   **Email Integration:** Configure and integrate JavaMailSender for sending various notification emails.
*   **Scheduled Tasks:** Potentially for cleaning up expired OTPs or other periodic tasks if needed (though waitlist promotion should be immediate).

## 7. System Diagram and Workflow (Further detail will be added in the specification)

*   Diagrams illustrating the interaction between frontend, backend, database, and email service.
*   Detailed workflows for key operations like customer registration and seminar registration.