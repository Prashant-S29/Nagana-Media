"use client";

// tRPC
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

// provider
import { PostHogProvider } from "./postHogProvider";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PostHogProvider>
      <TRPCReactProvider>
        <Toaster richColors />
        {children}
      </TRPCReactProvider>
    </PostHogProvider>
  );
};
