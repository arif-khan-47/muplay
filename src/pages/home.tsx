import Hero from '../Components/Home/Hero'
import MoviesAndTrailers from '@/Components/Home/MoviesAndTrailers'
import WatchTheLatest from '@/Components/Home/WatchTheLatest'
import React, { useEffect, useState } from 'react'
import { getTrending } from '../http/index'
import ReviewOfWeek from '@/Components/Home/ReviewOfWeek'
import TopTen from '@/Components/Home/TopTen'
import ToBeReleased from '@/Components/Home/ToBeReleased'
import MoviesForKids from '@/Components/Home/MoviesForKids'
import Genres from '@/Components/Home/Genres'




function home() {

    const [trending, setTrending] = useState([])
    const [bgHero, setBgHero] = useState('')
    const [heroContent, setHeroContent] = useState([])
    // console.log(bgHero)

    async function getAllTrends() {
        // console.log('Getting all movies');
        try {
            const response = await getTrending();
            // console.log(response)
            setHeroContent(response.data.data[0])
            setBgHero(response.data.data[0].thumbnail)
            setTrending(response.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllTrends()
    }, [])



    return (
        <div>
            <div className=''>
                <Hero data={trending}/>
            </div>

            <div className='px-5 mb-[93px]'>
                <MoviesAndTrailers data={trending} />
            </div>
            <div className='px-5 mb-[83px]'>
                <WatchTheLatest data={trending} />
            </div>

            <div className="bg-cover bg-center h-[690px]" style={{ backgroundImage: `url(${bgHero})` }}>
                <div className='h-full w-full absolute bg-gradient-to-l to-[#101010] via-transparent from-[#101010] '></div>
                <div className='px-5 lg:px-10 pt-[112px]'>
                    <ReviewOfWeek data={trending} />
                </div>
            </div>

            <div className='px-5 lg:px-10 pt-[78px]'>
                <TopTen data={trending} />
            </div>
            <div className='px-5 lg:px-10 mt-[83px]'>
                <ToBeReleased data={trending}/>
            </div>
            <div className='px-5 lg:px-10 mt-[98px]'>
                <MoviesForKids data={trending}/>
            </div>
            <div className='px-5 lg:px-10 mt-[95px] mb-[104px]'>
                <Genres/>
            </div>

        </div>
    )
}

export default home
