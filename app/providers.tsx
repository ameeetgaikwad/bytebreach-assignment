// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    colors: {
      brand: {
        100: "#ffffff",
        // ...
        900: "#1a202c",
      },
    },
  });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
