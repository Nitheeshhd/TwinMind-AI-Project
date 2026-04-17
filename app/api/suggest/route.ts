export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model:  "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `
You are an AI assistant.

Based on the conversation below, return EXACTLY 3 suggestions.

IMPORTANT:
- Return ONLY valid JSON
- Do NOT add explanation
- Format MUST be:

{
  "suggestions": [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3"
  ]
}

Conversation:
${transcript}
              `,
            },
          ],
          temperature: 0.5,
        }),
      }
    );

    const data = await response.json();

    console.log("Groq Raw:", data);

    const content = data?.choices?.[0]?.message?.content || "";

    console.log("MODEL OUTPUT:", content);

    // ✅ Parse JSON safely
    let suggestions: string[] = [];

    try {
      const parsed = JSON.parse(content);
      suggestions = parsed.suggestions || [];
    } catch (err) {
      console.error("JSON parse failed:", err);
    }

    return Response.json({ suggestions });

  } catch (error) {
    console.error("Suggestion API Error:", error);
    return Response.json(
      { error: "Suggestion failed" },
      { status: 500 }
    );
  }
}