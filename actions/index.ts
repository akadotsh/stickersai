"use server";
import Replicate from "replicate";
import { z } from "zod";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

const prompClassifier = async (input: string) => {
  try {
    if (!input) return;

    const output = (await replicate.run(
      "fofr/prompt-classifier:1ffac777bf2c1f5a4a5073faf389fefe59a8b9326b3ca329e9d576cce658a00f",
      {
        input: {
          prompt: `[PROMPT] ${input} [/PROMPT] [SAFETY_RANKING]`,
          max_new_tokens: 128,
          temperature: 0.2,
          top_p: 0.9,
          top_k: 50,
          stop_sequences: "[/SAFETY_RANKING]",
        },
      }
    )) as string[];

    return Number(output.join("").trim());
  } catch (error) {
    console.error(error);
    return 0;
  }
};

interface FormState {
  message: string;
}

export const generateSticker = async (
  prevState: any | undefined,
  formData: FormData
): Promise<FormState | void> => {
  const id = nanoid();

  try {
    const schema = z.object({
      prompt: z.string(),
    });

    const { prompt } = schema.parse({
      prompt: formData.get("prompt") as string,
    });

    if (!prompt) return;

    const classifierRating = await prompClassifier(prompt);

    if (classifierRating && classifierRating >= 9) {
      return {
        message: "This prompt is too dangerous. Please try another one.",
      };
    }

    const webhookUrl =
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? `${process.env.PRODUCTION_URL}/api/webhook`
        : `${process.env.NGROK_HOST}/api/webhook`;

    const webhook = new URL(webhookUrl);
    webhook.searchParams.set("id", id);
    webhook.searchParams.set(
      "secret",
      process.env.WEBHOOK_SECRET_KEY as string
    );

    const data = { id, prompt };

    await Promise.all([
      replicate.predictions.create({
        version:
          "3d72dfb2c09f9502b62f29026415ab0024fb8a2033a145d971a7eb4dc172177d",
        input: {
          steps: 20,
          width: 1024,
          height: 1024,
          prompt: prompt,
          upscale: true,
          upscale_steps: 10,
          negative_prompt: "racist",
        },
        webhook: webhook.toString(),
        webhook_events_filter: ["completed"],
      }),
    ]);

    redirect(`/s/${id}`);
  } catch (error) {
    console.error(error);
  }
};
