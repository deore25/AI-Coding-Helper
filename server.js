const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
    const key = (process.env.OPENROUTER_API_KEY || "").trim();

    res.send({
        keyLength: key.length,
        first10: key.substring(0, 10),
        last10: key.substring(key.length - 10)
    });
});

app.listen(process.env.PORT || 3000);