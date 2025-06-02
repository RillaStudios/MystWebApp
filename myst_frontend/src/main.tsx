import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

/* 
The main entry point for the React application.

This file initializes the application by rendering the App component within a HelmetProvider for managing document head tags.

@author IFD
*/
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </HelmetProvider>,
);
