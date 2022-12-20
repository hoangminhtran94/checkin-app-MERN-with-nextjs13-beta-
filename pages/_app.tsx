import React, { useEffect } from "react";
import "../styles/globals.css";
import { wrapper } from "../store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "../components/shared/Navigation/Layout/Layout";
import { Open_Sans } from "@next/font/google";
const openSans = Open_Sans();
import { authActions, logoutAndClearLocalData } from "../store/auth";
import { loginAndSetToken } from "./../store/auth";
function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("UserData"));

    let expirationDate = null;
    if (storedData && storedData.expirationDate) {
      expirationDate = new Date(storedData.expirationDate);
    }
    console.log(storedData && storedData.token && expirationDate > new Date());
    if (storedData && storedData.token && expirationDate > new Date()) {
      store.dispatch(
        loginAndSetToken(
          storedData.currentUser,
          !!storedData.token,
          storedData.token
        )
      );
    } else {
      store.dispatch(logoutAndClearLocalData());
    }
  }, []);
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
