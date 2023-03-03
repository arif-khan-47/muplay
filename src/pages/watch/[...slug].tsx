// import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { getSession } from "next-auth/react";
import { getAllContentEndpoint, getSections, getTrending } from "../../http";
import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/Cards/EpisodeCard";
import { IConfigData, ISessionData } from "../_app";
import { NextPage, NextPageContext } from "next";
import { IAllContentResponse, IEpisodeContentResponse } from "..";
import { useDispatch, useSelector } from "react-redux";
// import TrailersCard from "../../components/Card/Trailers";
import EpisodeCard from "../../Components/Cards/EpisodeCard";
import { useEffect, useState } from "react";
import { getContentFunc } from "../../../Redux/Slices/contentSlice";
import axios from "axios";
import { IWhoAmI } from "../my-account";
import moment from "moment";
import LandscapeSlider from "@/Components/TV/LandscapeSlider";
// import VideoPlayer from "@/Components/VideoPlayer/VideoPlayer";

interface IWatchProps {
    userSession: ISessionData;
    contentDetails: IAllContentResponse['data'][0];
    trendingMovie: any;
    slug: string;
    config: IConfigData;
    query: {
        trailer: string;
        slug: string[];
        episode: string;
    };
    episodeData: IEpisodeContentResponse;
    whoAmi: IWhoAmI;
}

const Watch: NextPage<IWatchProps> = ({ userSession, contentDetails, trendingMovie, slug, config, query, episodeData, whoAmi }) => {
    const [activeSeason, setActiveSeason] = useState<any>([]);
    const [activeSeasonNumber, setActiveSeasonNumber] = useState(1);

    // handle season change
    const handleSeasonChange = (season: any, index: number) => {
        setActiveSeason(season);
        setActiveSeasonNumber(index + 1);
        handleClose();
    }

    const [open, setOpen] = useState(false);
    const [sections, setSections] = useState<any>([]);
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




    return (
        <Layout
            userSession={userSession}
            config={config.data}
            title={`${contentDetails && contentDetails.name} - ${config.data.name}`}
            description={`${contentDetails && contentDetails.description} - ${config.data.name}`}
            keywords={`${contentDetails && contentDetails.tags?.length > 0 && contentDetails.tags?.map((tag: string) => tag)}`}
        >
            <div className="m-auto">
                {/* <VideoPlayer
                    contentData={contentDetails}
                    sourceUrl={contentDetails.source_link}
                    userSession={userSession}
                    isTrailer={query.trailer ? true : false}
                    episode={episodeData || null}
                //type="application/x-mpegURL"
                //type=""
                /> */}
                <span className='m-auto text-3xl'>
                Video Player
              </span>
                <div className="mx-5 xl:mx-10 my-5">
                    <div className="text-xl md:text-4xl font-bold text-white mb-1">
                        {contentDetails.name}
                    </div>
                    {
                        contentDetails.type === 'series' && query.episode && <>
                            <h1 className="font-bold text-white">
                                {episodeData?.name}
                            </h1>
                        </>
                    }
                    <span className="text-white opacity-80 text-xs">
                        {contentDetails.category && contentDetails.category.length > 0 && `${contentDetails.category[0]?.name || ''} `}
                    </span>
                    <span className="text-white opacity-80 text-xs">{
                        moment(contentDetails.createdAt).format('YYYY')
                    }</span>
                    <span className="text-white opacity-80 text-xs capitalize">{
                        contentDetails.language && contentDetails.language[0]?.name && ` ‧ ${contentDetails.language[0]?.name}`
                    }</span>
                    <span className="text-white opacity-80 text-xs">
                        {
                            contentDetails.u_age && ` ‧ ${contentDetails.u_age}`
                        }
                    </span>
                    {
                        contentDetails.type === 'movie' && <span className="text-white opacity-80 text-xs">
                            {/* {
                                contentDetails.duration && ` ‧ ${ConvertTime(contentDetails.duration, true)}`
                            } */}
                        </span>
                    }
                    {/* <span className="text-white opacity-80 text-xs">{contentDetails.category && contentDetails.category[0]?.name} ‧&nbsp;</span>
                    <span className="text-white opacity-80 text-xs">{contentDetails.createdAt} ‧&nbsp;</span>
                    <span className="text-white opacity-80 text-xs">{contentDetails.language && contentDetails.language[0]?.name} ‧&nbsp;</span>
                    <span className="text-white opacity-80 text-xs">{contentDetails.u_age} ‧&nbsp;</span>
                    <span className="text-white opacity-80 text-xs">{contentDetails.duration && TimeFormet(contentDetails.duration)}</span> */}
                    <h3 className="mt-1">
                        {
                            contentDetails.type === 'series' ? query.episode && <>
                                <span className="text-white opacity-80 my-2">{episodeData.description}</span>
                            </> : <span className="text-white opacity-80 my-2">{contentDetails.description}</span>
                        }
                    </h3>
                </div>
                <>
                    {/* {
                        contentDetails?.type === 'movie' && <>
                            <div className="text-white my-5">
                                {
                                    contentDetails && contentDetails.trailer_source_link && <>
                                        <TrailersCard
                                            title={"Trailers"}
                                            data={contentDetails}
                                        />
                                    </>
                                }
                            </div>
                        </>
                    } */}
                </>
                <>
                    {
                        contentDetails?.type === 'series' && <>
                            <div className="mx-auto">
                                <div className="text-white my-5 px-10 cursor-pointer"
                                // onClick={handleClickOpen}
                                >
                                    <p className="font-bold opacity-80 bg-customred rounded w-fit px-5 text-2xl py-1.5 text-[#FF2A00]">
                                        Season {activeSeasonNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="text-white mt-5">
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
                        </>
                    }
                    {
                        sections && sections.length > 0 && sections.map((section: any, index: number) => {
                            return (
                                <div key={index} className='px-5 mt-[35px] lg:mt-[70px] mb-[40px] lg:mb-[83px]'>
                                    <>
                                        {/* <WatchTheLatest userSession={userSession} title={section.title} data={section.content} id={section._id}/> */}
                                        <LandscapeSlider data={section.content} title={section.title} />
                                    </>
                                </div>
                            )
                        })}
                </>
            </div>
        </Layout>
    );
};

export default Watch;


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