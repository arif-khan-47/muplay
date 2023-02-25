import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation, Autoplay } from "swiper";
import Image from "next/image";
import Link from "next/link";

function TvHero({ data }: any) {
    const [isFavourite, setIsFavourite] = useState(false)
    return (
        <div>
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
                    data && data.length > 0 ?
                        data && data.length > 0 && data.map((item: any, index: any) => (

                            <SwiperSlide key={index}>
                                <div className="bg-cover hidden lg:block bg-center h-[692px]" style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                    <div className="bg-black/75 h-full w-full">
                                        <div className='absolute h-full w-1/2 bg-gradient-to-r from-[#101010] via-[#101010] to-transparent'>
                                        </div>
                                        <div className='px-5 lg:px-10 absolute pt-[84px]'>
                                            <div className='grid col-span-1 lg:grid-cols-3'>
                                                <div className="hidden lg:block col-span-1 lg:order-1">
                                                    <div className='h-[491px] w-[80%] relative mx-auto'>
                                                        <Image
                                                            src={item.poster}
                                                            className='h-fit w-fit rounded-xl'
                                                            layout='fill'
                                                            objectFit={'cover'}
                                                            alt={item.slug}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='col-span-1 order-2 lg:order-2 text-white mt-[98px]'>
                                                    <p className='font-semibold leading-tight text-[40.71px] uppercase mb-[16px]'>{item.name}</p>
                                                    <div className="flex gap-2">
                                                        {item.genres?.map((item: any, index: any) => (
                                                            <div key={index} className='bg-[#1D1D1D] border-[#CCCCCCB5] border w-fit text-[9.23px] rounded-full py-[3.5px] px-[11px] mb-[42.58px]'>
                                                                {item.name}
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <p className='text-[12.07px] mb-[33px]'>{item.description.length > 300 ? item.description.substring(0, 300) + '...' : item.description}</p>



                                                    <div className='flex'>
                                                        <div className='text-white my-auto mr-[20px] text-[24.71px] font-bold'>€ 4,99</div>
                                                        <button className='bg-[#FF2A00] py-[18px] px-[30px] border text-[16.71px] rounded-lg mr-[24px] uppercase'>Rent {item.type}</button>
                                                        {/* {
                                                            isFavourite ?
                                                                <button onClick={() => setIsFavourite(!isFavourite)} className='hover:scale-110 duration-300'> <svg className="w-[55px] fill-none" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                                                                </svg></button>
                                                                :
                                                                <button onClick={() => setIsFavourite(!isFavourite)} className='hover:scale-110 duration-300'> <svg className="w-[55px] fill-white" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                                                                </svg></button>

                                                        } */}
                                                    </div>
                                                </div>
                                                <div className="col-span-1 order-1 lg:order-3 flex h-full">
                                                    <Link className="m-auto" href={`/${item.type}/${item.slug}`}>
                                                        <svg className="m-auto cursor-pointer w-[85px] fill-none" viewBox="0 0 85 85">
                                                            <circle cx="42.043" cy="42.043" r="42.043" fill="#fff" fillOpacity="0.54"></circle> <circle cx="42.043" cy="42.043" r="32.233" fill="#282827" fillOpacity="0.76"></circle>
                                                            <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.491" d="M36.126 30.831l17.44 11.212-17.44 11.212V30.83z"></path>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-cover lg:hidden bg-center h-[500px]" style={{ backgroundImage: `url(${item.poster})` }}>
                                    <div className="bg-black/75 h-full w-full">
                                        <div className='absolute h-full w-1/2 bg-gradient-to-r from-[#101010] via-[#101010] to-transparent'>
                                        </div>
                                        <div className='px-5 lg:px-10 absolute pt-[84px]'>
                                            <div className='grid col-span-1 lg:grid-cols-3'>
                                                <div className="hidden lg:block col-span-1 lg:order-1">
                                                    <div className='h-[491px] w-[80%] relative mx-auto'>
                                                        <Image
                                                            src={item.poster}
                                                            className='h-fit w-fit rounded-xl'
                                                            layout='fill'
                                                            objectFit={'cover'}
                                                            alt={item.slug}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='col-span-1 order-2 lg:order-2 text-white mt-[98px]'>
                                                    <p className='font-semibold leading-tight text-center text-xl uppercase mb-[6px]'>{item.name}</p>
                                                    <div className="flex justify-center gap-2">
                                                        {item.genres?.map((item: any, index: any) => (
                                                            <div key={index} className='bg-[#1D1D1D] border-[#CCCCCCB5] border w-fit text-[9.23px] rounded-full py-[3.5px] px-[11px] mb-[20px]'>
                                                                {item.name}
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <p className='text-[12.07px] mb-[15px]'>{item.description.length > 150 ? item.description.substring(0, 150) + '...' : item.description}</p>



                                                    <div className='flex justify-center'>
                                                        <div className='text-white my-auto mr-[20px] text-[18px] font-bold'>€ 4,99</div>
                                                        <button className='bg-[#FF2A00] py-[9px] px-[15px] border text-[16.71px] rounded-lg uppercase'>Rent {item.type}</button>
                                                        {/* {
                                                            isFavourite ?
                                                                <button onClick={() => setIsFavourite(!isFavourite)} className='hover:scale-110 duration-300'> <svg className="w-[55px] fill-none" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                                                                </svg></button>
                                                                :
                                                                <button onClick={() => setIsFavourite(!isFavourite)} className='hover:scale-110 duration-300'> <svg className="w-[55px] fill-white" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                                                                </svg></button>

                                                        } */}
                                                    </div>
                                                </div>
                                                <div className="col-span-1 order-1 lg:order-3 flex h-full">
                                                    <Link className="m-auto" href={`/${item.type}/${item.slug}`}>
                                                        <svg className="m-auto cursor-pointer w-[85px] fill-none" viewBox="0 0 85 85">
                                                            <circle cx="42.043" cy="42.043" r="42.043" fill="#fff" fillOpacity="0.54"></circle> <circle cx="42.043" cy="42.043" r="32.233" fill="#282827" fillOpacity="0.76"></circle>
                                                            <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.491" d="M36.126 30.831l17.44 11.212-17.44 11.212V30.83z"></path>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                        :
                        <div className='h-screen w-full bg-gray-800 animate-pulse'></div>
                }
            </Swiper>
        </div>
    )
}

export default TvHero
