/* eslint-disable react/jsx-no-undef */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ClientProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ClientProvider;
