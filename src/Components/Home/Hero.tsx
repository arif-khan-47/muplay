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

function Hero({ data }: any) {
  return (
    <>
      <Swiper
        navigation={false}
        cssMode={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper">
        {
          data && data.length > 0?
          data && data.length > 0 && data.map((item: any, index: any) => (

            <SwiperSlide key={index}>
              <div className="bg-cover bg-center lg:h-[736.85px] h-[600.85px]" style={{ backgroundImage: `url(${item.thumbnail})` }}>
                <div className='h-full w-full bg-gradient-to-t to-transparent via-transparent from-[#101010] '>
                  <div className='absolute h-full lg:w-1/2 w-[100%] bg-gradient-to-r from-[#101010] lg:via-[#101010] to-transparent'>
                  </div>
                  <div className='px-5 lg:px-10 absolute lg:pt-[128px] pt-[70px]'>
                    <div className='grid grid-cols-2'>
                      <div className='lg:col-span-1 col-span-2 text-white'>
                        <p className='font-semibold leading-tight text-4xl lg:text-[58.24px] uppercase mb-[18.24px]'>{item.name}</p>
                        <p className='text-[18.89px] mb-[45.91px]'>{item.description.length > 220 ? item.description.substring(0, 220) + '...' : item.description}</p>
                        <div className='flex justify-center lg:justify-start'>
                          {/* <Link href={`/${item.type}/${item.slug}`}> */}
                          <div onClick={() => {Router.push(`/${item.type}/${item.slug}`).then(Router.reload)}}>
                          <button className='bg-[#FF2A00] py-[12px] lg:py-[23.5px] px-[23px] lg:px-[46.5px] rounded-xl mr-[17.44px]'>WATCH NOW</button>
                          </div>
                          {/* </Link> */}
                          <button className='bg-[#1D1D1D] border py-[12px] lg:py-[23.5px] px-[23px] lg:px-[46.5px] rounded-xl'>FAVORITE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
          :
          <div className="bg-cover bg-center h-screen bg-gray-800"></div>

        }
      </Swiper>
    </>
  )
}

export default Hero
