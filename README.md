# slime

## Gmail connect and email automation

This app uses NextAuth with Google to connect Gmail. You can:
- send: "send email to user@example.com subject: Hi body: Hello from slime"
- schedule: "schedule email to user@example.com at 2025-09-05T15:00:00Z subject: Hi body: Later"

Environment variables required:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_URL (e.g., http://localhost:3000)
- NEXTAUTH_SECRET (random string)

Limitations: the scheduler is in-memory for demo purposes and not durable in serverless environments.

