import Image from 'next/image'
import moment from "moment";
import React from 'react'

function TopTenCard({ name, img, genres, description, rating, index, content_offering_type, type }: any) {
    // console.log(genres)
    return (
        <>
            <div className='grid grid-cols-6 bg-[#131313] py-[6px] px-[8px] rounded-xl'>
                <div className='col-span-2'>
                    <div className='h-[165.3px] w-full relative'>
                        <Image
                            src={img}
                            className='h-fit w-fit rounded-xl'
                            layout='fill'
                            objectFit={'cover'}
                            alt={name}
                        />

                    </div>
                </div>
                <div className='relative col-span-4 pl-[20px] text-white'>
                    <div className='flex justify-between'>
                        <div className='text-[18.23px] mb-[8px]'>{name.length > 12 ? name.substring(0, 12) + '...' : name}</div>

                        <div>
                            <div className='flex gap-1 py-[8px] bg-[#D9D9D933] px-[10px] rounded-full'>
                                <svg className='w-[11.87px] fill-none' viewBox="0 0 16 15"><path fill="#EFC900" d="M8 0l1.796 5.528h5.813l-4.703 3.416 1.796 5.528L8 11.056l-4.702 3.416 1.796-5.528L.392 5.528h5.812L8 0z"></path></svg>
                                <p className='my-auto text-[8.89px]'>{rating}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-1'>
                        {genres?.map((item: any, index: any) => (
                            <div key={index} className='bg-[#FF2A00] w-fit mb-[8px] text-[8.72px] rounded-full py-[3px] px-[10px]'>
                                {item.name}
                            </div>
                        ))}

                    </div>
                    <p className='text-[10.24px]'>{description.length > 100 ? description.substring(0, 100) + '...' : description}</p>
                    <div className='absolute bottom-0 left-0 pl-[20px] pb-[5px]'>
                        {
                            content_offering_type === "BUY_OR_RENT" ?
                                <button className='text-[10.25px] py-[10px] border px-[21px] rounded-lg'>Rent {type}</button>
                                : null
                        }
                    </div>
                    <div className='absolute bottom-0 right-0 pr-[20px] text-[30px] lg:text-[35.49px] text-[#FF2A00]'>
                        {index + 1}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopTenCard
