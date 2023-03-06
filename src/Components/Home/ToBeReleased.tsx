import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import ToBeReleasedCard from "../Cards/ToBeRealeasedCard";
import Link from "next/link";
import Router from "next/router";

const SlidePerWebView = 3;
const LoadingWebElement: any = [];

for (let i = 0; i < SlidePerWebView; i++) {
    LoadingWebElement.push(i);
}

function ToBeReleased({ data }: any) {
    // console.log(data)
    return (
        <div>
            <div className='grid grid-cols-1 lg:mx-[55px] text-center lg:text-left'>
                <div className='col-span-1 mb-[11.1px] text-white text-[37.5px] font-bold z-10'>
                    To Be Released
                    <div className="text-[16.34px] text-[#CCCCCCE5]">Stay updated about the latest upcoming movies of this month</div>
                </div>
            </div>
            <div className="lg:relative">
                <div className="absolute inset-0 flex items-center"><svg id="trprev" className="w-[44.83px] fill-none cursor-pointer" viewBox="0 0 49 49"><circle cx="24.303" cy="24.915" r="24" fill="#CCC" fillOpacity="0.15"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M27.38 33.53l-7.384-7.385 7.384-7.384"></path></svg>
                </div>
                <div className="lg:mx-[55px]">
                    <Swiper
                        cssMode={false}
                        // pagination={true}
                        navigation={{
                            prevEl: '#trprev',
                            nextEl: '#trnext'
                        }}
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={
                            {
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                1024: {
                                    slidesPerView: SlidePerWebView,
                                    spaceBetween: 8,
                                }


                            }
                        }
                    >
                        {
                            data && data.length > 0 ?
                                data && data.length > 0 && data.map((item: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        {/* <Link href={`/${item.type}/${item.slug}`}> */}
                                        <div onClick={() => { Router.push(`/${item.type}/${item.slug}`).then(Router.reload) }}>
                                            <div className="hover:scale-105 hover:border-2 hover:border-[#FF2A00] my-10 mx-2 rounded-2xl hover:duration-200 cursor-pointer">
                                                <ToBeReleasedCard className='my-auto' name={item.name} img={item.poster} duration={item.duration} genres={item.genres} createdAt={item.createdAt} description={item.description} rating={item.rating} index={index} thumbnail={item.thumbnail} />
                                            </div>
                                        </div>
                                        {/* </Link> */}
                                    </SwiperSlide>
                                ))
                                :
                                LoadingWebElement.map((item: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className='h-[300px] w-full bg-gray-800 animate-pulse rounded-xl'></div>
                                    </SwiperSlide>
                                ))
                        }
                    </Swiper>
                </div>
                <div className="absolute inset-y-0 flex items-center right-0"><svg id="trnext" className="w-[44.83px] fill-none cursor-pointer" viewBox="0 0 49 49"> <circle cx="24" cy="24" r="24" fill="#CCC" fillOpacity="0.15" transform="matrix(-1 0 0 1 48.303 .915)"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M21.226 33.53l7.385-7.385-7.385-7.384"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default ToBeReleased
