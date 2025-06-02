import React, { createContext, useContext, useState } from "react";
import { GlobalLoadingOverlay } from "../components/overlays/GlobalLoadingOverlay";

// A type definition for the context value
interface LoadingOverlayContextType {
  isLoading: boolean;
  showOverlay: (message?: string) => void;
  hideOverlay: () => void;
}

// Create a context for loading overlay management
const LoadingOverlayContext = createContext<LoadingOverlayContextType>({
  isLoading: false,
  showOverlay: () => {},
  hideOverlay: () => {},
});

/* 
A React context provider for managing a global loading overlay.
This provider allows components to show or hide a loading overlay with an optional message.
It maintains the loading state and provides functions to control the visibility of the overlay.

@author IFD
*/
export function LoadingOverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(
    undefined,
  );

  /* 
  A function to show the loading overlay with an optional message.
  It sets the loading state to true and updates the loading message.

  @param {string} [message] - An optional message to display in the loading overlay.

  @author IFD
  */
  const showOverlay = (message?: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  /* 
  A function to hide the loading overlay.
  It sets the loading state to false and clears the loading message.

  @author IFD
  */
  const hideOverlay = () => {
    setIsLoading(false);
    setLoadingMessage(undefined);
  };

  return (
    <LoadingOverlayContext.Provider
      value={{ isLoading, showOverlay, hideOverlay }}
    >
      {children}
      <GlobalLoadingOverlay visible={isLoading} message={loadingMessage} />
    </LoadingOverlayContext.Provider>
  );
}

export const useLoadingOverlay = () => useContext(LoadingOverlayContext);
