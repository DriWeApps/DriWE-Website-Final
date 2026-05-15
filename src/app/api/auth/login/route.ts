// import prisma from '@/lib/prisma';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { email, password } = body;

//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: {
//         id: true,
//         email: true,
//         password: true,
//         name: true,
//         createdAt: true,
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     const validPassword = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!validPassword) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Create JWT
//     const token = jwt.sign(
//       {
//         userId: user.id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET!,
//       {
//         expiresIn: '1d',
//       }
//     );

//     // Create response
//     const response = NextResponse.json({
//       success: true,
//     });

//     // Set cookie
//     response.cookies.set('token', token, {
//       httpOnly: true,
//       secure: false, // IMPORTANT for localhost
//       sameSite: 'lax',
//       path: '/',
//       maxAge: 60 * 60 * 24,
//     });

//     return response;
//   } catch (err) {
//     console.error(err);

//     return NextResponse.json(
//       { error: 'Server error' },
//       { status: 500 }
//     );
//   }
// }


import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log('🔍 Login attempt for:', email);

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      console.log('❌ User not found');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log('❌ Invalid password');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    });

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log('✅ Login successful, token set');
    return response;

  } catch (err: unknown) {
    console.error('🚨 Login API Error:', (err as Error).message);
    return NextResponse.json(
      { error: 'Server error. Check console.' },
      { status: 500 }
    );
  }
}
