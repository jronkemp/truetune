Pivot is a Progressive Web App designed for soccer coaches to enhance team management and player development. It features a real-time player efficiency tracker for in-game insights and a comprehensive portal for managing teams, rosters, scheduling, and player registration.

### **I. Core Data Models (The "Nouns")**

This revised structure introduces `Organization` and normalizes `Role`.

*   **Organization:** The top-level entity for a club or league.
    *   Fields: `id`, `name`, `logoUrl`, `ownerId` (link to the founding Director's User ID).
*   **Team:** A specific team, which now belongs to an Organization.
    *   Fields: `id`, `organizationId` (link to the Organization), `name` (e.g., "U19 Boys ECNL"), `ageGroup`, `season`.
*   **Role:** A separate table to define all possible user roles.
    *   Fields: `id`, `name` ('DIRECTOR', 'COACH', 'PARENT', 'PLAYER').
*   **User:** The base account, now linked to a specific role.
        *   Fields: `id`, `roleId` (link to the Role table), `email`, `firstName`, `lastName`, `passwordHash`.
*   **PlayerProfile:** Represents the actual player.
    *   Fields: `id`, `teamId`, `firstName`, `lastName`, `dateOfBirth`, `jerseyNumber`.
*   **OrganizationMembership:** Links Directors to their Organization.
    *   Fields: `userId`, `organizationId`.
*   **TeamMembership:** Links Coaches, Players, and Parents to a specific Team.
    *   Fields: `userId`, `teamId`, `linkedPlayerProfileId` (for Parents).
*   **RegistrationForm:** A template for collecting information.
    *   Fields: `id`, `teamId`, `title`, `description`, `fields` (JSON), `publicUrl`, `isActive`.
*   **RegistrationSubmission:** An entry submitted for a form.
    *   Fields: `id`, `formId`, `submittedByUserId`, `data` (JSON), `status` ('PENDING', 'APPROVED', 'REJECTED').

---

### **II. User Roles & Permissions (The "Who")**

The new `Director` role adds a layer of administration.

1.  **Director:**
    *   The "owner" of an Organization.
    *   Can edit Organization details (name, logo).
    *   Can create new teams within their Organization.
    *   Can assign/un-assign Coaches to any team in the Organization.
    *   Can view all teams and rosters within the Organization.

2.  **Coach / Team Manager:**
    *   Assigned to one or more teams by a Director.
    *   Manages the day-to-day of their assigned team(s): roster, schedule, etc.
    *   Creates registration forms and sends invite links to players/parents.
    *   Has full access to the in-game stat tracker for their team.

3.  **Player & Parent/Guardian:**
    *   Join a specific team via a direct registration link.
    *   Can view team information, schedules, and relevant stats.
    *   Parents can manage their linked child's profile and submit forms on their behalf, as discussed.

---

### **III. Feature Breakdown (The "What")**

The user flows are now tiered based on the new roles.

#### **A. For Directors:**

*   **1. Organization Setup:**
    *   After signing up as a Director, create a new Organization, setting its name and logo.
    *   Invite other users to become co-Directors.
*   **2. Organization Dashboard:**
    *   A high-level view of all teams within the Organization.
    *   Quickly create a new team, which automatically inherits the Organization's logo.
    *   Manage a central list of all coaches, assigning them to various teams.

#### **B. For Coaches:**

*   **1. Onboarding:**
    *   Get invited to an Organization by a Director and assigned to a team.
    *   (Alternative) If a coach signs up without an invite, they can create their own "standalone" team, which will generate a new single-team Organization for them automatically.
*   **2. Team Management:**
    *   From their dashboard, they manage the roster for their assigned team(s).
    *   **Send Registration Links:** Generate unique, direct links for a specific registration form to send to prospective players and parents.
    *   Review submissions and approve players onto their roster.

#### **C. For Players & Parents:**

*   **1. Link-Based Onboarding:**
    *   Receive a unique registration link from a coach via email or message.
    *   The link leads to a page to create a `User` account and simultaneously fill out the required `RegistrationForm` for that specific team.
    *   Their application appears in the coach's dashboard for approval.
*   **2. Unified Dashboard:**
    *   View upcoming schedules, their/their child's performance stats, and any team-wide announcements.
