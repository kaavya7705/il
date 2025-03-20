import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Mentor from '@/lib/models/Mentor';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { 
      username, 
      email, 
      password,
      firstName,
      lastName,
      phone,
      expertise,
      experience,
      company,
      bio,
      availableHours 
    } = body;

    // Validate required fields
    if (!username || !email || !password || !expertise || !experience) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Check if mentor already exists
    const existingMentor = await Mentor.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingMentor) {
      return NextResponse.json(
        { message: "Mentor already exists" },
        { status: 400 }
      );
    }

    // Create new mentor
    const mentor = await Mentor.create({
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      expertise,
      experience,
      company,
      bio,
      availableHours
    });

    // Remove password from response
    const mentorWithoutPassword = {
      ...mentor.toJSON(),
      password: undefined
    };

    return NextResponse.json(
      { message: "Mentor created successfully", mentor: mentorWithoutPassword },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: "Error creating mentor" },
      { status: 500 }
    );
  }
}