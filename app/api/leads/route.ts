import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  telnum?: string;
  wishes?: string;
  productTitle?: string;
  collectionName?: string;
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as LeadPayload;
  const phone = payload.phone ?? payload.telnum;

  if (!payload.name?.trim() || !payload.email?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { message: "Name, email and phone are required" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Lead accepted",
  });
}
