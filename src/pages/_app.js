import { AuthContextProvider } from "@/context/authContext";

import "@/styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Metadata from "./layout/Metadata";
import NavBar from "../components/UI/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Metadata />
      <main className={inter.className}>
        <NavBar />
        <div className="container px-5 md:px-0 md:max-w-xl xl:max-w-6xl mx-auto pt-4">
          <Component {...pageProps} />
        </div>
      </main>
    </AuthContextProvider>
  );
}
