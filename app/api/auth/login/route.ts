import { NextRequest, NextResponse } from 'next/server';
import { mockAdmin, generateToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    console.log('Login attempt:', { username, password }); // Debug log

    // Simple mock authentication
    if (username === 'admin' && password === 'password') {
      const token = generateToken(mockAdmin);
      
      const response = NextResponse.json(mockAdmin);
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      
      console.log('Login successful for:', username); // Debug log
      return response;
    }

    console.log('Login failed for:', username); // Debug log
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}