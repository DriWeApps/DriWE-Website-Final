import prisma from '../../../lib/prisma';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

// ───────────────────────────────────────────────
// POST → Save Application
// ───────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const get = (k: string) => {
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
    const resume = form.get('resume') as any;

    if (resume && typeof resume.name === 'string') {
      try {
        // Ensure uploads folder exists inside public/
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.promises.mkdir(uploadsDir, { recursive: true });

        // Sanitize file name
        const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filename = `${Date.now()}-${safeName}`;
        const filePath = path.join(uploadsDir, filename);

        // Write file buffer
        const buffer =
          typeof resume.arrayBuffer === 'function'
            ? Buffer.from(await resume.arrayBuffer())
            : resume instanceof Buffer
            ? resume
            : null;

        if (!buffer) throw new Error('Unsupported resume file type');

        await fs.promises.writeFile(filePath, buffer);

        // ✅ Save clean relative path
        resumePath = `/uploads/${filename}`;
      } catch (fileErr) {
        console.error('Resume save error:', fileErr);
      }
    }

    if (!name || !email) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Name and email are required' }),
        { status: 400 }
      );
    }

    // Save to database
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

    return new Response(JSON.stringify({ ok: true, created }), { status: 201 });
  } catch (err) {
    console.error('Application submission error:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
    });
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
    return new Response(JSON.stringify(apps), { status: 200 });
  } catch (err) {
    console.error('Error fetching applications:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
    });
  }
}
