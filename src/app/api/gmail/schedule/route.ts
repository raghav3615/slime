import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getGmailClient, buildMimeMessage } from "@/lib/gmail"
import { scheduleJob } from "@/lib/scheduler"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const body = await req.json()
  const { to, subject, text, html, sendAt, from } = body as {
    to: string
    subject: string
    text?: string
    html?: string
    sendAt: string // ISO
    from?: string
  }

  if (!to || !subject || (!text && !html) || !sendAt) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 })
  }

  const when = new Date(sendAt)
  if (Number.isNaN(when.getTime())) {
    return new Response(JSON.stringify({ error: "Invalid sendAt" }), { status: 400 })
  }

  const id = scheduleJob(when, { to, subject, text, html, from, accessToken: session.accessToken }, async (p) => {
    const gmail = getGmailClient(p.accessToken as string)
    const raw = buildMimeMessage({ from: p.from ?? "me", to: p.to, subject: p.subject, text: p.text, html: p.html })
    await gmail.users.messages.send({ userId: "me", requestBody: { raw } })
  })

  return new Response(JSON.stringify({ scheduledId: id, runAt: when.toISOString() }), { status: 200 })
}
