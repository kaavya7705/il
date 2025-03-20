import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';

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
      age,
      gender,
      phone,
      company,
      description,
      number_of_pupils 
    } = body;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user with additional fields
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      phone,
      company,
      description,
      number_of_pupils: 0
    });

    // Remove password from response
    const userWithoutPassword = {
      ...user.toJSON(),
      password: undefined
    };

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}