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
        const apiKey = process.env.OPENROUTER_API_KEY.trim();

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful coding assistant. Explain clearly in simple words."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const reply =
            response.data?.choices?.[0]?.message?.content ||
            "No response received.";

        res.json({ reply });

    } catch (error) {
        console.log("FULL ERROR:");
        console.log(error.response?.data || error.message);

        res.json({
            reply: "Deployment API Error."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});