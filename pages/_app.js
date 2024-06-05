// pages/_app.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../app/globals.css";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
