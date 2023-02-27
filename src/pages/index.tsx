import React, { useEffect, useState } from 'react'
import { allMovies } from '../http/index'
import Hero from '../Components/Home/Hero'
import MoviesAndTrailers from '@/Components/Home/MoviesAndTrailers'
import WatchTheLatest from '@/Components/Home/WatchTheLatest'
import ReviewOfWeek from '@/Components/Home/ReviewOfWeek'
import TopTen from '@/Components/Home/TopTen'
import ToBeReleased from '@/Components/Home/ToBeReleased'
import MoviesForKids from '@/Components/Home/MoviesForKids'
import { NextPage } from "next";
import Genres from '@/Components/Home/Genres'
import Header from '@/Components/Shared/Header'
import { IConfigData, ISessionData } from "./_app";

import Layout from '@/Components/Layout/Layout'


interface IIndexProps {
    userSession: ISessionData;
    content: IAllContentResponse;
    continueWatching: any;
    config: IConfigData;
    // whoAmi: IWhoAmI
  }
const Home: NextPage<IIndexProps> = ({ userSession, content, continueWatching, config }): JSX.Element => {
    const [trending, setTrending] = useState([])
    const [bgHero, setBgHero] = useState('')
    const [heroContent, setHeroContent] = useState([])
    // console.log(bgHero)

    async function getAllTrends() {
        // console.log('Getting all movies');
        try {
            const response = await allMovies();
            // console.log(response.data.data)
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
        <>

            <div>
                <Layout
                      userSession={userSession}
                      config={config?.data || false}
                >

                    <div className=''>
                        <Hero data={trending} />
                    </div>

                    <div className='px-5 mb-[93px]'>
                        <MoviesAndTrailers data={trending} />
                    </div>
                    <div className='px-5 mb-[83px]'>
                        <WatchTheLatest data={trending} />
                    </div>

                    <div className="bg-cover bg-center h-[690px]" style={{ backgroundImage: `url(${bgHero})` }}>
                        <div className='h-full w-full absolute bg-gradient-to-l to-[#101010] via-transparent from-[#101010] '></div>
                        <div className='px-5 lg:px-10 pt-[70px] lg:pt-[112px]'>
                            <ReviewOfWeek data={trending} />
                        </div>
                    </div>

                    <div className='px-5 lg:px-10 mt-[50px] lg:mt-[78px]'>
                        <TopTen data={trending} />
                    </div>
                    <div className='px-5 lg:px-10 mt-[50px] lg:mt-[83px]'>
                        <ToBeReleased data={trending} />
                    </div>
                    <div className='px-5 lg:px-10 mt-[50px] lg:mt-[98px]'>
                        <MoviesForKids data={trending} />
                    </div>
                    <div className='px-5 lg:px-10 lg:mt-[95px] mt-[50px] mb-[104px]'>
                        <Genres />
                    </div>
                </Layout>
            </div>

        </>
    )
}
export default Home;
export interface IAllContentResponse {
    message: string;
    data: {
      _id: string,
      name: string,
      slug: string,
      u_age: string,
      description: string,
      duration: string,
      rating: number,
      source_link: string | null,
      source_type: 'HLS' | 'MP4' | 'LIVE_STREAM_HLS'
      trailer_source_link: string | null,
      trailer_source_type: 'HLS' | 'MP4',
      language: {
        _id: string,
        name: string,
      }[] | null,
      cast: {
        _id: string,
        name: string,
        avatar: string | null,
        type: string,
      }[] | null,
      poster: string,
      thumbnail: string,
      tags: string[],
      seasons: {
        _id: string,
        name: string,
        content_id: string,
        order: number,
        episodes: {
          _id: string,
          name: string,
          description: string,
          duration: number,
          source_link: string,
          source_type: 'HLS' | 'MP4',
          content_offering_type: 'FREE' | 'PREMIUM',
          thumbnail: string,
          createdAt: string,
          updatedAt: string,
        }[] | null,
        status: boolean,
        created_by: string,
        createdAt: string,
        updatedAt: string,
      }[] | null,
      type: 'series' | 'movie' | 'live_stream',
      content_offering_type: 'FREE' | 'PREMIUM',
      updated_by: string,
      created_by: string,
      createdAt: string,
      updatedAt: string,
      category: {
        _id: string,
        name: string,
      }[] | null,
      genres: {
        _id: string,
        name: string,
      }[] | null,
    }[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      },
      report: {
        total: number;
        totalPublic: number;
        totalPrivate: number;
      }
    } | null;
  }