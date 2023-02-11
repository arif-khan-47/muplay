import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import Link from "next/link";

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
          data && data.length > 0 && data.map((item: any, index: any) => (

            <SwiperSlide key={index}>
              <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${item.thumbnail})` }}>
                <div className='h-full w-full bg-gradient-to-t to-transparent via-transparent from-[#101010] '>
                  <div className='absolute h-full w-1/2 bg-gradient-to-r from-[#101010] via-[#101010] to-transparent'>
                  </div>
                  <div className='px-5 lg:px-10 absolute pt-[128px]'>
                    <div className='grid grid-cols-2'>
                      <div className='col-span-1 text-white'>
                        <p className='font-semibold leading-tight text-[58.24px] uppercase mb-[18.24px]'>{item.name}</p>
                        <p className='text-[18.89px] mb-[45.91px]'>{item.description.length > 220 ? item.description.substring(0, 220) + '...' : item.description}</p>
                        <div className='flex'>
                          <Link href={`/${item.type}/${item.slug}`}>
                          <button className='bg-[#FF2A00] py-[23.5px] px-[46.5px] rounded-xl mr-[17.44px]'>WATCH NOW</button>
                          </Link>
                          <button className='bg-[#1D1D1D] border py-[23.5px] px-[46.5px] rounded-xl'>FAVORITE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default Hero
