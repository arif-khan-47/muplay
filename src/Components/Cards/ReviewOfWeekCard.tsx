import Image from 'next/image'
import moment from "moment";
import React from 'react'

function ReviewOfWeekCard({ name, img, duration, genres, createdAt, description, rating }: any) {
    return (
        <>
            <div className='grid grid-cols-6 bg-[#131313] py-[20px] px-[15px] rounded-xl'>
                <div className='col-span-2'>
                    <div className='h-[280px] w-full relative'>
                        <Image
                            src={img}
                            className='h-fit w-fit rounded-xl border-2 border-[#FF2A00]'
                            layout='fill'
                            objectFit={'cover'}
                            alt='digital marketing agency in andheri'
                        />

                    </div>
                </div>
                <div className='relative col-span-4 pl-[20px] text-white'>
                    <div className='flex justify-between'>
                        <div className='text-[25px]'>{name}</div>
                        <div className='h-[78px] w-[78px] relative'>
                            <Image
                                src='https://res.cloudinary.com/dgyudczza/image/upload/v1675929391/zezo.in/17924_Converted_-01_1_cdjdtz.png'
                                className='h-fit w-fit'
                                layout='fill'
                                objectFit={'cover'}
                                alt='digital marketing agency in andheri'
                            />

                        </div>
                    </div>

                    <p className='text-[10px] text-[#CCCCCCE5]'>{moment(createdAt).format("D.MM.YY")}</p>
                    <p className='text-[10.24px]'>{description.length > 500 ? description.substring(0, 500) + '...' : description}</p>
                    <div className='absolute bottom-0 left-0 pl-[20px] pb-[5px]'>

                        <div className='text-[9.98px] py-[12.5px] border px-[28px] rounded-xl'>
                            WATCH NOW
                        </div>
                    </div>
                    <div className='absolute bottom-0 right-0 pr-[20px] pb-[5px]'>

                    <div className='flex gap-1 my-auto py-[6px] bg-[#D9D9D933] px-[20px] rounded-full'>
                        <svg className='w-[15px] fill-none' viewBox="0 0 16 15"><path fill="#EFC900" d="M8 0l1.796 5.528h5.813l-4.703 3.416 1.796 5.528L8 11.056l-4.702 3.416 1.796-5.528L.392 5.528h5.812L8 0z"></path></svg>
                       <p className='my-auto text-[15px]'>{rating}</p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewOfWeekCard
