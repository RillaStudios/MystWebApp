import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import { appTheme } from "./themes/theme";
import AppRouter from "./components/router/AppRouter";
import { Notifications } from "@mantine/notifications";
import { CurrencyProvider } from "./context/CurrencyContext";

/* 
A React application that serves as the main entry point for the application.
It sets up the Mantine UI framework, applies a custom theme, and provides global context for currency management.

@author IFD
*/
function App() {
  return (
    <MantineProvider theme={appTheme} defaultColorScheme="auto">
      <Notifications />
      <CurrencyProvider>
        <AppRouter />
      </CurrencyProvider>
    </MantineProvider>
  );
}

export default App;
