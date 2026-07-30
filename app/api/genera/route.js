export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt mancante" }, { status: 400 });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", response.status, JSON.stringify(data));
      return Response.json({ error: "Errore API" }, { status: 500 });
    }

    const text =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("\n") || "";
    return Response.json({ result: text });
  } catch (err) {
    return Response.json({ error: "Errore server" }, { status: 500 });
  }
}
