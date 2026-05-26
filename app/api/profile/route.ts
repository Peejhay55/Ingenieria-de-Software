import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type CreateProfileBody = {
  userId: string; // <-- AHORA ES NECESARIO
  fullName: string;
  email: string;
  location: string;
  targetRole: string;
  yearsExp: number;
  skills: string[];
  preference: {
    modality: string;
    salaryExpect: number;
    mustHave: string[];
    niceToHave: string[];
  };
};

const demoProfiles = [
  { email: "experto@eafit.edu.co", name: "Juan El Experto", role: "Fullstack Dev", skills: ["nextjs", "react", "node", "postgresql"], exp: 4, sal: 9000000 },
  { email: "caro@mail.com", name: "Santi El Caro", role: "Python Dev", skills: ["python", "django", "aws", "docker"], exp: 6, sal: 25000000 },
  { email: "junior@mail.com", name: "Majo La Junior", role: "Data Analyst", skills: ["excel", "powerbi", "sql"], exp: 1, sal: 3500000 },
  { email: "cloud@sky.com", name: "Alex Cloud", role: "Cloud Architect", skills: ["aws", "terraform", "kubernetes"], exp: 8, sal: 18000000 },
  { email: "tester@qa.com", name: "Cami BugHunter", role: "QA Engineer", skills: ["cypress", "jest", "javascript"], exp: 3, sal: 7500000 },
  { email: "sec@cyber.com", name: "Kevin Mitnick", role: "Security Analyst", skills: ["linux", "wireshark", "python"], exp: 5, sal: 12000000 },
  { email: "design@pixel.com", name: "Sofia Creative", role: "UI Designer", skills: ["figma", "css", "html"], exp: 2, sal: 5000000 },
  { email: "devops@infra.com", name: "Richie Pipeline", role: "DevOps", skills: ["docker", "jenkins", "aws"], exp: 5, sal: 10000000 },
  { email: "game@unity.com", name: "Mateo Gamer", role: "Game Dev", skills: ["c#", "unity", "blender"], exp: 3, sal: 6000000 },
  { email: "jun@test.com", name: "Dani Aprendiz", role: "Junior Dev", skills: ["react", "node", "javascript"], exp: 1, sal: 3000000 },
];

async function seedDemoProfiles() {
  const existingCount = await prisma.profile.count();
  if (existingCount > 0) return;

  const hashedPassword = await bcrypt.hash("123456", 10);

  for (const profile of demoProfiles) {
    await prisma.user.create({
      data: {
        email: profile.email,
        password: hashedPassword,
        profile: {
          create: {
            fullName: profile.name,
            email: profile.email,
            location: "Medellín",
            targetRole: profile.role,
            yearsExp: profile.exp,
            skills: profile.skills,
            preference: {
              create: {
                modality: "remote",
                salaryExpect: profile.sal,
                mustHave: [],
                niceToHave: [],
              },
            },
          },
        },
      },
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateProfileBody;

    // Validación de userId (Crucial para JobMaxxing)
    if (!body.userId) {
      return NextResponse.json({ error: "userId is required to link profile" }, { status: 400 });
    }

    // Validaciones MVP... (fullName, email, skills, etc. se mantienen igual)
    if (!body.fullName?.trim()) return NextResponse.json({ error: "fullName is required" }, { status: 400 });
    if (!Array.isArray(body.skills) || body.skills.length < 3) {
      return NextResponse.json({ error: "skills must have at least 3 items" }, { status: 400 });
    }

    const created = await prisma.profile.create({
      data: {
        // VINCULACIÓN CON EL USUARIO
        user: { connect: { id: body.userId } }, 
        
        fullName: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        location: body.location?.trim() ?? "",
        targetRole: body.targetRole.trim(),
        yearsExp: Number(body.yearsExp ?? 0),
        skills: body.skills.map((s) => s.trim().toLowerCase()).filter(Boolean),
        preference: {
          create: {
            modality: body.preference.modality.trim().toLowerCase(),
            salaryExpect: Number(body.preference.salaryExpect ?? 0),
            mustHave: (body.preference.mustHave ?? []).map((s) => s.trim().toLowerCase()).filter(Boolean),
            niceToHave: (body.preference.niceToHave ?? []).map((s) => s.trim().toLowerCase()).filter(Boolean),
          },
        },
      },
      include: { preference: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error("Error en Profile POST:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email or User already has a profile" }, { status: 409 });
    }
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await seedDemoProfiles();

    const profiles = await prisma.profile.findMany({
      orderBy: { createdAt: "desc" },
      include: { preference: true },
    });
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching profiles" }, { status: 500 });
  }
}