// import prisma from '../../../lib/prisma';
// import fs from 'fs';
// import path from 'path';

// export const runtime = 'nodejs';

// // ───────────────────────────────────────────────
// // POST → Save Application
// // ───────────────────────────────────────────────
// export async function POST(req: Request) {
//   try {
//     const form = await req.formData();

//     const get = (k: string): string | undefined => {
//       const v = form.get(k);
//       return v === null ? undefined : String(v);
//     };

//     const name = get('name') || '';
//     const email = get('email') || '';
//     const dobRaw = get('dob');
//     const dob = dobRaw ? new Date(dobRaw) : null;
//     const mobileNumber = get('mobileNumber');
//     const education = get('education');
//     const experience = get('experience');
//     const address = get('address');
//     const position = get('position');

//     let resumePath: string | null = null;
//     const resume = form.get('resume') as File | null; // ← FIXED: No more `any`

//     if (resume && resume.name) {
//       try {
//         const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
//         await fs.promises.mkdir(uploadsDir, { recursive: true });

//         const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, '_');
//         const filename = `${Date.now()}-${safeName}`;
//         const filePath = path.join(uploadsDir, filename);

//         const buffer = Buffer.from(await resume.arrayBuffer());
//         await fs.promises.writeFile(filePath, buffer);

//         resumePath = `/uploads/${filename}`;
//       } catch (fileErr) {
//         console.error('Resume save error:', fileErr);
//       }
//     }

//     if (!name || !email) {
//       return new Response(
//         JSON.stringify({ ok: false, error: 'Name and email are required' }),
//         { status: 400 }
//       );
//     }

//     const created = await prisma.application.create({
//       data: {
//         name,
//         email,
//         dob: dob ?? undefined,
//         mobileNumber,
//         education,
//         experience,
//         address,
//         position,
//         resumePath: resumePath ?? undefined,
//       },
//     });

//     return new Response(JSON.stringify({ ok: true, created }), { status: 201 });
//   } catch (err) {
//     console.error('Application submission error:', err);
//     return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
//       status: 500,
//     });
//   }
// }

// // ───────────────────────────────────────────────
// // GET → Fetch Applications
// // ───────────────────────────────────────────────
// export async function GET() {
//   try {
//     const apps = await prisma.application.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//     return new Response(JSON.stringify(apps), { status: 200 });
//   } catch (err) {
//     console.error('Error fetching applications:', err);
//     return new Response(JSON.stringify({ ok: false, error: 'Server error' }), {
//       status: 500,
//     });
//   }
// }

// // ───────────────────────────────────────────────
// // DELETE → Delete Application by ID
// // ───────────────────────────────────────────────
// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json();

//     if (!id) {
//       return new Response(JSON.stringify({ ok: false, error: 'ID required' }), { status: 400 });
//     }

//     await prisma.application.delete({
//       where: { id: Number(id) },
//     });

//     return new Response(JSON.stringify({ ok: true, message: 'Deleted successfully' }), { status: 200 });
//   } catch (err) {
//     console.error('Error deleting application:', err);
//     return new Response(JSON.stringify({ ok: false, error: 'Server error' }), { status: 500 });
//   }
// }

import prisma from '../../../lib/prisma';
import cloudinary from '../../../lib/cloudinary';

export const runtime = 'nodejs';

// ───────────────────────────────────────────────
// POST → Save Application
// ───────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const get = (k: string): string | undefined => {
      const v = form.get(k);
      return v === null ? undefined : String(v);
    };

    const name = get('name') || '';
    const email = get('email') || '';
    const dobRaw = get('dob');
    const dob = dobRaw ? new Date(dobRaw) : null;
    const mobileNumber = get('mobileNumber');
    const education = get('education');
    const experience = get('experience');
    const address = get('address');
    const position = get('position');

    let resumePath: string | null = null;

    const resume = form.get('resume') as File | null;

    // ───────────────────────────────────────────────
    // Upload Resume to Cloudinary
    // ───────────────────────────────────────────────
    if (resume && resume.name) {
      try {
        // 2MB validation
        const MAX_SIZE = 2 * 1024 * 1024;

        if (resume.size > MAX_SIZE) {
          return new Response(
            JSON.stringify({
              ok: false,
              error: 'Resume size must be less than 2MB',
            }),
            { status: 400 }
          );
        }

        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const base64File = `data:${resume.type};base64,${buffer.toString(
          'base64'
        )}`;

        const uploadRes = await cloudinary.uploader.upload(base64File, {
          resource_type: 'raw',
          folder: 'resumes',
          public_id: `${Date.now()}-${resume.name}`,
        });

        resumePath = uploadRes.secure_url;
      } catch (fileErr) {
        console.error('Cloudinary upload error:', fileErr);
      }
    }

    if (!name || !email) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Name and email are required',
        }),
        { status: 400 }
      );
    }

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
        resumePath: resumePath ?? undefined,
      },
    });

    return new Response(JSON.stringify({ ok: true, created }), {
      status: 201,
    });
  } catch (err) {
    console.error('Application submission error:', err);

    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Server error',
      }),
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
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(apps), {
      status: 200,
    });
  } catch (err) {
    console.error('Error fetching applications:', err);

    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Server error',
      }),
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────────────
// DELETE → Delete Application by ID
// ───────────────────────────────────────────────
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'ID required',
        }),
        { status: 400 }
      );
    }

    await prisma.application.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Deleted successfully',
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error deleting application:', err);

    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Server error',
      }),
      { status: 500 }
    );
  }
}