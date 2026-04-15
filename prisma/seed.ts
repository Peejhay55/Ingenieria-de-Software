import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const defaultPassword = await bcrypt.hash("123456", saltRounds);

  console.log("🚀 Iniciando limpieza total...");
  // El orden importa por las llaves foráneas
  await prisma.application.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();

  console.log("💼 Insertando 20 trabajos...");
  const jobsData = [
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
    { title: "PHP/Laravel Dev", company: "LegacySoft", location: "Bogotá", modality: "onsite", salaryMin: 4000000, salaryMax: 6500000, skills: ["php", "laravel", "mysql", "javascript"] }
  ];

  await prisma.job.createMany({ data: jobsData });

  console.log("👤 Creando 10 perfiles...");
  const profiles = [
    { email: "experto@eafit.edu.co", name: "Juan El Experto", role: "Fullstack Dev", skills: ["nextjs", "react", "node", "postgresql"], exp: 4, sal: 9000000 },
    { email: "caro@mail.com", name: "Santi El Caro", role: "Python Dev", skills: ["python", "django", "aws", "docker"], exp: 6, sal: 25000000 },
    { email: "junior@mail.com", name: "Majo La Junior", role: "Data Analyst", skills: ["excel", "powerbi", "sql"], exp: 1, sal: 3500000 },
    { email: "cloud@sky.com", name: "Alex Cloud", role: "Cloud Architect", skills: ["aws", "terraform", "kubernetes"], exp: 8, sal: 18000000 },
    { email: "tester@qa.com", name: "Cami BugHunter", role: "QA Engineer", skills: ["cypress", "jest", "javascript"], exp: 3, sal: 7500000 },
    { email: "sec@cyber.com", name: "Kevin Mitnick", role: "Security Analyst", skills: ["linux", "wireshark", "python"], exp: 5, sal: 12000000 },
    { email: "design@pixel.com", name: "Sofia Creative", role: "UI Designer", skills: ["figma", "css", "html"], exp: 2, sal: 5000000 },
    { email: "devops@infra.com", name: "Richie Pipeline", role: "DevOps", skills: ["docker", "jenkins", "aws"], exp: 5, sal: 10000000 },
    { email: "game@unity.com", name: "Mateo Gamer", role: "Game Dev", skills: ["c#", "unity", "blender"], exp: 3, sal: 6000000 },
    { email: "jun@test.com", name: "Dani Aprendiz", role: "Junior Dev", skills: ["react", "node", "javascript"], exp: 1, sal: 3000000 }
  ];

  for (const p of profiles) {
    await prisma.user.create({
      data: {
        email: p.email,
        password: defaultPassword,
        profile: {
          create: {
            fullName: p.name,
            email: p.email,
            location: "Medellín",
            targetRole: p.role,
            yearsExp: p.exp,
            skills: p.skills,
            preference: {
              create: {
                modality: "remote",
                salaryExpect: p.sal,
                mustHave: [],
                niceToHave: []
              }
            }
          }
        }
      }
    });
    console.log(`✅ Creado: ${p.name}`);
  }

  console.log("🏁 Proceso terminado con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ ERROR EN EL SEED:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });