import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//run with "npx prisma db seed"
async function main() {
  //initial clients
  const client1 = await prisma.client.upsert({
    where: { email: 'alex.johnson@example.com' },
    update: {},
    create: {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      phone: '1234567890',
      notes: 'Prefers natural and organic hair products. Sensitive scalp.',
    },
  });
  const client2 = await prisma.client.upsert({
    where: { email: 'jamie.smith@example.com' },
    update: {},
    create: {
      firstName: 'Jamie',
      lastName: 'Smith',
      email: 'jamie.smith@example.com',
      phone: '2345678901',
      notes:
        'Likes bold hair colors and is open to trying new styles. Allergic to some hair dyes.',
    },
  });
  const client3 = await prisma.client.upsert({
    where: { email: 'morgan.davis@example.com' },
    update: {},
    create: {
      firstName: 'Morgan',
      lastName: 'Davis',
      email: 'morgan.davis@example.com',
      phone: '3456789012',
      notes:
        'Prefers quick and efficient appointments. Regularly gets a trim every 4-6 weeks.',
    },
  });

  //initial services
  const service1 = await prisma.service.upsert({
    where: { name: 'Basic Haircut' },
    update: {},
    create: {
      name: 'Basic Haircut',
      description:
        'A quick trim to keep your hair looking sharp and clean. Perfect for regular maintenance.',
      price: 25,
      duration: 30,
      image: '/image1.jpg',
    },
  });
  const service2 = await prisma.service.upsert({
    where: { name: 'Hair Coloring' },
    update: {},
    create: {
      name: 'Hair Coloring',
      description:
        'Full hair coloring service with a wide range of color options, from natural shades to bold hues.',
      price: 75, // $75.00
      duration: 120, // 2 hours
      image: '/image2.jpg',
    },
  });
  const service3 = await prisma.service.upsert({
    where: { name: 'Deluxe Styling Package' },
    update: {},
    create: {
      name: 'Deluxe Styling Package',
      description:
        'An all-inclusive package that includes washing, cutting, styling, and a deep conditioning treatment.',
      price: 100, // $100.00
      duration: 90, // 1 hour and 30 minutes
      image: '/image3.jpg',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    // close Prisma Client at the end

    await prisma.$disconnect();
  });
