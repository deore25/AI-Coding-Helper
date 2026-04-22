const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/ask-ai", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful coding assistant. Explain clearly and simply."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://ai-coding-helper.onrender.com",
                    "X-Title": "AI Coding Helper"
                }
            }
        );

        const reply =
            response.data.choices?.[0]?.message?.content ||
            "No AI response.";

        res.json({ reply });

    } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);

        res.json({
            reply: "Error fetching AI response."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});