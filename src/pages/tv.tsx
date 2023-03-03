import TvHero from '../Components/TV/TvHero'
import React, { useEffect, useState } from 'react'
import { allMovies, getAllContentEndpoint } from '../http/index'
import PortraitSlider from '../Components/TV/PortraitSlider'
import LandscapeSlider from '../Components/TV/LandscapeSlider'
import RectangleSlider from '../Components/TV/RectangleSlider'
import Layout from '@/Components/Layout/Layout'
import { NextPage } from 'next'
import { IConfigData, ISessionData, } from './_app'
import { getSession } from 'next-auth/react'
import axios from 'axios'

interface IIndexProps {
  userSession: ISessionData;
  content: IAllContentResponse;
  continueWatching: any;
  config: IConfigData;
  // whoAmi: IWhoAmI
}

const Tv: NextPage<IIndexProps> = ({ userSession, content, continueWatching, config }): JSX.Element => {

  const [trending, setTrending] = useState([])


  async function getAllTrends() {
    try {
      const response = await allMovies();

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
      <Layout
        userSession={userSession}
        config={config?.data || false}
      >
        <div>
          <TvHero userSession={userSession} data={trending} />
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
      </Layout>
    </>
  )
}

export default Tv
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
    const response = await axios.get(`https://cors-anywhere-969l.onrender.com/https://api.zezosoft.com/api/history`, {
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