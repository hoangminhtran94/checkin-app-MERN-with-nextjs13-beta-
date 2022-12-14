import React from "react";
import "../styles/globals.css";
import { wrapper } from "../store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/shared/Navigation/Layout/Layout";
import { Open_Sans } from "@next/font/google";
const openSans = Open_Sans();
function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
