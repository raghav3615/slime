import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getCalendarClient } from "@/lib/calendar"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const body = await req.json()
  const { summary, description, start, end, attendees } = body as {
    summary: string
    description?: string
    start: string // ISO
    end: string // ISO
    attendees?: string[]
  }

  if (!summary || !start || !end) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 })
  }

  try {
    const calendar = getCalendarClient(session.accessToken)
    const event = {
      summary,
      description,
      start: { dateTime: start },
      end: { dateTime: end },
      attendees: attendees?.map(email => ({ email })) ?? [],
    }
    const res = await calendar.events.insert({ calendarId: "primary", requestBody: event })
    return new Response(JSON.stringify({ id: res.data.id, htmlLink: res.data.htmlLink }), { status: 200 })
  } catch (e: any) {
    console.error("Calendar event creation failed", e?.response?.data || e)
    return new Response(JSON.stringify({ error: "Event creation failed", detail: e?.message }), { status: 500 })
  }
}