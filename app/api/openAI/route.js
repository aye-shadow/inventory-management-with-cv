import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(request) {
  const body = await request.json();
  //   console.log("body:", body.photoURL);

  let response;
  try {
    const apiKey = process.env.OPENAI_VISION_AI_API_KEY;
    if (!apiKey) {
      throw new Error("API key is not defined");
    }

    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Classify/Name the non-living object that's the focal point of this image only. Do not say anything else. If there is no non-living object as the focal point of the image, say 'null'.",
            },
            {
              type: "image_url",
              image_url: {
                url: body.photoURL,
                detail: "low",
              },
            },
          ],
        },
      ],
    });
    // console.log(response);
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
  }

  return NextResponse.json({ message: response });
}
