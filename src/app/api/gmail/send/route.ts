import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getGmailClient, buildMimeMessage } from "@/lib/gmail"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const body = await req.json()
  const { to, subject, text, html, from } = body as {
    to: string
    subject: string
    text?: string
    html?: string
    from?: string
  }

  if (!to || !subject || (!text && !html)) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 })
  }

  try {
    const gmail = getGmailClient(session.accessToken)
    const raw = buildMimeMessage({ from: from ?? "me", to, subject, text, html })
    const res = await gmail.users.messages.send({ userId: "me", requestBody: { raw } })
    return new Response(JSON.stringify({ id: res.data.id }), { status: 200 })
  } catch (e: any) {
    console.error("Gmail send failed", e?.response?.data || e)
    return new Response(JSON.stringify({ error: "Send failed", detail: e?.message }), { status: 500 })
  }
}
