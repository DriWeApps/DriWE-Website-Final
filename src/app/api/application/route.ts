// import { db } from "@/lib/dynamodb";

// import { s3 } from "@/lib/s3";
// import { PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
// import { PutObjectCommand } from "@aws-sdk/client-s3";

// export const runtime = "nodejs";

// const TABLE = "Applications";

// // GET
// export async function GET() {
//   const res = await db.send(
//     new ScanCommand({
//       TableName: TABLE,
//     })
//   );

//   // return Response.json(res.Items);
//   return Response.json(
//     (res.Items || []).map((item) => ({
//       id: item.applicationId,
//       ...item,
//     }))
//   );
// }

// // POST
// export async function POST(req: Request) {
//   try {
//     const form = await req.formData();

//     const file = form.get("resume") as File | null;

//     let resumeUrl = null;

//     // Upload to S3
//     if (file && file.size > 0) {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       const key = `resumes/${Date.now()}-${file.name}`;

//       await s3.send(
//         new PutObjectCommand({
//           Bucket: "driwe-resumes-bucket",
//           Key: key,
//           Body: buffer,
//           ContentType: file.type,
//         })
//       );

//       resumeUrl = `https://driwe-resumes-bucket.s3.amazonaws.com/${key}`;
//     }

//     const data = {
//       name: form.get("name"),
//       email: form.get("email"),
//       gender: form.get("gender"),
//       mobileNumber: form.get("mobileNumber"),
//       education: form.get("education"),
//       experience: form.get("experience"),
//       address: form.get("address"),
//       position: form.get("position"),
//       resumePath: resumeUrl,
//       createdAt: new Date().toISOString(),
//     };

//     // CHECK DUPLICATE EMAIL HERE

//     // const existing = await db.send(
//     //   new ScanCommand({
//     //     TableName: TABLE,
//     //     FilterExpression: "email = :email",
//     //     ExpressionAttributeValues: {
//     //       ":email": data.email,
//     //     },
//     //   })
//     // );

//     // if (existing.Items && existing.Items.length > 0) {
//     //   return Response.json(
//     //     { error: "You have already applied with this email address." },
//     //     { status: 400 }
//     //   );
//     // }


//     const existing = await db.send(
//       new ScanCommand({
//         TableName: TABLE,
//         FilterExpression: "email = :email AND #pos = :position",
//         ExpressionAttributeNames: {
//           "#pos": "position",
//         },
//         ExpressionAttributeValues: {
//           ":email": data.email,
//           ":position": data.position,
//         },
//       })
//     );
//     if (existing.Items && existing.Items.length > 0) {
//       return Response.json(
//         {
//           error: "You have already applied for this position.",
//         },
//         { status: 400 }
//       );
//     }
//     // SAVE APPLICATION

//     await db.send(
//       new PutCommand({
//         TableName: TABLE,
//         Item: {
//           applicationId: `APP#${Date.now()}`,
//           ...data,
//         },
//       })
//     );

//     return Response.json({ success: true });
//   } catch (err) {
//     console.error("APPLICATION ERROR:", err);

//     return Response.json(
//       {
//         error: String(err),
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// // DELETE
// export async function DELETE(req: Request) {
//   const body = await req.json();

//   console.log("DELETE BODY:", body);

//   await db.send(
//     new DeleteCommand({
//       TableName: TABLE,
//       Key: {
//         applicationId: body.id,
//       },
//     })
//   );
//   return Response.json({ success: true });
// }


import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// GET
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        applicationId AS id,
        applicationId,
        address,
        createdAt,
        education,
        email,
        experience,
        gender,
        mobileNumber,
        name,
        position,
        resumePath
      FROM Applications
      ORDER BY createdAt DESC
    `);

    return Response.json(rows);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("resume") as File | null;

    let resumePath = null;

    // Save file locally
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "resumes"
      );

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      await fs.writeFile(
        path.join(uploadDir, fileName),
        buffer
      );

      resumePath = fileName;

      console.log("Resume saved:", fileName);
    }

    const data = {
      applicationId: `APP#${Date.now()}`,
      name: String(form.get("name")),
      email: String(form.get("email")),
      gender: String(form.get("gender")),
      mobileNumber: String(form.get("mobileNumber")),
      education: String(form.get("education")),
      experience: String(form.get("experience")),
      address: String(form.get("address")),
      position: String(form.get("position")),
      resumePath,
      createdAt: new Date().toISOString(),
    };

    // Duplicate check
    const [existing]: any = await db.query(
      `
      SELECT applicationId
      FROM Applications
      WHERE email = ?
      AND position = ?
      LIMIT 1
      `,
      [data.email, data.position]
    );

    if (existing.length > 0) {
      return Response.json(
        {
          error:
            "You have already applied for this position.",
        },
        {
          status: 400,
        }
      );
    }

    await db.query(
      `
      INSERT INTO Applications
      (
        applicationId,
        address,
        createdAt,
        education,
        email,
        experience,
        gender,
        mobileNumber,
        name,
        position,
        resumePath
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.applicationId,
        data.address,
        data.createdAt,
        data.education,
        data.email,
        data.experience,
        data.gender,
        data.mobileNumber,
        data.name,
        data.position,
        data.resumePath,
      ]
    );

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error("APPLICATION ERROR:", err);

    return Response.json(
      {
        error: String(err),
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await db.query(
      `
      DELETE FROM Applications
      WHERE applicationId = ?
      `,
      [body.id]
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}