import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import TopTenCard from "../Cards/TopTenCard";
import Link from "next/link";
import Router from "next/router";

function TopTen({ data }: any) {
    return (
        <div>
            <div className='grid grid-cols-1 lg:mx-[55px] text-center lg:text-left'>
                <div className='col-span-1 mb-[11.1px] text-white text-[37.5px] font-bold z-10'>
                    Top 10 Movies
                    <div className="text-[16.34px] text-[#CCCCCCE5]">Watch the top 10 movies ot this month</div>
                </div>
            </div>
            <div className="lg:relative">
                <div className="absolute inset-0 flex items-center"><svg id="ttprev" className="w-[44.83px] fill-none cursor-pointer" viewBox="0 0 49 49"><circle cx="24.303" cy="24.915" r="24" fill="#CCC" fillOpacity="0.15"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M27.38 33.53l-7.384-7.385 7.384-7.384"></path></svg>
                </div>
                <div className="lg:mx-[55px]">
                    <Swiper
                        cssMode={false}
                        // pagination={true}
                        navigation={{
                            prevEl: '#ttprev',
                            nextEl: '#ttnext'
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
                                    slidesPerView: 3,
                                    spaceBetween: 0,
                                }


                            }
                        }
                    >
                        {
                            data && data.length > 0 && data.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    {/* <Link href={`/${item.type}/${item.slug}`}> */}
                                    <div onClick={() => {Router.push(`/${item.type}/${item.slug}`).then(Router.reload)}}>
                                        <div className="hover:scale-105 hover:border-2 hover:border-[#FF2A00] my-10 mx-2 rounded-2xl hover:duration-200 cursor-pointer">
                                            <TopTenCard className='my-auto' name={item.name} img={item.poster} duration={item.duration} genres={item.genres} createdAt={item.createdAt} description={item.description} rating={item.rating} index={index} content_offering_type={item.content_offering_type} type={item.type}/>
                                        </div>
                                    {/* </Link> */}
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className="absolute inset-y-0 flex items-center right-0"><svg id="ttnext" className="w-[44.83px] fill-none cursor-pointer" viewBox="0 0 49 49"> <circle cx="24" cy="24" r="24" fill="#CCC" fillOpacity="0.15" transform="matrix(-1 0 0 1 48.303 .915)"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M21.226 33.53l7.385-7.385-7.385-7.384"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default TopTen
