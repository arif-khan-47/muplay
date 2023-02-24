import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import ReviewOfWeekCard from "../Cards/ReviewOfWeekCard";
import Link from "next/link";

const SlidePerWebView = 2;
const LoadingWebElement:any = [];

for (let i = 0; i < SlidePerWebView; i++) {
    LoadingWebElement.push(i);
}




function ReviewOfWeek({ data }: any) {
    // console.log(data)
  return (
    <div>
      <div className='grid grid-cols-1 mx-5 text-center lg:text-left'>
        <div className='col-span-1 mb-[55px] text-white text-[37.5px] font-bold z-10'>
        Review of The Week
        <div className="text-base lg:text-[24.5px] lg:mt-[18px]">Congratulations <span className="text-[#FF2A00]">Diana Prince</span> You Have Been Selected As Reviewer Of The Week And Earned 6 Moviepoints!</div>
        </div>
      </div>
      <div className="">
                <div className="lg:mx-5">
                    <Swiper
                        cssMode={false}
                        pagination={false}
                        navigation={false}
                        // navigation={{
                        //     prevEl: '#rprev',
                        //     nextEl: '#rnext'
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
                                    slidesPerView: SlidePerWebView,
                                    spaceBetween: 30,
                                }


                            }
                        }
                    >
                        {
                            data && data.length>0?
                           data && data.length>0 && data.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <div className=" rounded-2xl">
                                        <ReviewOfWeekCard className='my-auto' name={item.name} img={item.poster} duration={item.duration} genres={item.genres} createdAt={item.createdAt} description={item.description} rating={item.rating} item={item}/>
                       
                                    </div>
                                </SwiperSlide>
                            ))
                            :
                            LoadingWebElement.map((item:any, index:any) => (
                                <SwiperSlide key={index}>
                                <div className='h-[300px] w-full bg-gray-800 animate-pulse rounded-xl'></div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
    </div>
  )
}

export default ReviewOfWeek
