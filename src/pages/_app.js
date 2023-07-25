import { AuthContextProvider } from "@/context/authContext";

import "@/styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import NavBar from "./NavBar";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <main className={inter.className}>
        <NavBar />
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  );
}
