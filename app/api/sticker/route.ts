import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

  if (!prompt) {
    return NextResponse.json("Please provide a prompt", { status: 400 });
  }

  try {
    const output = (await replicate.run(
      "fofr/sticker-maker:6443cc831f51eb01333f50b757157411d7cadb6215144cc721e3688b70004ad0",
      {
        input: {
          steps: 20,
          width: 1024,
          height: 1024,
          prompt: prompt,
          upscale: true,
          upscale_steps: 10,
          negative_prompt: "racist",
        },
      }
    )) as Array<string>;

    return NextResponse.json({ prompt: prompt, imgUrl: output[1] });
  } catch (error) {
    console.error(error);
    return NextResponse.json("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
