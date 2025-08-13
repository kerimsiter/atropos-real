import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // 1. Create a dummy Company
  const company = await prisma.company.upsert({
    where: { taxNumber: '1234567890' },
    update: {},
    create: {
      name: 'Atropos Bilişim',
      taxNumber: '1234567890',
      taxOffice: 'Maslak',
      address: 'Büyükdere Cad. No:1, İstanbul',
      phone: '02120000000',
      email: 'info@atropos.com',
    },
  });
  console.log(`Created company: ${company.name} (ID: ${company.id})`);

  // 2. Hash the password for the user
  const saltRounds = 10;
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(`Password "password" hashed successfully.`);

  // 3. Create a dummy User
  const user = await prisma.user.upsert({
    where: { username: 'superadmin' },
    update: {},
    create: {
      username: 'superadmin',
      password: hashedPassword,
      firstName: 'Süper',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
      companyId: company.id,
      email: 'superadmin@atropos.com',
      phone: '05000000000',
    },
  });

  console.log(`Created user: ${user.username} (ID: ${user.id})`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
