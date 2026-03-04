import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type CreateProfileBody = {
  fullName: string;
  email: string;
  location: string;
  targetRole: string;
  yearsExp: number;
  skills: string[]; // ["react", "typescript", ...]
  preference: {
    modality: string; // "remote" | "hybrid" | "onsite"
    salaryExpect: number;
    mustHave: string[];
    niceToHave: string[];
  };
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateProfileBody;

    // Validaciones mínimas (MVP)
    if (!body.fullName?.trim()) {
      return NextResponse.json({ error: "fullName is required" }, { status: 400 });
    }
    if (!body.email?.includes("@")) {
      return NextResponse.json({ error: "valid email is required" }, { status: 400 });
    }
    if (!body.targetRole?.trim()) {
      return NextResponse.json({ error: "targetRole is required" }, { status: 400 });
    }
    if (!Array.isArray(body.skills) || body.skills.length < 3) {
      return NextResponse.json({ error: "skills must have at least 3 items" }, { status: 400 });
    }
    if (!body.preference) {
      return NextResponse.json({ error: "preference is required" }, { status: 400 });
    }

    const created = await prisma.profile.create({
      data: {
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
  } catch (error) {
    // Email repetido (unique)
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json({ error: "email already exists" }, { status: 409 });
    }
    return NextResponse.json(
      { error: "internal error" },
      { status: 500 }
    );
  }
}export async function GET() {
    const profiles = await prisma.profile.findMany({
      orderBy: { createdAt: "desc" },
      include: { preference: true },
    });
  
    return NextResponse.json(profiles);
  }