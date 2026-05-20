import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(jobs);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const job = await prisma.job.create({
            data: {
                title: body.title,
                description: body.description,
                responsibilities: body.responsibilities,
                requiredSkills: body.requiredSkills,
                education: body.education,
                experience: body.experience,
            },
        });


        return NextResponse.json(job);
    } catch (error: any) {
        console.log(error);

        return NextResponse.json(
            {
                error: error.message || 'Failed to create job',
            },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        const updatedJob = await prisma.job.update({
            where: {
                id: Number(body.id),
            },
            data: {
                title: body.title,
                description: body.description,
                responsibilities: body.responsibilities,
                requiredSkills: body.requiredSkills,
                education: body.education,
                experience: body.experience,
            },
        });

        return NextResponse.json(updatedJob);
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message || 'Failed to update job',
            },
            { status: 500 }
        );
    }
}
export async function DELETE(req: Request) {
    try {
        const body = await req.json();

        await prisma.job.delete({
            where: {
                id: Number(body.id),
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete job' },
            { status: 500 }
        );
    }
}