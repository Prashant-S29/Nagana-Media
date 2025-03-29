"use client";

// tRPC
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

// hooks
import { useMounted } from "~/hooks/useMounted";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <TRPCReactProvider>
      <Toaster richColors />
      {children}
    </TRPCReactProvider>
  );
};
