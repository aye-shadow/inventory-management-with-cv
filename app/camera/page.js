import React from "react";
import OpenAI from "openai";

const CameraComponent = async () => {
  let message;
  try {
    const apiKey = process.env.OPENAI_VISION_AI_API_KEY;
    if (!apiKey) {
      throw new Error("API key is not defined");
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Bonjour",
        },
      ],
    });
    message = response.choices[0].message["content"];
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
  }

  return <div>{message}</div>;
};

export default CameraComponent;
