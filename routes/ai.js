const express = require("express");
const router = express.Router();
const axios = require("axios");

// Replace with your Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // 🔐 use .env in production

router.post("/suggest-task", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: GEMINI_API_KEY,
        },
      }
    );

    const suggestion = response.data.candidates[0].content.parts[0].text;
    res.json({ suggestion });
  } catch (error) {
    console.error("Gemini error:", error?.response?.data || error.message);
    res.status(500).json({ message: "AI suggestion failed" });
  }
});

module.exports = router;
