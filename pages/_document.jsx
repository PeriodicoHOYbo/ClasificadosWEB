import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'


export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>   
                    <link rel="icon" href="h.png" />
                    <link rel='apple-touch-icon' href='/h.png' />
                    <link rel='manifest' href='/manifest.json' />
                    <meta name="theme-color" content="#007483" />
                    <meta name="msapplication-navbutton-color" content="#007483" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#007483" />
                    <meta name="description" content="Periódico HOY Bolivia" />
                    <meta name="keywords" content="Hoy, hoy bo,  hoy.bo, Periódico HOY, Periódico HOY Bolivia, hoy bolivia, periodico bolivia,
                     noticias hoy, hoy noticias, noticias bolivia, peridico noticias, peridico, noticias,
                     la razon, el deber, pagina siete, diario pagina siete, hoybolivia.com, diario bolivia" />
                    <meta name="author" content="Hoy" />
                    <title>Hoy Bolivia</title>
                    <meta name="google-adsense-account" content="ca-pub-9268005466612059" />
                </Head>

                <body>
                    <Main />
                    <NextScript />        
                </body>
            </Html>
        )
    }
}