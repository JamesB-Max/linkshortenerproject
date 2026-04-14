# Database Schema

## Shortened Links
The schema for managing shortened URLs. It uses Drizzle ORM and PostgreSQL.

### Table: `links`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `integer` | Primary key, auto-incrementing |
| `originalUrl` | `varchar` | The original destination URL |
| `shortCode` | `varchar` | The generated short code (unique) |
| `userId` | `varchar` | The Clerk user ID (string) of the creator |
| `createdAt` | `timestamp` | When the link was created |
| `updatedAt` | `timestamp` | When the link was last updated |
| `clicks` | `integer` | Number of times the link was clicked (defaults to 0) |
| `isActive` | `boolean` | Whether the link is currently active (defaults to true) |

### Authentication Integration
Clerk is used for authentication. The `userId` field on the `links` table directly stores the Clerk User ID as a string (`varchar`), avoiding the need for a separate synchronized users table via webhooks in the local database.
