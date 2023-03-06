import PortraitSlider from '@/Components/TV/PortraitSlider'
import { getSinglePageData, allMovies, getAllContentEndpoint, getTrending, addFavorite, getSections } from '@/http'
import { IConfigData, ISessionData } from "../_app";
import { IAllContentResponse } from '../index'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next';
import Layout from '@/Components/Layout/Layout'
import axios from 'axios';
import { getSession } from 'next-auth/react';
import EpisodeCard from '@/Components/Cards/EpisodeCard';
import { IWhoAmI } from '../my-account';
import { toast } from 'react-hot-toast';
import VideoPlayer from '@/Components/VideoPlayer/VideoPlayer';
// import Card from "../components/Card/Card";
// import { HiPlay } from "react-icons/hi";
// import TrailersCard from "../components/Card/Trailers";
import { useDispatch, useSelector } from "react-redux";
import qs from 'qs';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { RootState } from "../../../Redux/store";
import { getContentFunc } from "../../../Redux/Slices/contentSlice";
import moment from "moment";


interface IQuery {
  slug: {
      [key: string]: string;
  }
}

interface IDetailsProps {
  userSession: ISessionData;
  trendingMovie: any;
  query: IQuery;
  config: IConfigData;
  whoAmi: IWhoAmI | null
}

interface ISlugPageProps {
  trendingMovie: any;
  config: IConfigData;
  contentDetails: IAllContentResponse['data'][0];
  userSession: ISessionData;
  query: {
    trailer: string;
    slug: string[];
    episode: string;
  };
  slug: {
    slug: string
  }
  episodeData: IEpisodeContentResponse;
  whoAmi: IWhoAmI;
}

const Movie: NextPage<ISlugPageProps> = ({ slug, config, userSession, contentDetails, trendingMovie, query, episodeData, whoAmi }): JSX.Element => {
  const dispatch = useDispatch();
  const { singleContent } = useSelector((state: RootState) => state.content);
  const [activeSeason, setActiveSeason] = React.useState<any>([]);
  const [activeSeasonNumber, setActiveSeasonNumber] = React.useState(1);
  const [slugData, setslugData] = useState<any>([])
  const [sections, setSections] = useState<any>([]);
  const router = useRouter()
  
  async function handleFavorite(id: string) {
    // console.log(id)
    try {
      const res = await addFavorite({ id });

      console.log(res)
      toast.success("Added to Favorite.", {
        style: {
          border: '1px solid #FF2A00',
          padding: '16px',
          color: '#FF2A00',
          backgroundColor: '#1D1D1D'
        },
        iconTheme: {
          primary: '#FF2A00',
          secondary: '#1D1D1D',
        },
      });

    } catch (error: any) {
      // console.log(error.response.data.error.message)
      toast.success(error.response.data.error.message, {
        style: {
          border: '1px solid #FF2A00',
          padding: '16px',
          color: '#FF2A00',
          backgroundColor: '#1D1D1D'
        },
        iconTheme: {
          primary: '#FF2A00',
          secondary: '#1D1D1D',
        },
      });
    }
  }

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


  const [playButtonClicked, setPlayButtonClicked] = useState(false)



  // handle season change
  const handleSeasonChange = (season: any, index: number) => {
    setActiveSeason(season);
    setActiveSeasonNumber(index + 1);
    handleClose();
  }

  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (contentDetails.type === 'series') {
      if (!contentDetails?.seasons) return
      if (contentDetails?.seasons?.length > 0) {
        setActiveSeason(contentDetails.seasons[0])
      }
    }
  }, [contentDetails])
  // handle play 
  const handlePlayUrl = (item: IAllContentResponse['data'][0]) => {
    if (!userSession) {
        router.push('/login');
        return;
    }
    console.log(item)

    if (item.type === 'series') {
      if (item.content_offering_type === 'PREMIUM') {
          if (whoAmi?.isPremium.status) {
              if (item.seasons) {
                  if (item.seasons.length > 0) {
                      if (item.seasons[0].episodes) {
                          if (item.seasons[0].episodes.length > 0) {
                              router.push(`/watch/${item.slug}?episode=${item?.seasons[0]?.episodes[0]?._id}`)
                              return;
                          }
                      }
                  }
              }
          } else {
              router.push('/premium')
              return;
          }
      }
      if (item.content_offering_type === 'FREE') {
          if (item.seasons) {
              if (item.seasons.length > 0) {
                  if (item.seasons[0].episodes) {
                      if (item.seasons[0].episodes.length > 0) {
                          router.push(`/watch/${item.slug}?episode=${item?.seasons[0]?.episodes[0]?._id}`)
                          return;
                      }
                  }
              }
          }
      }
      router.push(`/watch/${item.slug}`)
      return;
  } else {
      if (item.content_offering_type === 'PREMIUM') {
          if (whoAmi?.isPremium.status) {
              router.push(`/watch/${item.slug}`)
              return;
          } else {
              router.push('/premium')
              return;
          }
      }
      if (item.content_offering_type === 'FREE') {
          router.push(`/watch/${item.slug}`)
          return;
      }
      router.push(`/watch/${item.slug}`)
      return;
  }
}


  return (
    <>
      <Layout
        userSession={userSession}
        config={config?.data}
        title={`${contentDetails && contentDetails.name} - ${config.data.name}`}
        description={`${contentDetails && contentDetails.description} - ${config.data.name}`}
        keywords={`${contentDetails && contentDetails.tags?.length > 0 && contentDetails.tags?.map((tag: string) => tag)}`}
      >
        <div className='text-white'>


              <div className="bg-cover bg-center h-[500px] lg:h-[690px]" style={{ backgroundImage: `url(${contentDetails.thumbnail})` }}>
                <div className="bg-black/75 h-full w-full">
                  <div className='absolute lg:h-full w-1/2 bg-gradient-to-r from-[#101010] via-[#101010] to-transparent'>
                  </div>
                  <div className='px-5 lg:px-10 absolute lg:pt-[84px]'>
                    <div className='grid lg:grid-cols-3'>
                      <div className="hidden lg:block col-span-1 lg:order-1">
                        <div className='h-[491px] w-[80%] relative mx-auto'>
                          <Image
                            src={contentDetails.poster}
                            className='h-fit w-fit rounded-xl'
                            layout='fill'
                            objectFit={'cover'}
                            alt={contentDetails.name}
                          />

                        </div>
                      </div>
                      <div className='col-span-1 text-white mt-[50px] lg:mt-[98px] lg:order-2 order-2'>
                        <p className='font-semibold leading-tight text-xl lg:text-[40.71px] uppercase mb-[8px] lg:mb-[16px]'>
                          {
                            contentDetails.type === 'series' && query.episode ?
                              episodeData?.name
                              :
                              contentDetails.name
                          }
                        </p>

                        <div className='flex gap-3'>
                          {contentDetails.genres?.map((slugData: any, index: any) => (
                            <div key={index} className='bg-[#1D1D1D] border-[#CCCCCCB5] border w-fit text-[9.23px] rounded-full py-[3.5px] px-[11px] lg:mb-[42.58px] mb-[20px]'>
                              {slugData.name}
                            </div>
                          ))}
                        </div>


                        <p className="text-[12.07px] mb-[33px]">{contentDetails.description?.length > 300 ? contentDetails.description.substring(0, 300) + '...' : contentDetails.description}</p>


                        <div className='flex lg:justify-start justify-center'>
                          {
                            contentDetails.content_offering_type === 'BUY_OR_RENT' ?
                              <button className='bg-[#FF2A00] lg:py-[18px] px-[15px] lg:px-[30px] border text-[16.71px] rounded-lg mr-3 lg:mr-[24px] uppercase'>Rent {contentDetails.type}</button>
                              :
                              <div></div>

                          }
                          {
                            userSession ?
                              <button onClick={() => handleFavorite(contentDetails._id)} className='hover:scale-110 duration-300'> <svg className="w-[55px] fill-none" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                              </svg></button>
                              :
                              <div></div>
                          }


                        </div>
                      </div>
                      {/* <div className="col-span-1 flex h-full lg:order-3 order-1 pt-[84px] lg:pt-0">
                        <svg onClick={() => setPlayButtonClicked(true)} className="m-auto cursor-pointer animate-pulse hover:animate-none hover:scale-125 hover:duration-500 w-[85px] fill-none" viewBox="0 0 85 85">
                          <circle cx="42.043" cy="42.043" r="42.043" fill="#fff" fillOpacity="0.54"></circle> <circle cx="42.043" cy="42.043" r="32.233" fill="#282827" fillOpacity="0.76"></circle>
                          <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.491" d="M36.126 30.831l17.44 11.212-17.44 11.212V30.83z"></path>
                        </svg>
                      </div> */}
                      <div className="col-span-1 flex h-full lg:order-3 order-1 pt-[84px] lg:pt-0">
                        <svg onClick={() => handlePlayUrl(contentDetails)} className="m-auto cursor-pointer animate-pulse hover:animate-none hover:scale-125 hover:duration-500 w-[85px] fill-none" viewBox="0 0 85 85">
                          <circle cx="42.043" cy="42.043" r="42.043" fill="#fff" fillOpacity="0.54"></circle> <circle cx="42.043" cy="42.043" r="32.233" fill="#282827" fillOpacity="0.76"></circle>
                          <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.491" d="M36.126 30.831l17.44 11.212-17.44 11.212V30.83z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>

        <div className='mt-[60px] mb-[70px] m-auto container'>
          {
            contentDetails?.seasons && contentDetails?.seasons?.length > 0 && <>
              <EpisodeCard
                title={"Episodes"}
                data={activeSeason.episodes}
                userSession={userSession}
                whoAmi={whoAmi}
                slug={contentDetails.slug}
                activeEpisode={query.episode}
              />
            </>
          }

        </div>

        {
          sections && sections.length > 0 && sections.map((section: any, index: number) => {
            return (
              <div key={index} className='px-5 mb-[40px] lg:mb-[83px]'>
                <>
                  {/* <WatchTheLatest userSession={userSession} title={section.title} data={section.content} id={section._id}/> */}
                  <PortraitSlider data={section.content} title={section.title} />
                </>
              </div>
            )
          })}
      </Layout>
    </>
  )
}

export default Movie


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


// get trending movies
async function getTrendingMovies() {
  try {
    const response = await getTrending();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
}

// get content by slug
async function getAllContent(slug: string) {
  try {
    const { data, status } = await getAllContentEndpoint(`slug=${slug}`);
    if (status === 200) {
      return data.data[0];
    }
  } catch (error) {
    console.log("🚀 ~ file: [...slug].tsx:89 ~ getAllContent ~ error", error)
    return null;
  }
}

// get content by episode
async function getAllContentEpisode(episode: string) {
  if (!episode) return null;
  try {
    const { data, status } = await getAllContentEndpoint(`episode_id=${episode}`);
    if (status === 200) {
      return data.data[0];
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
    console.log("🚀 ~ file: [...slug].tsx:381 ~ getWhoami ~ error", error)
    return null;
  }
}



export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const { slug, episode } = context.query;
  const trendingMovie = await getTrendingMovies();
  const contentDetails = await getAllContent(slug as string);
  const episodeData = await getAllContentEpisode(episode as string);
  const whoAmi = await getWhoami(session as any)
  if (!session) {
    if (!contentDetails) {
      return {
        notFound: true,
      }
    }
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {
        userSession: null,
        contentDetails: contentDetails,
        trendingMovie: trendingMovie,
        slug: slug,
        query: context.query,
        episodeData: episodeData,
        whoAmi: whoAmi
      },
    };
  } else {
    if (!contentDetails) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        userSession: session,
        trendingMovie: trendingMovie,
        contentDetails: contentDetails,
        slug: slug,
        query: context.query,
        episodeData: episodeData,
        whoAmi: whoAmi
      },
    };
  }
}