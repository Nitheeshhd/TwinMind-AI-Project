export async function POST(req: Request) {
  try {
    const { message } = await req.json();

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
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `Explain this suggestion clearly and helpfully:

${message}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content || "No response";

    return Response.json({ reply });

  } catch (err) {
    return Response.json({ error: "Chat failed" });
  }
}