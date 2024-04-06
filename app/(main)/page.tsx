import StickersForm from "@/components/stickers-form";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-16 transition-slow ">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-center mb-28  animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
          Stickers ai
        </h1>
        <div className="w-[500px] animate-in fade-in slide-in-from-top-6 duration-1200 ease-in-out">
          <StickersForm />
        </div>
      </div>
    </main>
  );
}
