import prisma from '../../../lib/prisma';
import cloudinary from '../../../lib/cloudinary';

export const runtime = 'nodejs';

// ───────────────────────────────────────────────
// POST → Create Application
// ───────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const get = (key: string): string | undefined => {
      const value = form.get(key);
      return value ? String(value) : undefined;
    };

    const name = get('name');
    const email = get('email');
    const dobRaw = get('dob');

    const mobileNumber = get('mobileNumber');
    const education = get('education');
    const experience = get('experience');
    const address = get('address');
    const position = get('position');

    // Validate required fields
    if (!name || !email) {
      return Response.json(
        {
          ok: false,
          error: 'Name and email are required',
        },
        { status: 400 }
      );
    }

    const dob = dobRaw ? new Date(dobRaw) : null;

    let resumePath: string | null = null;

    const resume = form.get('resume') as File | null;

    // ───────────────────────────────────────────────
    // Upload Resume to Cloudinary
    // ───────────────────────────────────────────────
    if (resume && resume.size > 0) {
      try {
        // Max file size → 2MB
        const MAX_SIZE = 2 * 1024 * 1024;

        if (resume.size > MAX_SIZE) {
          return Response.json(
            {
              ok: false,
              error: 'Resume must be less than 2MB',
            },
            { status: 400 }
          );
        }

        // Allowed file types
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedTypes.includes(resume.type)) {
          return Response.json(
            {
              ok: false,
              error: 'Only PDF, DOC and DOCX files are allowed',
            },
            { status: 400 }
          );
        }

        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const uploadResult: any = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw',
              type: 'upload',
              access_mode: 'public',
              folder: 'resumes',
              use_filename: true,
              unique_filename: true,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          stream.end(buffer);
        });

        // Save public Cloudinary URL
        resumePath = uploadResult.secure_url;

        console.log('Resume uploaded successfully:', resumePath);

      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);

        return Response.json(
          {
            ok: false,
            error: 'Resume upload failed',
          },
          { status: 500 }
        );
      }
    }

    // ───────────────────────────────────────────────
    // Save Application to Database
    // ───────────────────────────────────────────────
    const created = await prisma.application.create({
      data: {
        name,
        email,
        dob: dob ?? undefined,
        mobileNumber,
        education,
        experience,
        address,
        position,
        resumePath,
      },
    });

    return Response.json(
      {
        ok: true,
        created,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error('Application submission error:', err);

    return Response.json(
      {
        ok: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────────────
// GET → Fetch Applications
// ───────────────────────────────────────────────
export async function GET() {
  try {
    const apps = await prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json(apps, {
      status: 200,
    });

  } catch (err) {
    console.error('Fetch applications error:', err);

    return Response.json(
      {
        ok: false,
        error: 'Failed to fetch applications',
      },
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────────────
// DELETE → Delete Application
// ───────────────────────────────────────────────
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const id = Number(body.id);

    if (!id) {
      return Response.json(
        {
          ok: false,
          error: 'Application ID required',
        },
        { status: 400 }
      );
    }

    await prisma.application.delete({
      where: {
        id,
      },
    });

    return Response.json(
      {
        ok: true,
        message: 'Application deleted successfully',
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('Delete application error:', err);

    return Response.json(
      {
        ok: false,
        error: 'Failed to delete application',
      },
      { status: 500 }
    );
  }
}