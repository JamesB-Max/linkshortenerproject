---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Instructions
this document provides guidelines on how to fetch data in the project. Follow these instructions to ensure consistency and efficiency in your data fetching methods.

## 1. Use server components for data fetching

in Next.js 13, you can use server components to fetch data directly on the server. This allows you to avoid unnecessary client-side rendering and improves performance. To create a server component, simply export a function that returns JSX and fetches data using `fetch` or any other data fetching library.

## 2. Data Fetching methods

always use the helper functions provided in the /data directory for data fetching. These functions are designed to handle common data fetching patterns and error handling, ensuring consistency across the project. All helper functions in the /data directory should use Drizzle ORM for database interactions.