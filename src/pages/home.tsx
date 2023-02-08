import Hero from '@/components/Home/Hero'
import React, { useEffect, useState } from 'react'
import { getTrending } from '../http/index'




function home() {

    const [trending, setTrending] = useState([])
    const [bgHero, setBgHero] = useState('')
    const [heroContent, setHeroContent] = useState([])
    // console.log(heroContent)

    async function getAllTrends() {
        // console.log('Getting all movies');
        try {
            const response = await getTrending();
            setBgHero(response.data.data[0].thumbnail)
            setHeroContent(response.data.data[0])
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
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bgHero})` }}>
                <div className='h-full w-full bg-gradient-to-t to-transparent via-transparent from-[#000] '>
                    <div className='absolute h-full w-1/2 bg-gradient-to-r from-[#000] via-[#000] to-transparent'>
                    </div>
                    <div className='px-5 lg:px-10 absolute pt-[128px]'>
                        <Hero trending={trending} name={heroContent.name} description={heroContent.description} slug={heroContent.slug}/>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default home
