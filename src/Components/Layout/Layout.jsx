import Header from '../Shared/Header'
import Footer from '../Shared/Footer'
import Head from 'next/head'



const Layout = ({
    hideHeader = false,
    hideFooter = false,
    children,
    title = "MU Play",
    description = "If you're Looking for a Digital Marketing Agency in Andheri, You're in the right place. We offer Web Development and App Development Services."
}) => {

    return (
        <>
            <Head>
                <title>{title}</title>
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