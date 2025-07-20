import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function loadJson(file: string) {
  const filePath = path.join(__dirname, 'data', file);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

async function main() {
  const users = await loadJson('users.json');
  const categories = await loadJson('categories.json');
  const products = await loadJson('products.json');

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10); 

    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role || "customer",
      },
    });
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product
    });
  }

  console.log('✅ Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
