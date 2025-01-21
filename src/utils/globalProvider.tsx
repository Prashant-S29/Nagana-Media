"use client";

// tRPC
import { TRPCReactProvider } from "~/trpc/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "sonner";

// hooks
import { useMounted } from "~/hooks/useMounted";

export const GLOBAL_Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <TRPCReactProvider>
      <SessionProvider session={session}>
        <Toaster richColors />
        {children}
      </SessionProvider>
    </TRPCReactProvider>
  );
};
