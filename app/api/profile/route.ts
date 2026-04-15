import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const profiles = await prisma.profile.findMany({
      orderBy: { createdAt: "desc" },
      include: { preference: true },
    });
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching profiles" }, { status: 500 });
  }
}