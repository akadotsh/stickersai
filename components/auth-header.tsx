import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Fragment } from "react";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Loader } from "./loader";

export const AuthHeader = () => {
  return (
    <Fragment>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
            <Button size={"icon"} variant={"ghost"}>
              <User />
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </Fragment>
  );
};
