import Document, { Head, Html, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

import App from "./_app"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      // sheet.seal();
    }
  }

  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="http://webfonts.artsy.net/artsy-icons.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="crossorigin"
          />
          <link
            rel="preload"
            href="http://webfonts.artsy.net/ll-unica77_regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="crossorigin"
          />
          <link
            rel="preload"
            href="http://webfonts.artsy.net/ll-unica77_medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="crossorigin"
          />
          <link
            rel="preload"
            href="http://webfonts.artsy.net/adobe-garamond-pro_regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="crossorigin"
          />
          <link
            rel="preload"
            href="http://webfonts.artsy.net/adobe-garamond-pro_bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="crossorigin"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
