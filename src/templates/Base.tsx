import React from "react";
import User from "./User";

interface BaseProps {
  children: React.ReactNode;
  isDev?: boolean;
}
export default function Base({ children, isDev }: BaseProps) {
  return (
    <>
      <html lang="en" className="overflow-clip">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>WAH.su</title>
          {isDev ? <script src="/static/js/hotreload.js"></script> : ""}
          <link rel="stylesheet" href="/static/css/tailwind.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Sometype+Mono&family=Ubuntu&family=Ubuntu+Mono&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <meta
            name="description"
            content="A tech non-company with a whole lot of wah—100% tech, 200% wah!"
          />
          <meta
            name="keywords"
            content="wah.su, radiquum, invite-only, hosting"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="https://home.wah.su/" />
          <meta name="twitter:title" content="WAH.su" />
          <meta
            name="twitter:description"
            content="A tech non-company with a whole lot of wah—100% tech, 200% wah!"
          />
          <meta
            name="twitter:image"
            content="https://home.wah.su/static/og/opengraph.png"
          />
          <meta property="og:title" content="WAH.su" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://home.wah.su/" />
          <meta
            property="og:image"
            content="https://home.wah.su/static/og/opengraph.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="675" />
          <meta
            property="og:description"
            content="A tech non-company with a whole lot of wah—100% tech, 200% wah!"
          />
          <script type="module" src="/static/js/oidc.js"></script>
        </head>
        <body className="bg-[#1A0F05] container mx-auto max-w-[1210px] text-white overflow-hidden">
          <div className="background-grid w-full h-screen absolute inset-0 overflow-hidden -z-50"></div>
          <div id="cursor" className="overflow-hidden -z-50 hidden md:block">
            <div
              className="background-grid w-[256px] h-[256px] rounded-full absolute overflow-hidden top-0 left-0 -z-50"
              id="cursor-sec"
            ></div>
            <div
              className="w-0 h-0 absolute overflow-hidden top-0 left-0 -z-50"
              id="cursor-prim"
            ></div>
          </div>
          <div className="overflow-y-auto overflow-x-clip h-[100dvh] mb-32 pb-8 scrollbar-hidden">
            <div>
              <User />
            </div>
            {children}
          </div>
          <script src="/static/js/cursor.js"></script>
        </body>
      </html>
    </>
  );
}
