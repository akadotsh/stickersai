"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { Sticker } from "./sticker";
import axios from "axios";

const StickersForm = ({ prompt }: { prompt?: string }) => {
  const [input, setInput] = useState("");

  function request(url: string, { arg }: { arg: string }) {
    return axios(url, {
      method: "POST",
      data: JSON.stringify({
        prompt: arg,
      }),
    }).then((res) => res.data);
  }

  const { data, trigger, isMutating } = useSWRMutation(
    "/api/sticker",
    request,
    {
      revalidate: true,
    }
  );

  return (
    <div className="flex flex-col space-y-4">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          trigger(input);
          setInput("");
        }}
        className="w-full flex flex-row border border-solid border-white p-2 rounded-2xl space-x-4 shadow-lg"
      >
        <Input
          className="flex-grow-[1] bg-transparent border-none active:border-none outline-none rounded-full"
          name="prompt"
          defaultValue={prompt}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          disabled={isMutating}
          placeholder="a cute pudgy penguin"
          autoCorrect="off"
          autoComplete="off"
        />
        <Button
          className="bg-black hover:bg-black active:bg-black min-w-[100px]"
          disabled={isMutating}
          type="submit"
        >
          Generate
        </Button>
      </form>
      {data && !isMutating ? (
        <Sticker
          isloading={isMutating}
          image={data?.image}
          prompt={data?.prompt}
        />
      ) : null}
    </div>
  );
};

export default StickersForm;
