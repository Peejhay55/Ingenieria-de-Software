import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.job.createMany({
    data: [
      {
        title: "Frontend Developer",
        company: "TechNova",
        location: "Medellín",
        modality: "remote",
        salaryMin: 5000000,
        salaryMax: 8000000,
        skills: ["react", "typescript", "css"]
      },
      {
        title: "Backend Node.js Developer",
        company: "CloudWorks",
        location: "Bogotá",
        modality: "hybrid",
        salaryMin: 6000000,
        salaryMax: 9000000,
        skills: ["node", "express", "postgresql"]
      },
      {
        title: "Fullstack Next.js Developer",
        company: "Magneto Labs",
        location: "Remote",
        modality: "remote",
        salaryMin: 7000000,
        salaryMax: 11000000,
        skills: ["nextjs", "react", "node", "postgresql"]
      },
      {
        title: "Data Analyst",
        company: "DataCorp",
        location: "Medellín",
        modality: "onsite",
        salaryMin: 4000000,
        salaryMax: 7000000,
        skills: ["sql", "python", "excel"]
      }
    ]
  });

  console.log("Seed completed");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });