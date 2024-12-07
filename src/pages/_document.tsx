import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Remove any restrictions on embedding */}
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors *" />
        <meta httpEquiv="X-Frame-Options" content="ALLOWALL" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 