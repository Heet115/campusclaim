import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  return NextResponse.json(
    { url: "https://example.com/uploaded-image.jpg" },
    { status: 201 },
  );
}
