// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET() {
//     try {
//         const jobs = await prisma.job.findMany({
//             orderBy: {
//                 createdAt: 'desc',
//             },
//         });

//         return NextResponse.json(jobs);
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Failed to fetch jobs' },
//             { status: 500 }
//         );
//     }
// }

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         const job = await prisma.job.create({
//             data: {
//                 title: body.title,
//                 description: body.description,
//                 responsibilities: body.responsibilities,
//                 requiredSkills: body.requiredSkills,
//                 education: body.education,
//                 experience: body.experience,
//             },
//         });


//         return NextResponse.json(job);
//     } catch (error: any) {
//         console.log(error);

//         return NextResponse.json(
//             {
//                 error: error.message || 'Failed to create job',
//             },
//             { status: 500 }
//         );
//     }
// }

// export async function PUT(req: Request) {
//     try {
//         const body = await req.json();

//         const updatedJob = await prisma.job.update({
//             where: {
//                 id: Number(body.id),
//             },
//             data: {
//                 title: body.title,
//                 description: body.description,
//                 responsibilities: body.responsibilities,
//                 requiredSkills: body.requiredSkills,
//                 education: body.education,
//                 experience: body.experience,
//             },
//         });

//         return NextResponse.json(updatedJob);
//     } catch (error: any) {
//         return NextResponse.json(
//             {
//                 error: error.message || 'Failed to update job',
//             },
//             { status: 500 }
//         );
//     }
// }
// export async function DELETE(req: Request) {
//     try {
//         const body = await req.json();

//         await prisma.job.delete({
//             where: {
//                 id: Number(body.id),
//             },
//         });

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Failed to delete job' },
//             { status: 500 }
//         );
//     }
// }

import { db } from "@/lib/dynamodb";
import { PutCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = "Jobs";

// GET
export async function GET() {
  try {
    console.log("Using table:", TABLE);

    const res = await db.send(
      new ScanCommand({
        TableName: TABLE,
      })
    );

    const jobs = res.Items?.filter(i => i.title);

    return Response.json(jobs);
  } catch (error) {
    console.error("DynamoDB Error:", error);

    return Response.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  await db.send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        jobId: `JOB#${Date.now()}`,
        ...body,
        createdAt: new Date().toISOString(),
      },
    })
  );

  return Response.json({ success: true });
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();

  await db.send(
    new UpdateCommand({
      TableName: TABLE,
     Key: {
  jobId: body.jobId,
},
      UpdateExpression:
        "set title=:t, description=:d, responsibilities=:r, requiredSkills=:s, education=:e, experience=:ex",
      ExpressionAttributeValues: {
        ":t": body.title,
        ":d": body.description,
        ":r": body.responsibilities,
        ":s": body.requiredSkills,
        ":e": body.education,
        ":ex": body.experience,
      },
    })
  );

  return Response.json({ success: true });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  console.log("DELETE JOB BODY:", body);

  await db.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: {
        jobId: body.id,
      },
    })
  );

  return Response.json({ success: true });
}