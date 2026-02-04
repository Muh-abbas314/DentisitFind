# Feature Brief: Practice Dashboard & Add Practice Form

## Overview

Extend DentisitFind with a **practice list/dashboard** that supports loading, empty, and error states, plus an **Add Practice** form with validation and intentional UX (disabled/loading, error feedback).

---

## 1. Component Breakdown

### Dashboard / List View

| Component | Responsibility |
|-----------|----------------|
| **App** | Root: owns API state (loading/empty/error), routes between dashboard and form, passes data down. |
| **DashboardView** | Composes header, stats summary, list/grid, and empty/error/loading UI. Single source for "what to show" based on state. |
| **DashboardHeader** | Title, optional subtitle, primary CTA (e.g. "Add Practice"). |
| **DashboardStats** | Optional summary metrics (e.g. total practices, high performers count). |
| **PracticeList** | Renders list or grid of PracticeSummaryCard; receives `practices: PracticeSummary[]`. |
| **PracticeSummaryCard** | *(existing)* Single practice card. |
| **EmptyState** | Illustration/message when no practices; clear CTA to add first practice. |
| **ErrorState** | Error message + retry action when fetch fails. |
| **LoadingState** | Skeleton cards or spinner while data is loading. |

### Add Practice Form

| Component | Responsibility |
|-----------|----------------|
| **AddPracticeView** | Page-level wrapper: form + cancel/back, handles submit and success/error feedback. |
| **AddPracticeForm** | Form layout, fields, validation wiring, disabled/loading state. |
| **FormField** | Reusable labeled input + error message; supports text, number, optional. |
| **FormActions** | Submit + Cancel buttons; submit disabled when invalid or submitting. |

---

## 2. Data Flow Plan

- **Source of truth**: Practices list and API state live in `App` (or a small hook like `usePracticesApi`).
- **Fetch flow**: On mount (dashboard), call mock API → set `ApiState` (loading → success with data, or error). Empty list is a **success** state with `practices: []`.
- **Form flow**: User fills form → client-side validation (e.g. required name, valid numbers) → on submit: set form to loading, call mock API (create practice) → on success: navigate back to dashboard and refresh list (or append optimistically); on failure: show error, keep form editable.
- **Types**: All API responses, form payloads, and validation errors use shared types from `types.ts`. No `any`; reuse types across components (e.g. `PracticeSummary`, `PracticeFormPayload`, `ApiState`, `FieldErrors`).


## 3. Styling Approach

- **Consistency**: Plain CSS files per component folder (align with existing PracticeSummaryCard). No new Tailwind/CSS modules unless already in project.
- **Hierarchy**: Page title (largest), section titles, then card titles, then body/labels. Use a limited scale (e.g. 1.5rem, 1.125rem, 0.95rem, 0.85rem).
- **Spacing**: 8px base unit; use 16px, 24px, 32px for sections and between form groups. Consistent padding in cards and form panels.
- **Responsive**: Same 768px breakpoint as existing app; dashboard grid 2 cols desktop, 1 col mobile; form stacks full-width on mobile.
- **States**: Loading = skeleton or spinner; error = bordered alert area + retry button; empty = centered message + primary CTA. Form errors inline under fields and optionally a summary at top.
- **Accessibility**: Focus states on buttons and inputs; `aria-busy` / `aria-live` where appropriate for loading and errors.

---

## 4. Out of Scope (for this brief)

- Real backend; authentication; routing library (can use simple state: "view" = dashboard | form).
- Edit/delete practice (only Add and list).
- Theming/CSS variables (can be added later).
