import { db } from "@/lib/dynamodb";

import { s3 } from "@/lib/s3";
import { PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const TABLE = "Applications";

// GET
export async function GET() {
  const res = await db.send(
    new ScanCommand({
      TableName: TABLE,
    })
  );

  // return Response.json(res.Items);
  return Response.json(
    (res.Items || []).map((item) => ({
      id: item.applicationId,
      ...item,
    }))
  );
}

// POST
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("resume") as File | null;

    let resumeUrl = null;

    // Upload to S3
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const key = `resumes/${Date.now()}-${file.name}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: "driwe-resumes-bucket",
          Key: key,
          Body: buffer,
          ContentType: file.type,
        })
      );

      resumeUrl = `https://driwe-resumes-bucket.s3.amazonaws.com/${key}`;
    }

    const data = {
      name: form.get("name"),
      email: form.get("email"),
      gender: form.get("gender"),
      mobileNumber: form.get("mobileNumber"),
      education: form.get("education"),
      experience: form.get("experience"),
      address: form.get("address"),
      position: form.get("position"),
      resumePath: resumeUrl,
      createdAt: new Date().toISOString(),
    };

    // CHECK DUPLICATE EMAIL HERE

    // const existing = await db.send(
    //   new ScanCommand({
    //     TableName: TABLE,
    //     FilterExpression: "email = :email",
    //     ExpressionAttributeValues: {
    //       ":email": data.email,
    //     },
    //   })
    // );

    // if (existing.Items && existing.Items.length > 0) {
    //   return Response.json(
    //     { error: "You have already applied with this email address." },
    //     { status: 400 }
    //   );
    // }


    const existing = await db.send(
      new ScanCommand({
        TableName: TABLE,
        FilterExpression: "email = :email AND #pos = :position",
        ExpressionAttributeNames: {
          "#pos": "position",
        },
        ExpressionAttributeValues: {
          ":email": data.email,
          ":position": data.position,
        },
      })
    );
    if (existing.Items && existing.Items.length > 0) {
      return Response.json(
        {
          error: "You have already applied for this position.",
        },
        { status: 400 }
      );
    }
    // SAVE APPLICATION

    await db.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          applicationId: `APP#${Date.now()}`,
          ...data,
        },
      })
    );

    return Response.json({ success: true });
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
  const body = await req.json();

  console.log("DELETE BODY:", body);

  await db.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: {
        applicationId: body.id,
      },
    })
  );
  return Response.json({ success: true });
}

