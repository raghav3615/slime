import { google } from "googleapis"

export function getGmailClient(accessToken: string) {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })
  return google.gmail({ version: "v1", auth })
}

export function buildMimeMessage({ from, to, subject, text, html }: {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}) {
  const boundary = "slime-boundary"
  const parts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    html
      ? `Content-Type: multipart/alternative; boundary=${boundary}\n\n--${boundary}\nContent-Type: text/plain; charset=UTF-8\n\n${text ?? ""}\n\n--${boundary}\nContent-Type: text/html; charset=UTF-8\n\n${html}\n\n--${boundary}--`
      : `Content-Type: text/plain; charset=UTF-8\n\n${text ?? ""}`,
  ]
    .filter(Boolean)
    .join("\n")

  return Buffer.from(parts).toString("base64").replace(/\+/g, "-").replace(/\//g, "_")
}
