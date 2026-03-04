import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type JobRow = {
    id: string;
    title: string;
    company: string;
    location: string;
    modality: string;
    salaryMin: number;
    salaryMax: number;
    skills: string[];
  };

function normalizeList(list: string[]) {
  return (list ?? []).map((s) => s.trim().toLowerCase()).filter(Boolean);
}

function intersectsCount(a: string[], b: string[]) {
  const setB = new Set(b);
  let count = 0;
  for (const x of a) if (setB.has(x)) count++;
  return count;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const profileId = url.searchParams.get("profileId");

  if (!profileId) {
    return NextResponse.json({ error: "profileId is required" }, { status: 400 });
  }

  let profile = await prisma.profile.findUnique({
    where: { id: profileId },
    include: { preference: true },
  });
  
  if (!profile) {
    return NextResponse.json({ error: "profile not found" }, { status: 404 });
  }
  
 
  if (!profile.preference) {
    await prisma.preference.create({
      data: {
        profileId: profile.id,
        modality: "remote",
        salaryExpect: 0,
        mustHave: [],
        niceToHave: [],
      },
    });
  
   
    profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: { preference: true },
    });
  }
  
  if (!profile || !profile.preference) {
    return NextResponse.json({ error: "preference could not be created" }, { status: 500 });
  }

  const jobs = await prisma.job.findMany();

  const candidateSkills = normalizeList(profile.skills);
  const mustHave = normalizeList(profile.preference.mustHave);
  const niceToHave = normalizeList(profile.preference.niceToHave);
  const prefModality = (profile.preference.modality ?? "").toLowerCase();
  const salaryExpect = profile.preference.salaryExpect ?? 0;

  const scored = jobs
  .map((job: JobRow) => {
      const jobSkills = normalizeList(job.skills);

      // 1) Skills match (0-60)
      const matchedSkills = intersectsCount(candidateSkills, jobSkills);
      const skillsRatio = candidateSkills.length === 0 ? 0 : matchedSkills / candidateSkills.length;
      const skillsScore = Math.round(skillsRatio * 60);

      
      let mustHavePenalty = 0;
      for (const mh of mustHave) {
        const ok =
          job.modality.toLowerCase() === mh ||
          job.location.toLowerCase().includes(mh) ||
          jobSkills.includes(mh) ||
          job.title.toLowerCase().includes(mh);

        if (!ok) mustHavePenalty += 30; // penalización acumulable
      }

      // 3) Nice-to-have (0-15)
      const niceHits = intersectsCount(niceToHave, jobSkills);
      const niceScore = Math.min(15, niceHits * 5);

      // 4) Modalidad preferida (0-10)
      const modalityScore = job.modality.toLowerCase() === prefModality ? 10 : 0;

      // 5) Salario (0-15) -> si salaryMax >= expectativa, suma.
      const salaryScore = job.salaryMax >= salaryExpect ? 15 : job.salaryMax >= salaryExpect * 0.9 ? 8 : 0;

      const total = Math.max(0, skillsScore + niceScore + modalityScore + salaryScore - mustHavePenalty);

      return {
        job,
        score: total,
        breakdown: {
          skillsScore,
          niceScore,
          modalityScore,
          salaryScore,
          mustHavePenalty,
          matchedSkills,
        },
      };
    })
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 10);

  return NextResponse.json({
    profile: {
      id: profile.id,
      fullName: profile.fullName,
      targetRole: profile.targetRole,
      preference: profile.preference,
      skills: profile.skills,
    },
    recommendations: scored,
  });
}