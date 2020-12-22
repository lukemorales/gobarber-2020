import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '~/contexts/auth';
import GlobalStyle from '~/styles/global';
import * as themes from '~/styles/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themes.dark}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
