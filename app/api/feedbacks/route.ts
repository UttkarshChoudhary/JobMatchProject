import { NextResponse } from 'next/server';
import { connectToDatabase as dbConnect } from '@/lib/db';
import Feedback from '../../../models/Feedback';

export async function GET() {
  await dbConnect();
  const feedback = await Feedback.find({});
  return NextResponse.json(feedback);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const feedback = await Feedback.create(body);
  return NextResponse.json(feedback, { status: 201 });
}
