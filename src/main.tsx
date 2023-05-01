import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App.tsx";
import theme from "./theme";
import { UiProvider } from "./context/ui";
import "./index.css";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UiProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </UiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
