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
                <title>{title || config?.name}</title>
                <meta name="description" content={description}></meta>

            </Head>
            {
                !hideHeader && <nav> <Header />  </nav>
            }

            <main>
                {children}
            </main>

            {
                !hideFooter && <footer>
                    <Footer />
                </footer>
            }
        </>
    )
}

export default Layout