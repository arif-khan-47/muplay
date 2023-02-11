import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import ProtraitBottomTitle from "../Cards/ProtraitBottomTitle";
import Link from "next/link";

function MoviesForKids({ data }: any) {
    console.log('checking that data',data)
    return (
        <div>
            <div className='text-white text-center text-[38px] font-bold'>
                Top 100 Movies for kids
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><svg id="wlprev" className="w-[49px] fill-none cursor-pointer" viewBox="0 0 49 49"><circle cx="24.303" cy="24.915" r="24" fill="#CCC" fillOpacity="0.15"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M27.38 33.53l-7.384-7.385 7.384-7.384"></path></svg>
                </div>
                <div className="mx-[68px]">
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
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                1024: {
                                    slidesPerView: 6,
                                    spaceBetween: 8,
                                }


                            }
                        }
                    >
                        {
                            data && data.length > 0 && data.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <Link href={`/${item.type}/${item.slug}`}>
                                        <div className="hover:scale-105 mt-[46.31px] rounded-2xl hover:duration-200 cursor-pointer">
                                            <ProtraitBottomTitle className='my-auto' name={item.name} img={item.poster} duration={item.duration} genres={item.genres} />
                                        </div>
                                    </Link>
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

export default MoviesForKids
