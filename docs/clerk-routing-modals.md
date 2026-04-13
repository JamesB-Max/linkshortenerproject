# Clerk Authentication & Routing Rules

- **Single Source of Auth:** Clerk is the exclusive authentication provider for this application. Do not implement or use any alternative authentication methods.
- **Protected Routes:** The `/dashboard` route is strictly protected. Ensure that users must be authenticated to access this page.
- **Homepage Redirection:** If an already authenticated user attempts to navigate to the homepage (`/`), they must be automatically redirected to `/dashboard`.
- **UI Modals:** All Clerk sign-in and sign-up flows must be configured to launch as modals rather than redirecting to dedicated auth pages.