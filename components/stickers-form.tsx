"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { generateSticker } from "@/actions";
import { Loader } from "./loader";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="bg-black hover:bg-black active:bg-black min-w-[100px]"
      disabled={pending}
    >
      {pending ? <Loader /> : "Generate"}
    </Button>
  );
}

const StickersForm = ({ prompt }: { prompt?: string }) => {
  const [formState, formAction] = useFormState(generateSticker, {
    message: "",
  });

  const formStatus = useFormStatus();

  return (
    <form
      action={formAction}
      className="w-full flex flex-row border border-solid border-white p-2 rounded-2xl space-x-4 shadow-lg"
    >
      <Input
        className="flex-grow-[1] bg-transparent border-none active:border-none outline-none rounded-full"
        name="prompt"
        defaultValue={prompt}
        disabled={formStatus.pending}
        placeholder="a cute pudgy penguin"
        autoCorrect="off"
        autoComplete="off"
      />
      <SubmitButton />
    </form>
  );
};

export default StickersForm;
