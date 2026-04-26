import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const briefs = await prisma.brief.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(briefs);
  } catch (error) {
    console.error("GET briefs error:", error);
    return NextResponse.json({ error: "Failed to fetch briefs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const brief = await prisma.brief.create({
      data: {
        // Block 1
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        companyName: body.companyName,
        
        // Block 2
        primaryObjective: body.primaryObjective,
        problemToSolve: body.problemToSolve,
        keyFeatures: body.keyFeatures,
        
        // Block 3
        aiCapabilities: body.aiCapabilities,
        preferredModels: body.preferredModels,
        dataSources: body.dataSources,
        integrations: body.integrations,
        
        // Block 4
        designStyle: body.designStyle,
        colorPalette: body.colorPalette,
        competitors: body.competitors,
        
        // Block 5
        targetAudience: body.targetAudience,
        budgetRange: body.budgetRange,
        timeline: body.timeline,
        successMetrics: body.successMetrics,
        comments: body.comments,
      },
    });
    return NextResponse.json(brief);
  } catch (error) {
    console.error("POST brief error:", error);
    return NextResponse.json({ error: "Failed to create brief" }, { status: 500 });
  }
}
