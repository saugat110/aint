import prisma from "../src/utils/prisma.js";

async function main() {
  const agents = [
    {
      name: 'John Doe',
      contactInfo: 'john@example.com',
      recordOrigin: 'manual',
    },
    {
      name: 'Jane Smith',
      contactInfo: 'jane@example.com',
      recordOrigin: 'manual',
    },
    {
      name: 'Admin Agent',
      contactInfo: 'admin@example.com',
      recordOrigin: 'manual',
    }
  ];

  for (const agent of agents) {
    await prisma.agent.upsert({
      where: { name: agent.name },
      update: {},
      create: agent,
    });
  }

  console.log("Seeded agents");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
