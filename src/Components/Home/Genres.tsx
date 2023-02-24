import Image from 'next/image'
import React from 'react'

const data = [
    {
        img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1675944489/muplay/Group_82_vvxy2q.png'
    },
    {
        img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1675944609/muplay/Group_82_tfjqqz.png'
    },
    {
        img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1675944707/muplay/Group_82_rswrhg.png'
    },
    {
        img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1675944946/muplay/Group_82_rkq0t8.png'
    },
    {
        img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1675945012/muplay/Group_82_zjg1bb.png'
    },
    {
        img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1675945170/muplay/Group_82_sk4gw3.png'
    },
]


function Genres() {
    return (
        <div className=''>
            <div className='text-center text-white'>
                <p className='text-[47.84px] font-bold mb-[10px]'>Genres</p>
                <p className='text-[18.18px] mb-[61px]'>We have addeed 10 new movies to Animation</p>
            </div>

            <div className='grid lg:grid-cols-6 grid-cols-2'>
                {
                    data.map((item, index) => (
                        <div className='col-span-1' key={index}>
                            <div className='lg:h-[212.93px] h-[150px] w-[94%] mb-2 lg:mb-0 relative mx-auto cursor-pointer'>
                                <Image
                                    src={item.img}
                                    className='h-fit w-fit rounded-xl hover:border-2 hover:border-[#FF2A00]'
                                    layout='fill'
                                    objectFit={'cover'}
                                    alt='digital marketing agency in andheri'
                                />

                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Genres
