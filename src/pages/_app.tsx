import Head from 'next/head'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import store from "../../Redux/store"
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import NextNProgress from "nextjs-progressbar";




import type { AppProps } from 'next/app'


export interface IConfigData {
  data: {
    _id: string;
    name: string;
    description: string;
    logo: string;
    favicon: string;
    siteUrl: string;
    seo_title: string;
    meta_description: string;
    meta_keywords: string[];
    google_teg_manager: string;
    social_links: Array<{
      id: string;
      name: string;
      href: string;
      status: boolean;
      newTab: boolean;
      icon: string;
    }>;
    copy_right_text: string;
    createdAt: string;
    updatedAt: string;
    webSettings: {
      header: {
        menu: {
          name: string,
          link: string,
          type: 'category' | 'custom',
          icon: string,
          id: string
        }[],
      },
      footer: {
        menu: {
          name: string,
          link: string,
          type: 'category' | 'custom',
          icon: string,
          id: string
        }[],
      }
    },
  }
}

export interface ISessionData {
  user: {
    info: {
      id: string;
      name: string;
      phone: number;
      email: string;
      role: 'user' | 'admin';
      avatar: string | null;
      createdAt: string;
      updatedAt: string;
    }
  } | null,
  accessToken: string | null,
  refreshToken: string | null,
  accessTokenExpiry: string | null,
  expires: '2023-01-30T18:24:13.318Z' | null
}







import { layoutData } from "../http";
import { useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [interval, setInterval] = useState(0);
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}
          // Re-fetch session every 5 minutes
          refetchInterval={5 * 60}
          // Re-fetches session when window is focused
          refetchOnWindowFocus={true}
        >
          <NextNProgress
            color="#FF2A00"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow={true}
          />
          <Component {...pageProps} />

        </SessionProvider>
      </Provider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}

MyApp.getInitialProps = async () => {
  const config: IConfigData = await layoutData();
  // now pass config to pageProps
  return { pageProps: { config: config.data } }
}

export default MyApp;
