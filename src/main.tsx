import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "../types.d.ts";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import UserProvider from "./utils/contexts/UserProvider.tsx";
import theme from "./utils/theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider
        theme={theme}
        toastOptions={{ defaultOptions: { position: "top-right" } }}
      >
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
