import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const demoJobs = [
  { title: "Frontend Developer", company: "TechNova", location: "Medellín", modality: "remote", salaryMin: 5000000, salaryMax: 8000000, skills: ["react", "typescript", "css", "tailwind"] },
  { title: "Backend Node.js Developer", company: "CloudWorks", location: "Bogotá", modality: "hybrid", salaryMin: 6000000, salaryMax: 9000000, skills: ["node", "express", "postgresql", "docker"] },
  { title: "Fullstack Next.js Developer", company: "Magneto Labs", location: "Remoto", modality: "remote", salaryMin: 7000000, salaryMax: 11000000, skills: ["nextjs", "react", "node", "postgresql", "prisma"] },
  { title: "Data Analyst", company: "DataCorp", location: "Medellín", modality: "onsite", salaryMin: 4000000, salaryMax: 7000000, skills: ["sql", "python", "excel", "tableau"] },
  { title: "Mobile Developer (Android)", company: "EAFIT Apps", location: "Envigado", modality: "hybrid", salaryMin: 5500000, salaryMax: 8500000, skills: ["kotlin", "java", "android studio", "firebase"] },
  { title: "Senior Python Developer", company: "PaisaTech", location: "Medellín", modality: "remote", salaryMin: 12000000, salaryMax: 18000000, skills: ["python", "django", "aws", "microservices"] },
  { title: "Cybersecurity Analyst", company: "SafeGuard", location: "Bogotá", modality: "remote", salaryMin: 9000000, salaryMax: 14000000, skills: ["linux", "wireshark", "python", "pentesting"] },
  { title: "Cloud Architect", company: "SkyHigh", location: "Remoto", modality: "remote", salaryMin: 15000000, salaryMax: 22000000, skills: ["aws", "terraform", "kubernetes", "go"] },
  { title: "QA Automation Engineer", company: "BugFree", location: "Medellín", modality: "hybrid", salaryMin: 6000000, salaryMax: 9500000, skills: ["selenium", "cypress", "javascript", "jest"] },
  { title: "Machine Learning Engineer", company: "AI Core", location: "Envigado", modality: "onsite", salaryMin: 11000000, salaryMax: 16000000, skills: ["pytorch", "tensorflow", "python", "pandas"] },
  { title: "DevOps Engineer", company: "PipelinePro", location: "Medellín", modality: "remote", salaryMin: 8000000, salaryMax: 13000000, skills: ["docker", "jenkins", "aws", "linux"] },
  { title: "UI/UX Designer", company: "PixelPerfect", location: "Bogotá", modality: "hybrid", salaryMin: 4500000, salaryMax: 7500000, skills: ["figma", "adobe xd", "css", "html"] },
  { title: "Blockchain Developer", company: "CryptoPaisa", location: "Remoto", modality: "remote", salaryMin: 14000000, salaryMax: 20000000, skills: ["solidity", "ethereum", "rust"] },
  { title: "SRE Engineer", company: "StabilityFirst", location: "Medellín", modality: "remote", salaryMin: 11000000, salaryMax: 17000000, skills: ["prometheus", "grafana", "python", "go"] },
  { title: "iOS Developer", company: "AppleEaters", location: "Medellín", modality: "onsite", salaryMin: 6500000, salaryMax: 10000000, skills: ["swift", "xcode", "uikit"] },
  { title: "Database Administrator", company: "DataSafe", location: "Bogotá", modality: "hybrid", salaryMin: 7000000, salaryMax: 12000000, skills: ["postgresql", "mongodb", "sql server", "redis"] },
  { title: "Game Developer (Unity)", company: "IndieFlow", location: "Medellín", modality: "remote", salaryMin: 5000000, salaryMax: 8500000, skills: ["c#", "unity", "blender"] },
  { title: "Technical Writer", company: "DocuMaster", location: "Remoto", modality: "remote", salaryMin: 3500000, salaryMax: 5500000, skills: ["markdown", "english", "git"] },
  { title: "Product Manager", company: "StrategyHQ", location: "Medellín", modality: "hybrid", salaryMin: 10000000, salaryMax: 16000000, skills: ["agile", "jira", "scrum", "leadership"] },
  { title: "PHP/Laravel Dev", company: "LegacySoft", location: "Bogotá", modality: "onsite", salaryMin: 4000000, salaryMax: 6500000, skills: ["php", "laravel", "mysql", "javascript"] },
];

async function seedDemoJobs() {
  const existingJobs = await prisma.job.findMany({
    select: {
      title: true,
      company: true,
    },
  });

  const existingKeys = new Set(existingJobs.map((job) => `${job.title}__${job.company}`));
  const missingJobs = demoJobs.filter((job) => !existingKeys.has(`${job.title}__${job.company}`));

  if (missingJobs.length > 0) {
    await prisma.job.createMany({ data: missingJobs });
  }
}

export async function GET() {
  await seedDemoJobs();

  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}