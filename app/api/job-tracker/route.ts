import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { Job } from "@/models/Job"

// GET all jobs
export async function GET(req: Request) {
  await connectToDatabase()

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
  }

  const jobs = await Job.find({ userId }).sort({ dateApplied: -1 })
  return NextResponse.json(jobs)
}

// CREATE new job
export async function POST(req: Request) {
  await connectToDatabase()

  const jobData = await req.json()

  // ✅ Ensure the userId exists (comes from the form via AuthService)
  if (!jobData.userId) {
    return NextResponse.json({ success: false, error: "Missing user ID" }, { status: 400 })
  }

  try {
    const newJob = await Job.create(jobData)
    return NextResponse.json({ success: true, job: newJob })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    )
  }
}