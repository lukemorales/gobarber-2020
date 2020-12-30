import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';

import AppProvider from '~/contexts';
import GlobalStyle from '~/styles/global';
import * as themes from '~/styles/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themes.dark}>
      <AppProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  );
}
