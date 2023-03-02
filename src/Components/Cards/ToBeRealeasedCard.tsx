import Image from 'next/image'
import React from 'react'

function ToBeRealeasedCard({ name, img, duration, genres, createdAt, description, rating, index, thumbnail}: any) {
    return (
        <>
        <div className="bg-cover bg-center h-[224.59px] rounded-xl" style={{ backgroundImage: `url(${thumbnail})` }}></div>
            <div className='grid grid-cols-6 bg-[#131313] py-[6px] px-[8px] rounded-xl -mt-10'>
                <div className='col-span-2'>
                    <div className='h-[148.17px] w-full relative'>
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
                        <div className='text-[17.77px] mb-[12px] mt-[13px]'>{name.length > 20 ? name.substring(0, 20) + '...' : name}</div>
                        <div className='flex gap-1 flex-wrap'>
                    {genres?.map((item: any, index: any) => (
                        <div key={index} className='bg-[#FF2A00] w-fit mb-[12px] text-[8.66px] rounded-full py-[3px] px-[10px]'>
                            {item.name}
                        </div>
                    ))}
                    
                                            </div>
                    <p className='text-[10.01px]'>{description.length > 100 ? description.substring(0, 100) + '...' : description}</p>
                </div>
            </div>
        </>
    )
}

export default ToBeRealeasedCard
