import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: 'Connected to MongoDB successfully' });
  } catch (error) {
    console.error('Connection test failed:', error);
    return NextResponse.json({ error: 'Failed to connect to MongoDB' }, { status: 500 });
  }
}