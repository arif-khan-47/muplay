import LandscapeSlider from '@/Components/TV/LandscapeSlider'
import PortraitSlider from '@/Components/TV/PortraitSlider'
import RectangleSlider from '@/Components/TV/RectangleSlider'
import { getSinglePageData, allMovies, getAllContentEndpoint } from '@/http'
import { IConfigData, ISessionData } from "../_app";
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next';
import SeasonTabs from '@/Components/Tabs/SeasonTabs'
import ReactPlayer from 'react-player'
import Layout from '@/Components/Layout/Layout'
import axios from 'axios';
import { getSession } from 'next-auth/react';




interface ISlugPageProps {
  slug: {
    slug: string
  }
}

interface ISlugPageProps {
  config: IConfigData;
  userSession: ISessionData;
  slug: {
    slug: string
  }
}

const Movie: NextPage<ISlugPageProps> = ({ slug, userSession, config }): JSX.Element => {
  const [slugData, setslugData] = useState<any>([])
  const [isFavourite, setIsFavourite] = useState(true)

  // console.log(slugData)

  async function slugDataAllMovies(slug: string) {

    try {


      const response = await getSinglePageData(slug)
      // responseType: 'json'
      setslugData(response.data.data[0])


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    slugDataAllMovies(slug.slug)
  }, [])

  const [trending, setTrending] = useState([])
  // console.log(bgHero)

  async function getAllTrends() {
    // console.log('Getting all movies');
    try {
      const response = await allMovies();
      // console.log(response.data.data)
      setTrending(response.data.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getAllTrends()
  }, [])


  const [playButtonClicked, setPlayButtonClicked] = useState(false)

  return (
    <>
      <Layout
      userSession={userSession}
      config={config?.data}
      >
        <div className='text-white'>
          {
            playButtonClicked ?
              <div className="bg-cover bg-center lg:h-[690px] h-[350px] flex">
                <svg onClick={() => setPlayButtonClicked(false)} className='w-5 lg:w-10 z-10 absolute m-10 stroke-white fill-white cursor-pointer' viewBox="0 0 1024 1024">
                  <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"></path>
                </svg>
                {/* <span className='m-auto text-3xl'>
                Video Player
              </span> */}
                <ReactPlayer url={slugData.source_link} controls={true} width='100%' height={'100%'} playing light />
              </div>
              :
              <div className="bg-cover bg-center h-[500px] lg:h-[690px]" style={{ backgroundImage: `url(${slugData.thumbnail})` }}>
                <div className="bg-black/75 h-full w-full">
                  <div className='absolute lg:h-full w-1/2 bg-gradient-to-r from-[#101010] via-[#101010] to-transparent'>
                  </div>
                  <div className='px-5 lg:px-10 absolute lg:pt-[84px]'>
                    <div className='grid lg:grid-cols-3'>
                      <div className="hidden lg:block col-span-1 lg:order-1">
                        <div className='h-[491px] w-[80%] relative mx-auto'>
                          <Image
                            src={slugData.poster}
                            className='h-fit w-fit rounded-xl'
                            layout='fill'
                            objectFit={'cover'}
                            alt={slugData.name}
                          />

                        </div>
                      </div>
                      <div className='col-span-1 text-white mt-[50px] lg:mt-[98px] lg:order-3 order-2'>
                        <p className='font-semibold leading-tight text-xl lg:text-[40.71px] uppercase mb-[8px] lg:mb-[16px]'>{slugData.name}</p>
                        {slugData.genres?.map((slugData: any, index: any) => (
                          <div key={index} className='bg-[#1D1D1D] border-[#CCCCCCB5] border w-fit text-[9.23px] rounded-full py-[3.5px] px-[11px] lg:mb-[42.58px] mb-[20px]'>
                            {slugData.name}
                          </div>
                        ))}
                        <p className='text-[12.07px] mb-[33px]'>
                          {slugData?.description?.length > 300 ? slugData.description.substring(0, 300) + '...' : slugData.description}
                        </p>



                        <div className='flex lg:justify-start justify-center'>
                          {/* <div className='text-white my-auto mr-[20px] text-lg lg:text-[24.71px] font-bold'>€ 4,99</div> */}
                          <button className='bg-[#FF2A00] lg:py-[18px] px-[15px] lg:px-[30px] border text-[16.71px] rounded-lg mr-3 lg:mr-[24px] uppercase'>Rent {slugData.type}</button>
                          {
                            isFavourite?
                            <button onClick={()=>setIsFavourite(!isFavourite)} className='hover:scale-110 duration-300'> <svg className="w-[55px] fill-none" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                            </svg></button>
                            :
                            <button onClick={()=>setIsFavourite(!isFavourite)} className='hover:scale-110 duration-300'> <svg className="w-[55px] fill-white" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                            </svg></button>

                          }
                         
                        </div>
                      </div>
                      <div className="col-span-1 flex h-full lg:order-3 order-1 pt-[84px] lg:pt-0">
                        <svg onClick={() => setPlayButtonClicked(true)} className="m-auto cursor-pointer animate-pulse hover:animate-none hover:scale-125 hover:duration-500 w-[85px] fill-none" viewBox="0 0 85 85">
                          <circle cx="42.043" cy="42.043" r="42.043" fill="#fff" fillOpacity="0.54"></circle> <circle cx="42.043" cy="42.043" r="32.233" fill="#282827" fillOpacity="0.76"></circle>
                          <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.491" d="M36.126 30.831l17.44 11.212-17.44 11.212V30.83z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>

        {
          slugData.seasons && slugData.seasons.length > 0 ?
            <div className='m-auto container'>
              <SeasonTabs data={slugData.seasons} />
            </div>
            :
            null
        }


        <div className='mt-[73px] m-auto container'>
          <LandscapeSlider data={trending} title={'Hindi Movies'} />
        </div>
        <div className='mt-[82.93px] m-auto container'>
          <PortraitSlider data={trending} title={'hindi Movies'} />
        </div>
        <div className='mt-[73px] m-auto container'>
          <LandscapeSlider data={trending} title={'Top Movies'} />
        </div>
        <div className='mt-[82.93px] m-auto container'>
          <PortraitSlider data={trending} title={'popular Movies'} />
        </div>
        <div className='mt-[85px] mb-[88px] m-auto container'>
          <RectangleSlider data={trending} title={'latest & trending'} />
        </div>
      </Layout>
    </>
  )
}

export default Movie


// export async function getServerSideProps(context: NextPageContext) {
//   const slug = context.query
//   return {
//     props: {
//       slug
//     },
//   }
// }


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
  const slug = context.query
  const session = await getSession(context);
  const continueWatching = await getContinueWatching(session as any);
  const whoAmi = await getWhoami(session as any)
  if (!session) {
    const content = await getAllContent();
    return {
      props: {
        userSession: session,
      slug,
        content: content,
        whoAmi: null,
        continueWatching: continueWatching,
      },
    };
  } else {
    const content = await getAllContent();
    return {
      props: {
      slug,
        userSession: session,
        content: content,
        whoAmi: whoAmi,
        continueWatching: continueWatching,
      },
    };
  }
}