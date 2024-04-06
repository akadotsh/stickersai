import { AuthHeader } from "@/components/auth-header";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="h-16 fixed top-0 w-full z-10 flex justify-between">
      <div className="px-8 py-2 w-full h-full flex items-center justify-between">
        <Link href="/">Stickers AI</Link>
        <AuthHeader />
      </div>
    </nav>
  );
}
