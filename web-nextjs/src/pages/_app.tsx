import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/main.css";

import "keen-slider/keen-slider.min.css";
import { Session } from "next-auth";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
