import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ items: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    { message: "Item created", data: body },
    { status: 201 },
  );
}
