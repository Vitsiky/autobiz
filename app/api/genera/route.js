export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt mancante" }, { status: 400 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", response.status, JSON.stringify(data));
      return Response.json({ error: "Errore API" }, { status: 500 });
    }

    const text = data.choices?.[0]?.message?.content || "";
    return Response.json({ result: text });
  } catch (err) {
    return Response.json({ error: "Errore server" }, { status: 500 });
  }
}
