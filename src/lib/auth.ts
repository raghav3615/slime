import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

// Extend the JWT to carry Google tokens
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

async function refreshAccessToken(token: any) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    })

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(JSON.stringify(data))

    return {
      ...token,
      accessToken: data.access_token as string,
      accessTokenExpires: Date.now() + (data.expires_in as number) * 1000,
      // Keep the same refresh token if not returned
      refreshToken: (data.refresh_token as string) ?? token.refreshToken,
    }
  } catch (error) {
    console.error("Failed to refresh access token", error)
    return { ...token, error: "RefreshAccessTokenError" as const }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // Request offline access to receive refresh_token
          access_type: "offline",
          prompt: "consent",
          scope: [
            "openid",
            "email",
            "profile",
            // Gmail send
            "https://www.googleapis.com/auth/gmail.send",
            // Calendar events
            "https://www.googleapis.com/auth/calendar.events",
          ].join(" "),
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      // On initial sign in
      if (account) {
        token.accessToken = account.access_token as string | undefined
        token.refreshToken = account.refresh_token as string | undefined
        // 1 hour default if not provided
        const expiresIn = (account.expires_in as number | undefined) ?? 3600
        token.accessTokenExpires = Date.now() + expiresIn * 1000
        return token
      }

      // Return previous token if the access token has not expired yet
      if (token.accessToken && token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      if (token.refreshToken) {
        return await refreshAccessToken(token)
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
}
