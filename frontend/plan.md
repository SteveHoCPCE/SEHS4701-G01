# Frontend Development Plan

## 1. Overview

This document outlines the development plan for the frontend of the online electric vehicle seminar registration system. The frontend will provide a user-friendly interface for customers to register, browse EVs, register for seminars, and manage their enquiries. It will consume RESTful APIs exposed by the backend.

## 2. Technical Stack

*   **Framework:** A modern JavaScript framework (e.g., React, Vue.js, Angular) is recommended for building a dynamic Single Page Application (SPA).
*   **Build Tool:** Vite, Webpack, or similar.
*   **Styling:** CSS-in-JS (e.g., Styled Components, Emotion), Tailwind CSS, or SASS/LESS for maintainable styling.
*   **API Communication:** Axios or Fetch API for interacting with backend RESTful services.

## 3. Key User Interfaces (UI) & Pages

Based on the requirements, the following core UI pages/components will be developed:

*   **Home Page:** Introduction to the system, possibly showcasing some EVs or upcoming seminars.
*   **Customer Membership Registration Page:**
    *   Input fields for Name, Telephone, Email, Password.
    *   Selection for Customer Type (Company/Personal).
    *   Email verification input for a 6-digit OTP.
    *   Error and success messages.
*   **Login Page:**
    *   Input fields for Email (as login ID) and Password.
    *   "Forgot Password" (future consideration).
*   **Electric Vehicle Feature Description Page:**
    *   Display a list of at least 5 EV models.
    *   Detail view for each EV: Model Number, Description, Picture, Feature Functions, Unit Price.
    *   Associated Upcoming Seminar Dates with max seats for each seminar.
*   **Seminar List & Registration Page:**
    *   Display a list of upcoming seminars.
    *   Ability to select a seminar.
    *   Input for the number of seats (1 to 2).
    *   Confirmation/status display ("Success", "Cancel", "Wait").
    *   Requires customer login.
*   **Customer Profile Page:**
    *   Display logged-in customer's information.
    *   Option to update profile details (if applicable).
*   **Online Enquiry / Registration History Page:**
    *   Display past seminar registrations (limited to the past year).
    *   Search/filter capabilities.
    *   Detailed view of selected registration info.
    *   Option to cancel an upcoming seminar registration.

## 4. User Flows / Interactions

*   User Registration -> Email Verification -> Profile Creation.
*   User Login -> Access to restricted features.
*   Browsing EVs and Seminar details.
*   Seminar Registration (selecting seats, confirmation).
*   Viewing and managing past seminar registrations.

## 5. Frontend Development Considerations

*   **UI/UX Design:** Implement a clean, intuitive, and responsive design, adhering to the "UI Design" specification.
*   **Form Validation:** Client-side validation for all input fields (e.g., email format, password strength, phone number, 6-digit OTP).
*   **State Management:** Efficiently manage application state (user authentication, loaded data, form states).
*   **Error Handling:** Graceful display of errors from API calls or client-side issues.
*   **Authentication & Authorization:** Securely handle user tokens/sessions received from the backend.
*   **Accessibility:** Ensure the application is accessible to users with disabilities.

## 6. Future Enhancements (Out of Scope for initial MVP but good to consider)

*   "Forgot Password" functionality.
*   Interactive maps for seminar locations.
*   Real-time notifications.