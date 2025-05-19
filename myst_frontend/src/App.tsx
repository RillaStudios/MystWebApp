import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { appTheme } from './themes/theme';
import AppRouter from './components/router/AppRouter';
import { Notifications } from '@mantine/notifications';


function App() {

  return (
    <MantineProvider theme={appTheme} defaultColorScheme='auto'>
      <Notifications />
      <AppRouter />
    </MantineProvider>
  )
}

export default App
