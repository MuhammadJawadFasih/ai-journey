import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;

  const contents = [
    ...(history || []),
    { role: "user", parts: [{ text: message }] },
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.error?.message || "Something went wrong" },
      { status: response.status }
    );
  }

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

  return NextResponse.json({ reply });
}