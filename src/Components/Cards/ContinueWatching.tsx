import Image from "next/image";
import Title from "../../../tailwind/Title/Title";
import React from 'react';
var $ = require("jquery");
if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
import dynamic from "next/dynamic";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Link from "next/link";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});
import { useDispatch } from "react-redux";
import { setCurrentTrackTime } from "../../../Redux/Slices/playerSlice";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { IAllContentResponse } from "../../pages";
import { ISessionData } from "../../pages/_app";
import { IWhoAmI } from "../../pages/my-account";

interface IContinueWatchingProps {
    title: string;
    data: any;
    link?: boolean;
    userSession: ISessionData;
    whoAmi: IWhoAmI
}

const ContinueWatching: NextPage<IContinueWatchingProps> = ({
    title,
    data,
    link = false,
    userSession,
    whoAmi
}) => {
    const dispatch = useDispatch();
    const router = useRouter()
    // set currentTrackTime
    const setCurrentTrackTimeFunc = (time: number) => {
        if (time === 0) {
            dispatch(setCurrentTrackTime(false));
        } else {
            dispatch(setCurrentTrackTime(time));
        }
    }

    // handle play 
    const handlePlayUrl = (item: any) => {
        if (!userSession) {
            router.push('/login');
            return;
        }
        if (item.content.content_offering_type === 'PREMIUM') {
            if (whoAmi?.isPremium.status) {
                router.push(`/watch/${item.content.slug}`)
                return;
            } else {
                router.push('/premium')
                return;
            }
        }
        if (item.content.content_offering_type === 'FREE') {
            router.push(`/watch/${item.content.slug}`)
            return;
        }
        router.push(`/watch/${item.content.slug}`)
    }

    const responsive = {
        0: {
            items: 2,
            nav: false,
            margin: 10,
            stagePadding: 20,
        },
        600: {
            items: 3,
            nav: false,
            margin: 15,
            stagePadding: 10,
        },
        1000: {
            items: 5,
            nav: false,
            loop: false,
            margin: 25,
            stagePadding: 40,
        }
    }
    return (
        <div className="2xl:container mx-auto pt-10 w-full">
            <div>
                <Title
                    className="ml-5 xl:ml-10"
                >
                    {title}
                </Title>
                <div className="flex gap-5 pt-3 pb-5">
                    <OwlCarousel
                        responsive={responsive}
                        stagePadding={40}
                    >
                        {
                            data && data.map((item: any, index: number) => {
                                return (
                                    <div key={index} className={`relative w-full overflow-hidden item cursor-pointer rounded-xl`}
                                        onClick={() => setCurrentTrackTimeFunc(item.currentTime)}>
                                        <a
                                            onClick={() => handlePlayUrl(item)}
                                        >
                                            <Image
                                                src={item.content.thumbnail || "/images/placeholder.png"}
                                                className="object-cover absolute"
                                                width={300}
                                                height={185}
                                                alt={item.content.thumbnail}
                                            />
                                            <div className="absolute bottom-0 w-[100%] h-1.5 bg-customred" />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </OwlCarousel>
                </div>
            </div>
        </div>
    )
}

export default ContinueWatching;