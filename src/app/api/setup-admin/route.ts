import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    const existing = await prisma.user.findFirst();

    if (existing) {
        return Response.json({
            message: 'Admin already exists',
        });
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const user = await prisma.user.create({
        data: {
            email: 'admin@gmail.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'admin',
        },
    });

    return Response.json({
        success: true,
        user,
    });
}