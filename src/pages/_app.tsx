import { initializeDatabase } from "@/database/database";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export async function getServerSideProps() {
  initializeDatabase();
  return {
    props: {},
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}