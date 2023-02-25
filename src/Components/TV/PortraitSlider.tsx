import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Router from 'next/router';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import Link from "next/link";






const SlidePerWebView = 6;
const LoadingWebElement: any = [];

for (let i = 0; i < SlidePerWebView; i++) {
    LoadingWebElement.push(i);
}

function PortraitSlider({ data, title }: any) {
    // console.log(data)
    return (
        <div className="px-10">
            <div className='text-white text-xl lg:text-[37.36px] mb-[39px] font-bold capitalize'>
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
                                    slidesPerView: 2,
                                    spaceBetween: 8,
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
                                        {/* <Link href={`/${item.type}/${item.slug}`}> */}
                                        <div onClick={() => {Router.push(`/${item.type}/${item.slug}`).then(Router.reload)}}>
                                            <div className="hover:scale-105 rounded-2xl hover:duration-200 cursor-pointer">
                                                <div className="bg-cover bg-center h-[298.07px] w-full rounded-xl" style={{ backgroundImage: `url(${item.poster})` }}></div>
                                            </div>
                                        </div>
                                        {/* </Link> */}
                                    </SwiperSlide>
                                ))
                                :
                                LoadingWebElement.map((item: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className='h-[298.07px] w-full bg-gray-800 animate-pulse rounded-xl'></div>
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

export default PortraitSlider
