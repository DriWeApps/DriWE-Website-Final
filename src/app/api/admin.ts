import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@1234', 10);

  const user = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('Admin created:', user.email);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });