import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <App />
    </NextThemesProvider>
  </StrictMode>
);
