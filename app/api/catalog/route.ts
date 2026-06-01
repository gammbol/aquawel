import { NextResponse } from "next/server";
import { furnitureCollections } from "@/app/data/collections";

export async function GET() {
  return NextResponse.json({
    collections: furnitureCollections,
  });
}
