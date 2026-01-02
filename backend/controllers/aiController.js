import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;

    const safeHistory = Array.isArray(history) ? history : [];

    const messages = [
      {
        role: "system",
        content:
          "You are an expert financial assistant. Keep answers concise and helpful.",
      },
      ...safeHistory.map((item) => ({
        role: item.role === "user" ? "user" : "assistant",
        content: item.text,
      })),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    // console.log(reply);

    res.status(200).json({
      success: true,
      text: reply,
    });
  } catch (error) {
    console.error("❌ Groq Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Groq AI error",
    });
  }
};
