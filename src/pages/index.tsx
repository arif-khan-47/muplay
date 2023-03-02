import React, { useEffect, useState } from 'react'
import { allMovies, getAllContentEndpoint, getSections } from '../http/index'
import Hero from '../Components/Home/Hero'
import MoviesAndTrailers from '@/Components/Home/MoviesAndTrailers'
import WatchTheLatest from '@/Components/Home/WatchTheLatest'
import ReviewOfWeek from '@/Components/Home/ReviewOfWeek'
import TopTen from '@/Components/Home/TopTen'
import ToBeReleased from '@/Components/Home/ToBeReleased'
import MoviesForKids from '@/Components/Home/MoviesForKids'
import { NextPage } from "next";
import { IWhoAmI } from "./my-account";
import Genres from '@/Components/Home/Genres'
import Header from '@/Components/Shared/Header'
import { IConfigData, ISessionData } from "./_app";
import Layout from '@/Components/Layout/Layout'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import ContinueWatching from '@/Components/Cards/ContinueWatching'


interface IIndexProps {
  userSession: ISessionData;
  content: IAllContentResponse;
  continueWatching: any;
  config: IConfigData;
  whoAmi: IWhoAmI
}
const Home: NextPage<IIndexProps> = ({ userSession, content, continueWatching, config, whoAmi }): JSX.Element => {
  const [trending, setTrending] = useState([])
  const [bgHero, setBgHero] = useState('')
  const [sections, setSections] = useState<any>([]);


  async function getAllTrends() {
    try {
      const response = await allMovies();
      setBgHero(response.data.data[0].thumbnail)
      setTrending(response.data.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getAllTrends()
  }, [])






  // fetch section data
  const fetchSectionData = async () => {
    try {
      const { data, status } = await getSections()
      if (status === 200) {
        setSections(data.data);
      }
    } catch (error) { }
  }

  useEffect(() => {
    fetchSectionData();
    return () => { }
  }, [])



  return (
    <>

      <div>
        <Layout
          userSession={userSession}
          config={config?.data || false}
        >

          <div className=''>
            <Hero data={content.data} />
          </div>

          {
            continueWatching && continueWatching?.data?.length > 0 && <ContinueWatching
              title="Continue Watching"
              data={continueWatching?.data}
              userSession={userSession}
              whoAmi={whoAmi}
            />
          }
          <div className='px-5 mb-[93px]'>
            <MoviesAndTrailers data={trending} />
          </div>



          {
            sections && sections.length > 0 && sections.map((section: any, index: number) => {
              return (
          <div key={index} className='px-5 mb-[83px]'>
            <>
            <WatchTheLatest userSession={userSession} title={section.title} data={section.content} id={section._id}/>
            </>
          </div>
            )
          })}

          <div className="bg-cover bg-center h-[690px]" style={{ backgroundImage: `url(${bgHero})` }}>
            <div className='h-full w-full absolute bg-gradient-to-l to-[#101010] via-transparent from-[#101010] '></div>
            <div className='px-5 lg:px-10 pt-[70px] lg:pt-[112px]'>
              <ReviewOfWeek data={content.data} title={`Popular on ${config?.data?.name}`}/>
            </div>
          </div>

          <div className='px-5 lg:px-10 mt-[50px] lg:mt-[78px]'>
            <TopTen data={trending} />
          </div>
          <div className='px-5 lg:px-10 mt-[50px] lg:mt-[83px]'>
            <ToBeReleased data={trending} />
          </div>

          
          <div className='px-5 lg:px-10 mt-[50px] lg:mt-[98px]'>
            <MoviesForKids data={trending}/>
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

export interface IEpisodeContentResponse {
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
  content_id: {
    _id: string,
    name: string,
    slug: string,
  }
}

// all content response type
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
        content_offering_type: 'FREE' | 'PREMIUM' | 'BUY_OR_RENT',
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
    content_offering_type: 'FREE' | 'PREMIUM' | 'BUY_OR_RENT',
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

// get all content
async function getAllContent() {
  try {
    const { data, status } = await getAllContentEndpoint();
    if (status === 200) {
      return data;
    }
  } catch (error) {
    return [];
  }
}
// get continue watching
async function getContinueWatching(session: ISessionData) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/history`, {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${session?.accessToken}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
}
// whoami
async function getWhoami(session: ISessionData) {
  try {
    const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/whoami`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    });
    if (status === 200) {
      return data.data
    }
  } catch (error) {
    return null;
  }
}


export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const continueWatching = await getContinueWatching(session as any);
  const whoAmi = await getWhoami(session as any)
  if (!session) {
    const content = await getAllContent();
    return {
      props: {
        userSession: session,
        content: content,
        whoAmi: null,
        continueWatching: continueWatching,
      },
    };
  } else {
    const content = await getAllContent();
    return {
      props: {
        userSession: session,
        content: content,
        whoAmi: whoAmi,
        continueWatching: continueWatching,
      },
    };
  }
}