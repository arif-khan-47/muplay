import Header from '../Shared/Header'
import Footer from '../Shared/Footer'
import { NextPage } from 'next'
import Head from 'next/head'
import { IConfigData, ISessionData } from '../../pages/_app'



interface ILayoutProps {
    hideHeader?: boolean;
    hideFooter?: boolean;
    children: React.ReactNode;
    userSession: ISessionData;
    categories?: any;
    title?: string;
    description?: string;
    keywords?: string;
    config: IConfigData['data']
}

const Layout: NextPage<ILayoutProps> = ({
    hideHeader = false,
    hideFooter = false,
    children,
    userSession,
    categories,
    title,
    description,
    keywords,
    config
}) => {

    return (
        <>
            <Head>
                <title>{title || config.name}</title>
                <meta name="description" content={description || config.description} />
                <meta name="keywords" content={keywords || config.meta_keywords.map((keyword) => keyword) as any} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="theme-color" content="#141414" />
                <link rel="shortcut icon" href={config.favicon} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer', '${config.google_teg_manager}');`,
                    }}
                />
            </Head>
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.google_teg_manager}" height="0" width="0" style="display: none; visibility: hidden;" />`,
                }}
            />
            {
                !hideHeader && <nav> <Header config={config} userSession={userSession} />  </nav>
            }

            <main className='min-h-screen'>
                {children}
            </main>

            {
                !hideFooter && <footer>
                    <div className='lg:block hidden'>
                    <Footer config={config} />
                    </div>
                </footer>
            }
        </>
    )
}

export default Layout