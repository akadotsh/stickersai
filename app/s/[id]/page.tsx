import StickersForm from "@/components/stickers-form";

interface Props {
  params: {
    id: string;
  };
}

export default async function Sticker({ params }: Props) {
  console.log("params", params.id);
  // TODO get sticker by id
  return (
    <div className="mx-auto pt-20 flex flex-col items-center justify-center">
      <div className="w-[500px] animate-in fade-in slide-in-from-top-6 duration-1200 ease-in-out">
        <StickersForm prompt="cute cat" />
      </div>
    </div>
  );
}
