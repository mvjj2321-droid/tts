import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/+esm";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Missing text in request body" });
    }

    // Connect to your HF Space
    const client = await Client.connect("JasonKishore007/Zpeak");

    // Call the TTS function
    const result = await client.predict("/synthesize", [
      text,
      "Ryan — UK Male, Natural",
      0,
      0
    ]);

    // Extract MP3 URL
    const audioURL = result.data[0].url;

    // Return as JSON
    res.status(200).json({ audio: audioURL });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS failed", details: err.message });
  }
}
