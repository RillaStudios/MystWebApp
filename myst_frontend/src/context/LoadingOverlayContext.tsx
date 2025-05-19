import React, { createContext, useContext, useState} from 'react';
import { GlobalLoadingOverlay } from '../components/overlays/GlobalLoadingOverlay';

interface LoadingOverlayContextType {
  isLoading: boolean;
  showOverlay: (message?: string) => void;
  hideOverlay: () => void;
}

const LoadingOverlayContext = createContext<LoadingOverlayContextType>({
  isLoading: false,
  showOverlay: () => {},
  hideOverlay: () => {},
});

export function LoadingOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined);

  const showOverlay = (message?: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideOverlay = () => {
    setIsLoading(false);
    setLoadingMessage(undefined);
  };

  return (
    <LoadingOverlayContext.Provider value={{ isLoading, showOverlay, hideOverlay }}>
      {children}
      <GlobalLoadingOverlay visible={isLoading} message={loadingMessage} />
    </LoadingOverlayContext.Provider>
  );
}

export const useLoadingOverlay = () => useContext(LoadingOverlayContext); 