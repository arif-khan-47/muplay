import LandscapeSlider from '@/Components/TV/LandscapeSlider'
import PortraitSlider from '@/Components/TV/PortraitSlider'
import RectangleSlider from '@/Components/TV/RectangleSlider'
import { getSinglePageData, allMovies } from '@/http'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next';
import SeasonTabs from '@/Components/Tabs/SeasonTabs'
import ReactPlayer from 'react-player'
import Layout from '@/Components/Layout/Layout'




interface ISlugPageProps {
    slug: {
        slug: string
    }
}

interface ISlugDataProps {
    slug: {
        slug: string
    }
}

const DetailsPage: NextPage<ISlugPageProps> = ({ }): JSX.Element => {

    return (
        <>
            <Layout>
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