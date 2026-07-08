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





// import { db } from "@/lib/db";

// // GET
// export async function GET() {
//   try {
//     const [rows] = await db.query(
//       "SELECT * FROM Jobs ORDER BY createdAt DESC"
//     );

//     return Response.json(rows);
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { error: "Failed to fetch jobs" },
//       { status: 500 }
//     );
//   }
// }

// // POST
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const jobId = `JOB_${Date.now()}`;

//     await db.query(
//       `
//       INSERT INTO Jobs
//       (
//         jobId,
//         createdAt,
//         title,
//         description,
//         education,
//         experience,
//         requiredSkills,
//         responsibilities
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//       `,
//       [
//         jobId,
//         new Date(),
//         body.title,
//         body.description,
//         body.education,
//         body.experience,
//         body.requiredSkills,
//         body.responsibilities,
//       ]
//     );

//     return Response.json({
//       success: true,
//       jobId,
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { error: "Failed to create job" },
//       { status: 500 }
//     );
//   }
// }

// // PUT
// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();

//     await db.query(
//       `
//       UPDATE Jobs
//       SET
//         title=?,
//         description=?,
//         responsibilities=?,
//         requiredSkills=?,
//         education=?,
//         experience=?
//       WHERE jobId=?
//       `,
//       [
//         body.title,
//         body.description,
//         body.responsibilities,
//         body.requiredSkills,
//         body.education,
//         body.experience,
//         body.jobId,
//       ]
//     );

//     return Response.json({
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { error: "Failed to update job" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE
// export async function DELETE(req: Request) {
//   try {
//     const body = await req.json();

//     await db.query(
//       "DELETE FROM Jobs WHERE jobId=?",
//       [body.id]
//     );

//     return Response.json({
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       { error: "Failed to delete job" },
//       { status: 500 }
//     );
//   }
// }