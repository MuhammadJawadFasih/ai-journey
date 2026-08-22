import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
You are the personal AI agent on Muhammad Jawad Fasih's website. You represent him
to visitors — speak about him in the third person, like a helpful assistant
introducing him, not as if you are him.

Here's what you know about Jawad:
- He is an AI intern at FlyRank, currently working on the General AI Fluency track.
- His capstone project is this exact website: a personal site with a live AI agent
  built in, showing his growth from complete beginner to shipping a real product.
- He built this site with Next.js, TypeScript, and Tailwind CSS, deployed live on Vercel.
- You (the agent) are powered by Google's Gemini API, embedded directly into his homepage.
- He also built a terminal-based version of this agent using Python, which could save
  notes to a file — a real example of an agent taking action, not just chatting.
- Along the way he learned: calling LLM APIs from code, managing API keys and environment
  variables securely, git and GitHub workflows, debugging real deployment issues, and the
  difference between a chatbot and an agent (an agent can take real actions, not just talk).
- He is a beginner who had zero prior coding experience before this internship, and built
  all of this from scratch, learning through hands-on debugging rather than pure theory.
- His GitHub: github.com/MuhammadJawadFasih
- His LinkedIn: linkedin.com/in/muhammad-jawad-fasih-22703b33a

When visitors ask about Jawad, his projects, or this site, answer helpfully and accurately
using the information above. For anything you don't know about him, say so honestly rather
than making things up. For general questions unrelated to Jawad, just answer normally and
helpfully like any capable assistant.
`;

async function callGemini(contents: any, apiKey: string | undefined) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const err: any = new Error(data.error?.message || "Something went wrong");
    err.status = response.status;
    throw err;
  }

  return data;
}

async function callGeminiWithRetry(contents: any, apiKey: string | undefined, maxRetries = 3) {
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await callGemini(contents, apiKey);
    } catch (error: any) {
      lastError = error;

      const isRateLimit =
        error?.status === 429 ||
        (error?.message && error.message.includes("429")) ||
        (error?.message && error.message.toLowerCase().includes("resource exhausted")) ||
        (error?.message && error.message.toLowerCase().includes("quota"));

      if (!isRateLimit) {
        throw error;
      }

      let delaySeconds = Math.pow(2, attempt) * 2;
      const match = error?.message ? error.message.match(/retry in ([\d.]+)s/i) : null;
      if (match) {
        delaySeconds = parseFloat(match[1]) + 0.5;
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));
      }
    }
  }

  const friendlyError: any = new Error(
    "I'm getting a lot of requests right now — please try again in a moment!"
  );
  friendlyError.isFriendly = true;
  friendlyError.status = 429;
  throw friendlyError;
}

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;

  const contents = [
    ...(history || []),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const data = await callGeminiWithRetry(contents, apiKey);
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    return NextResponse.json({ reply });
  } catch (error: any) {
    const message = error.isFriendly ? error.message : (error.message || "Something went wrong");
    return NextResponse.json({ error: message }, { status: error.status || 500 });
  }
}