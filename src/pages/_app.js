import { AuthContextProvider } from "@/context/authContext";

import "@/styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

import Metadata from "./layout/Metadata";
import NavBar from "../components/UI/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-G17T84Y9K5`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G17T84Y9K5', {
            page_path: window.location.pathname,
          });
              `,
        }}
      />
      <Metadata />
      <div id="modal" />
      <main className={inter.className}>
        <NavBar />
        <div className="container px-5 md:px-0 md:max-w-xl xl:max-w-6xl mx-auto pt-4">
          <Component {...pageProps} />
        </div>
      </main>
    </AuthContextProvider>
  );
}
