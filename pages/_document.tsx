import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA3k5JPBdg6gPEOEuhM2uSrnnC_pjZtE2w"
        ></script>
      </Head>
      <body>
        <Main />
        <div id="drawer-hook" />
        <div id="backdrop-hook" />
        <div id="modal-hook" />
        <NextScript />
      </body>
    </Html>
  );
}
