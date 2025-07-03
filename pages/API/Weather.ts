// pages/api/weather.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const city = req.query.city as string;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Failed to fetch weather data",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
