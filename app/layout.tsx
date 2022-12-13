import Head from "./head";
import React from "react";
import { Open_Sans } from "@next/font/google";

import ReduxProvider from "./redux-provider";
import Layout from "../components/shared/Navigation/Layout/Layout";
const openSans = Open_Sans();
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={openSans.className} lang="en">
      <head>
        <Head />
      </head>
      <body>
        <ReduxProvider>
          <Layout> {children}</Layout>
          <div id="drawer-hook" />
          <div id="backdrop-hook" />
          <div id="modal-hook" />
        </ReduxProvider>
      </body>
    </html>
  );
}
