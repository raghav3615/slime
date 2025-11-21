<div align="center">

# ✨ Fuzzie

### Visual Workflow Automation Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat&logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/) [![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748?style=flat&logo=prisma)](https://www.prisma.io/) [![Bun](https://img.shields.io/badge/Bun-1.0+-f9f1e1?style=flat&logo=bun)](https://bun.sh/)

*Connect your favorite services and automate workflows without code*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup](#-getting-started) • [Usage](#-usage)

</div>

---

## 🎯 What is Fuzzie?

Fuzzie is a powerful visual automation platform that connects your favorite productivity tools. Build sophisticated workflows with a drag-and-drop interface—no coding required. Trigger actions across Google Drive, Slack, Notion, and Discord seamlessly.

**Think IFTTT or Zapier, but with a beautiful visual editor.**

</div>

---

## ✨ Features

🔗 **Multi-Service Integration**
- Google Drive file monitoring
- Slack channel messaging
- Notion database operations
- Discord webhooks & bot actions

🎨 **Visual Workflow Editor**
- Drag-and-drop node interface
- Real-time workflow preview
- Custom trigger & action chains
- Template library for quick starts

🔐 **Secure Authentication**
- OAuth2 integration for all services
- Clerk-powered user management
- Encrypted credential storage

💳 **Flexible Billing**
- Stripe subscription management
- Credit-based usage system
- Multiple tier support

🌐 **Real-Time Webhooks**
- Google Drive change notifications
- Automatic workflow execution
- Event-driven architecture

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Aceternity UI](https://ui.aceternity.com/)** - 3D & animation components

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[Clerk](https://clerk.com/)** - Authentication & user management

### Integrations
- **[Google Drive API](https://developers.google.com/drive)** - File operations & webhooks
- **[Slack API](https://api.slack.com/)** - Bot & messaging
- **[Notion API](https://developers.notion.com/)** - Database operations
- **[Discord API](https://discord.com/developers)** - Webhooks & bot actions
- **[Stripe](https://stripe.com/)** - Payment processing

### Development
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime & package manager
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **[Bun](https://bun.sh/)** installed (recommended) or Node.js 18+
- **PostgreSQL** database (local or cloud)
- API credentials for services you want to integrate

### 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/raghav3615/slime.git
cd slime
```

2. **Install dependencies**
```bash
bun install
# or
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fuzzie"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
OAUTH2_REDIRECT_URI=https://localhost:3000/api/auth/callback/google

# Notion
NOTION_API_SECRET=secret_xxxxx
NOTION_CLIENT_ID=xxxxx
NOTION_REDIRECT_URI=https://localhost:3000/api/auth/callback/notion

# Slack
SLACK_CLIENT_ID=xxxxx
SLACK_CLIENT_SECRET=xxxxx
SLACK_REDIRECT_URI=https://localhost:3000/api/auth/callback/slack
SLACK_BOT_TOKEN=xoxb-xxxxx

# Discord
DISCORD_CLIENT_ID=xxxxx
DISCORD_CLIENT_SECRET=xxxxx
DISCORD_REDIRECT_URI=https://localhost:3000/api/auth/callback/discord

# Stripe
STRIPE_SECRET=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# App
NEXT_PUBLIC_URL=https://localhost:3000
```

4. **Generate Prisma client & run migrations**
```bash
bunx prisma generate
bunx prisma db push
# or
npx prisma generate
npx prisma db push
```

5. **Set up local HTTPS (required for OAuth)**

The project includes self-signed certificates in the `certificates/` folder for local development.

6. **Start the development server**
```bash
bun run dev
# or
npm run dev
```

7. **Open your browser**

Navigate to [https://localhost:3000](https://localhost:3000)

---

## 💡 Usage

### 1️⃣ Sign Up & Authentication

- Create an account using Clerk authentication
- Verify your email and complete profile setup

### 2️⃣ Connect Your Services

Navigate to **Connections** and authenticate with:
- 🟦 **Google Drive** - Monitor file changes
- 💬 **Slack** - Send messages to channels
- 📝 **Notion** - Create & update database entries
- 🎮 **Discord** - Send webhooks & bot messages

### 3️⃣ Create Your First Workflow

1. Go to **Workflows** → **Create New**
2. Use the visual editor to:
   - Add a **Trigger** node (e.g., Google Drive file change)
   - Add **Action** nodes (e.g., post to Slack, create Notion entry)
   - Connect nodes to define the flow
3. Configure each node with specific parameters
4. **Publish** your workflow to activate it

### 4️⃣ Manage Billing & Credits

- View your current plan in **Billing**
- Upgrade for more workflow executions
- Monitor credit usage and history

### 5️⃣ Monitor & Debug

- Track workflow execution in the **Dashboard**
- View logs and error messages
- Edit and republish workflows as needed

---

## 🔑 Key Features Explained

### Visual Workflow Editor
Built with a node-based interface allowing you to:
- Chain multiple services together
- Create conditional logic
- Set up recurring triggers
- Test workflows before publishing

### Webhook System
Real-time event processing:
- Google Drive watches for file changes
- Automatic workflow execution
- Retry logic for failed actions

### Credit System
Fair usage model:
- Each workflow execution consumes credits
- Multiple subscription tiers available
- Pay only for what you use

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component system
- [Aceternity UI](https://ui.aceternity.com/) - Stunning animations
- [Clerk](https://clerk.com/) - Authentication platform

---

<div align="center">

⭐ Star this repo if you find it useful!

</div>
