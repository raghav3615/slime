type Job = {
  id: string
  runAt: number
  payload: any
  handler: (payload: any) => Promise<void>
}

const jobs: Job[] = []

export function scheduleJob(runAt: Date, payload: any, handler: (payload: any) => Promise<void>) {
  const job: Job = { id: `${Date.now()}-${Math.random()}`, runAt: runAt.getTime(), payload, handler }
  jobs.push(job)
  return job.id
}

// Simple interval runner. In a serverless environment this won't be durable; fine for demo.
if (!(globalThis as any).__slime_scheduler_started) {
  ;(globalThis as any).__slime_scheduler_started = true
  setInterval(async () => {
    const now = Date.now()
    const due = jobs.filter((j) => j.runAt <= now)
    for (const job of due) {
      try {
        await job.handler(job.payload)
      } catch (e) {
        console.error("Scheduled job failed", e)
      } finally {
        const idx = jobs.findIndex((j) => j.id === job.id)
        if (idx !== -1) jobs.splice(idx, 1)
      }
    }
  }, 1000)
}
