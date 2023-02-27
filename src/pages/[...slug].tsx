import LandscapeSlider from '@/Components/TV/LandscapeSlider'
import PortraitSlider from '@/Components/TV/PortraitSlider'
import RectangleSlider from '@/Components/TV/RectangleSlider'
import { getSinglePageData, allMovies } from '@/http'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next';
import { IConfigData, ISessionData } from './_app'
import Layout from '@/Components/Layout/Layout'




interface ISlugPageProps {
    slug: {
        slug: string
    }
}

interface ISlugPageProps {
    userSession: ISessionData;
    trendingMovie: any;
    // query: IQuery;
    config: IConfigData;
    // whoAmi: IWhoAmI | null
}



const DetailsPage: NextPage<ISlugPageProps> = ({ userSession, config  }): JSX.Element => {

    return (
        <>
            <Layout
            userSession={userSession}
            config={config?.data}
            >
                <div className='text-white h-screen'>
                </div>
            </Layout>
        </>
    )
}

export default DetailsPage


// export async function getServerSideProps(context: NextPageContext) {
//   const slug = context.query
//   return {
//     props: {
//       slug
//     },
//   }
// }