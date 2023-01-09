import '../styles/global.css';

import { ThemeProvider } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

import { ErrorBoundary, Toaster } from '@/components';
import AuthProvider from '@/contexts/auth-context';
import { theme } from '@/styles';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};
const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <ErrorBoundary>
          <AuthProvider>
            {getLayout(
              <>
                <Toaster />
                <Component {...pageProps} />
              </>
            )}
          </AuthProvider>
        </ErrorBoundary>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default MyApp;
