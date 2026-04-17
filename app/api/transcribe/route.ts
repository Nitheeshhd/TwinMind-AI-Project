export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audio = formData.get("file") as File;

    const groqApiKey = process.env.GROQ_API_KEY;

    const fd = new FormData();
    fd.append("file", audio);
    fd.append("model", "whisper-large-v3");

    const response = await fetch(
      "https://api.groq.com/openai/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: fd,
      }
    );

    const data = await response.json();

    console.log("Groq Response:", data); // 👈 DEBUG

    return Response.json({
  text: data.text,
  raw: data, // 👈 debugging
});

  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Transcription failed" },
      { status: 500 }
    );
  }
}