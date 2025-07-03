import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "API key not found in environment variables." });
  }

  if (!city || typeof city !== "string") {
    return res.status(400).json({ error: "City is required." });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("API Fetch Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
