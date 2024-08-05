import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  //   console.log("body:", body.photoURL);

  let response;
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_LLAMA3_RECIPE_API });
    if (!apiKey) {
      throw new Error("API key is not defined");
    }

    response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "Using the given information and write me a food recipe possible with it:. If there's nothing possible, then say that, and suggest a random recipe and its required ingredients.",
        },
      ],
      model: "llama3-8b-8192",
    });
    // console.log(response);
  } catch (error) {
    console.error("Error fetching Llama3 response:", error);
  }

  return NextResponse.json({ message: response });
}
