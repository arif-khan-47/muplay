import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import Link from "next/link";
import Router from "next/router";


const SlidePerWebView = 4;
const LoadingWebElement:any = [];

for (let i = 0; i < SlidePerWebView; i++) {
    LoadingWebElement.push(i);
}

function LandscapeSlider({ data, title }: any) {
    // console.log(data)
    return (
        <div className="px-10">
            <div className='text-white text-xl lg:text-[37.36px] lg:mb-[35px] font-bold capitalize'>
                {title}
            </div>
            <div className="">

                <div className="">
                    <Swiper
                        cssMode={false}
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
                                    spaceBetween: 20,
                                }


                            }
                        }
                    >
                        {
                            data && data.length > 0 ?
                                data && data.length > 0 && data.map((item: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className="hover:scale-105 rounded-2xl p-2 hover:duration-200 cursor-pointer">
                                            <div onClick={() => {Router.push(`/${item.type}/${item.slug}`).then(Router.reload)}}>
                                                <div className="bg-cover bg-center h-[211px] w-full rounded-xl" style={{ backgroundImage: `url(${item.thumbnail})` }}></div>
                                            {/* </Link> */}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                                :
                                LoadingWebElement.map((item:any, index:any) => (
                                    <SwiperSlide key={index}>
                                    <div key={index} className='h-[211px] w-full bg-gray-800 animate-pulse rounded-xl'></div>
                                    </SwiperSlide>
                                ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default LandscapeSlider
