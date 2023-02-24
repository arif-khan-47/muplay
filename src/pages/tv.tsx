import TvHero from '../Components/TV/TvHero'
import React, { useEffect, useState } from 'react'
import { allMovies } from '../http/index'
import PortraitSlider from '../Components/TV/PortraitSlider'
import LandscapeSlider from '../Components/TV/LandscapeSlider'
import RectangleSlider from '../Components/TV/RectangleSlider'
import Header from '@/Components/Shared/Header'


function Tv() {

    const [trending, setTrending] = useState([])

    // console.log(trending)

    async function getAllTrends() {
        // console.log('Getting all movies');
        try {
            const response = await allMovies();
            // console.log(response)

            setTrending(response.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllTrends()
    }, [])

    return (
        <>
            <div className='bg-[#1D1D1D]'>
                <Header/>
            </div>
            <div>
                <TvHero data={trending} />
            </div>
            <div className='mt-[74px]'>
                <PortraitSlider data={trending} title={'Engish Movie'} />
            </div>
            <div className='mt-[82.93px]'>
                <PortraitSlider data={trending} title={'Hindi Movies'} />
            </div>
            <div className='mt-[73px]'>
                <LandscapeSlider data={trending} title={'Bangla Movies'} />
            </div>
            <div className='mt-[85px]'>
                <PortraitSlider data={trending} title={'Malyalam Movies'} />
            </div>
            <div className='mt-[85px] mb-[88px]'>
                <RectangleSlider data={trending} title={'Korean Movies'} />
            </div>
        </>
    )
}

export default Tv
