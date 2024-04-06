import { LoaderCircle as LucideLoader } from "lucide-react";

export function Loader() {
  return (
    <LucideLoader className="h-5 w-5 text-muted-foreground animate-spin duration-300" />
  );
}
