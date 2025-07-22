import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Job } from "@/models/Job";

// GET single job by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const job = await Job.findById(params.id);

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}

// UPDATE job by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const updatedData = await req.json();

  try {
    const updatedJob = await Job.findByIdAndUpdate(params.id, updatedData, { new: true });

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, job: updatedJob });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE job by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    const deletedJob = await Job.findByIdAndDelete(params.id);

    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
