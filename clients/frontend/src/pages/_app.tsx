import type { AppProps } from 'next/app';

import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import AppProvider from '~/contexts';
import GlobalStyle from '~/styles/global';
import * as themes from '~/styles/themes';

const App = ({ Component, pageProps, router }: AppProps) => (
  <ThemeProvider theme={themes.dark}>
    <AppProvider>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </AnimateSharedLayout>
      <GlobalStyle />
    </AppProvider>
  </ThemeProvider>
);

export default App;
