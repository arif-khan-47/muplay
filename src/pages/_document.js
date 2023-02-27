import Document, { Html, Head, Main, NextScript } from 'next/document'
import { layoutData } from '../http';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const config = await layoutData();
        initialProps.config = config.data
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js" defer />
            </Html>
        )
    }
}

export default MyDocument
