# SEHS4701 Group Project Requirements

## Project Overview
**Client:** One of China’s largest electric vehicle (EV) manufacturers.
**Mission:** Act as a consultancy team (5-6 students) to design and develop an online electric vehicle seminar registration system. 
**Deadline:** April 19th, 2026, at 11:30 PM (Week 12).

## Technical Stack
*   **Architecture:** J2EE Concepts
*   **Framework:** Advanced web application framework (e.g., Spring Boot)
*   **Database:** MySQL (All data must be stored here)

## Core Functions

| Function | Description & Rules |
| :--- | :--- |
| **Customer Membership Registration** | • Capture user information (e.g., name, telephone, email).<br>• Customer type: Company or Personal.<br>• Mandatory 6-digit one-time code sent for email verification.<br>• Email serves as the system login ID.<br>• Customer profile created upon successful registration. |
| **Electric Vehicle Feature Description** | • Display at least 5 different types of EVs online.<br>• Details must include Model Number, Description, Picture, Feature Functions, and Unit Price.<br>• Display Seminar Dates with a maximum number of seats. |
| **Seminar Registration** | • Requires customer login.<br>• Customers can only register for upcoming seminars.<br>• Limit of 1 to 2 seats per registration.<br>• Statuses: "Success", "Cancel", and "Wait".<br>• Automated waitlist: Registrations exceeding max seats are set to "Wait". If a "Success" registration is cancelled, the next "Wait" customer is upgraded to "Success". |
| **Online Enquiry** | • Requires customer login.<br>• Customers can search their own seminar registration history.<br>• Search is limited to seminars from the past year.<br>• Selection from the list displays detailed registration info. |
| **Email Acknowledgement** | • Triggered on successful membership registration.<br>• Triggered on successful seminar registration.<br>• Triggered on cancelled seminar registration.<br>• Triggered on waitlist status change (e.g., "Wait" -> "Success"). |

## Specification Requirements
The team must write a functional specification based on the proposed web application design. 
**Page Limit:** Maximum 30 pages.
**Required Sections:**
*   Background and requirements of the client
*   Business Rules (Steve)
*   UI Design
*   Database Design
*   System Diagram and Workflow
*   Test Cases

## Deliverables
All submissions must be made in soft copy via Blackboard before the deadline.

1.  **Functional Specification (`.pdf`)**
    *   Submitted by: Group Leader
    *   Content: The 30-page design and specification report.
2.  **Source Code and Database Script (`.zip`)**
    *   Submitted by: Group Leader
    *   Content: All application source code and MySQL database schema/data scripts compressed into a single file.
3.  **Peer-to-peer Evaluation (`.docx`)**
    *   Submitted by: Everyone (Individually)
    *   Content: Self-evaluation and performance evaluation of group members (downloaded from Blackboard).

## Grading Scheme

| Aspects | Weight |
| :--- | :--- |
| **Problem Analysis**<br>(school requirements, assumptions, etc.) | 20% |
| **Design and Implementation of Web Application**<br>(contents, system flow, program skill, etc.) | 60% |
| **Specification Writing**<br>(clarity, preciseness, use of English, presentation, etc.) | 20% |
| **Total** | **100%** |