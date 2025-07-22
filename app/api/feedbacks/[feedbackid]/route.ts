import { NextResponse } from 'next/server';
import db from '@/lib/db';
import Feedback from '@/models/Feedback';

type FeedbackIDParams = {
    params: Promise<{ feedbackid: string }>
}

export async function GET(request: Request, { params }: FeedbackIDParams) {
  await db();
  const {feedbackid} = await params
  const feedback = await Feedback.findById(feedbackid);
  if (!feedback) {
    return NextResponse.json({ message: 'Feedback not found' }, { status: 404 });
  }
  return NextResponse.json(feedback);
}

export async function PUT(request: Request, { params }: FeedbackIDParams) {
  await db();
  const body = await request.json();
  const {feedbackid} = await params
  const updatedUser = await Feedback.findByIdAndUpdate(feedbackid, body, { new: true });
  if (!updatedUser) {
    return NextResponse.json({ message: 'Feedback not found' }, { status: 404 });
  }
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: Request, { params }: FeedbackIDParams)   {
  await db();
  const {feedbackid} = await params
  const deletedUser = await Feedback.findByIdAndDelete(feedbackid);
  if (!deletedUser) {
    return NextResponse.json({ message: 'Feedback not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Feedback deleted successfully' });
}
