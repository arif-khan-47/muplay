import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import ProtraitBottomTitle2 from "../Cards/ProtraitBottomTitle2";
import Link from "next/link";
import Router from "next/router";

function WatchTheLatest({ data, title, userSession, id }: any) {
    return (
        <div>
            <div className='grid lg:grid-cols-2 grid-cols-2 lg:mx-5'>
                <div className='col-span-1 text-white text-xl my-auto lg:text-[37.5px]'>
                    <div className="my-auto">
                    {title}
                    </div>
                </div>
                <div className='col-span-1 my-auto'>
                    <div className='flex lg:justify-end justify-center text-white'>
                        {
                            userSession ? null :
                                <Link href={'/login'}>
                                    <button className='border lg:px-[48px] text-xs lg:text-base px-[16px] lg:py-[18px] py-[9px] bg-[#1D1D1D] rounded-xl mr-[13.12px]'>
                                        JOIN NOW
                                    </button>
                                </Link>
                        }
                        <Link href={`/catagories/${id}`}>
                            <button className='border lg:px-[48px] px-[16px] text-xs lg:text-base lg:py-[18px] py-[9px] bg-[#1D1D1D] rounded-xl'>
                                VIEW ALL
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
            <div className="lg:relative">
                <div className="absolute inset-0 flex items-center"><svg id="wlprev" className="w-[49px] fill-none cursor-pointer" viewBox="0 0 49 49"><circle cx="24.303" cy="24.915" r="24" fill="#CCC" fillOpacity="0.15"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M27.38 33.53l-7.384-7.385 7.384-7.384"></path></svg>
                </div>
                <div className="lg:mx-[68px]">
                    <Swiper
                        cssMode={false}
                        // pagination={true}
                        navigation={{
                            prevEl: '#wlprev',
                            nextEl: '#wlnext'
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
                                    slidesPerView: 2,
                                    spaceBetween: 8,
                                },
                                1024: {
                                    slidesPerView: 6,
                                    spaceBetween: 8,
                                }


                            }
                        }
                    >
                        {
                            data.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    {/* <Link href={`/${item.type}/${item.slug}`}> */}
                                    <div onClick={() => { Router.push(`/${item.type}/${item.slug}`).then(Router.reload) }}>
                                        <div className="hover:scale-105 mt-[46.31px] rounded-2xl hover:duration-200 cursor-pointer">
                                            <ProtraitBottomTitle2 className='my-auto' name={item.name} img={item.poster} duration={item.duration} genres={item.genres} />
                                        </div>
                                    </div>
                                    {/* </Link> */}
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className="absolute inset-y-0 flex items-center right-0"><svg id="wlnext" className="w-[49px] fill-none cursor-pointer" viewBox="0 0 49 49"> <circle cx="24" cy="24" r="24" fill="#CCC" fillOpacity="0.15" transform="matrix(-1 0 0 1 48.303 .915)"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M21.226 33.53l7.385-7.385-7.385-7.384"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default WatchTheLatest
