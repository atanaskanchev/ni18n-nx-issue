import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../ni18n.config';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to ni18n-nx-issue!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default appWithI18Next(CustomApp, ni18nConfig);
