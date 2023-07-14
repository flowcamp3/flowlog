import { AppProps } from "next/app";
import Layout from "../component/Layout";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
