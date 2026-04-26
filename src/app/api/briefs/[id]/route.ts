import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const brief = await prisma.brief.findUnique({
      where: { id: id },
    });
    if (!brief) {
      return NextResponse.json({ error: "Brief not found" }, { status: 404 });
    }
    return NextResponse.json(brief);
  } catch (error) {
    console.error("GET brief error:", error);
    return NextResponse.json({ error: "Failed to fetch brief" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const brief = await prisma.brief.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(brief);
  } catch (error) {
    console.error("PATCH brief error:", error);
    return NextResponse.json({ error: "Failed to update brief" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.brief.delete({
      where: { id: id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE brief error:", error);
    return NextResponse.json({ error: "Failed to delete brief" }, { status: 500 });
  }
}
