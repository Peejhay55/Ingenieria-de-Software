import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ApplyBody = {
  profileId: string;
  jobId: string;
  score: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApplyBody;

    if (!body.profileId || !body.jobId) {
      return NextResponse.json({ error: "profileId and jobId are required" }, { status: 400 });
    }

    const created = await prisma.application.create({
      data: {
        profileId: body.profileId,
        jobId: body.jobId,
        score: Math.max(0, Math.round(body.score ?? 0)),
      },
      include: {
        job: true,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    // Si ya aplicó a esa vacante (unique profileId+jobId)
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json({ error: "already applied to this job" }, { status: 409 });
    }

    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}