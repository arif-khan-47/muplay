import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import LandscapeCard from "../Cards/LandscapeCard";

function LandscapeSlider({ data, title }: any) {
    // console.log(data)
  return (
    <div className="px-10">
        <div className='text-white text-[37.36px] mb-[39px] font-bold capitalize'>
        {title}
        </div>
      <div className="">
                {/* <div className="absolute inset-0 flex items-center"><svg id="wlprev" className="w-[49px] fill-none cursor-pointer" viewBox="0 0 49 49"><circle cx="24.303" cy="24.915" r="24" fill="#CCC" fillOpacity="0.15"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M27.38 33.53l-7.384-7.385 7.384-7.384"></path></svg>
                </div> */}
                <div className="">
                    <Swiper
                        cssMode={false}
                        // pagination={true}
                        // navigation={{
                        //     prevEl: '#wlprev',
                        //     nextEl: '#wlnext'
                        // }}
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
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                }


                            }
                        }
                    >
                        {
                            data.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <div className="hover:scale-105 rounded-2xl hover:duration-200 cursor-pointer">
                                        <LandscapeCard className='my-auto' name={item.name} thumbnail={item.thumbnail} duration={item.duration} genres={item.genres}/>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                {/* <div className="absolute inset-y-0 flex items-center right-0"><svg id="wlnext" className="w-[49px] fill-none cursor-pointer" viewBox="0 0 49 49"> <circle cx="24" cy="24" r="24" fill="#CCC" fillOpacity="0.15" transform="matrix(-1 0 0 1 48.303 .915)"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.462" d="M21.226 33.53l7.385-7.385-7.385-7.384"></path></svg>
                </div> */}
            </div>
    </div>
  )
}

export default LandscapeSlider