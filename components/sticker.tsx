import Image from "next/image";
import { Card, CardHeader } from "./ui/card";
import { Loader } from "./loader";
import { Fragment } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface Props {
  prompt: string;
  image: string;
  isloading: boolean;
}

function downloadBlob(blobUrl: string, filename: string) {
  let a = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export const Sticker = ({ isloading, prompt, image }: Props) => {
  async function handleDownload() {
    const toastId = toast.loading(`Downloading :${prompt}:`);

    try {
      const res = await fetch(image, {
        headers: new Headers({ Origin: location.origin }),
        mode: "cors",
      });
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      downloadBlob(blobUrl, `${prompt}.png`);
      toast.success(`Downloaded :${prompt}:`, { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error(`Failed to download :${prompt}:`, { id: toastId });
    }
  }

  return (
    <Card className="w-full min-h-[300px] flex flex-col justify-center">
      {!isloading && (
        <CardHeader className="self-end  pr-8">
          <Download
            className="w-5 h-5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardHeader>
      )}

      <div className="flex flex-col items-center">
        {isloading ? (
          <div className="w-full h-full flex items-center justify-center content-center ">
            <Loader />
          </div>
        ) : (
          <Fragment>
            <Image src={image} width={350} height={350} alt={prompt} />
            <span className="font-medium text-base py-0.5">{prompt}</span>
          </Fragment>
        )}
      </div>
    </Card>
  );
};
