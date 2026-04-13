# Dashboard Implementation Instructions

## Overview
This document outlines the standard process and constraints for developing features inside the `/dashboard` route context.

## Architectural Constraints

1. **Authentication & Routing:** 
   According to `clerk-routing-modals.md`, the `/dashboard` route and all its sub-routes must remain protected behind Clerk authentication. Unauthenticated users must be correctly redirected via Clerk middleware or route guards.
   
2. **UI & Styling:**
   According to `shadcn-ui-only.md`, all new visual elements added to the dashboard must be built using Shadcn UI components. Custom custom UI component creation is prohibited. 
   
## Development Checklist

When expanding the dashboard from its initial placeholder state, follow these steps:

- [ ] Verify Clerk protection is active for the `/dashboard` route (typically handled in Middleware).
- [ ] Replace placeholder `<h1>` tags with Shadcn typography components.
- [ ] Build layout structures using standard container constraints (e.g., Tailwind padding/margins) matching the rest of the application.
- [ ] Connect any data fetching to the Drizzle ORM setup defined in `db/index.ts`.
