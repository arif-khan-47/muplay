import React from 'react'

function ProtraitBottomTitle({ name, img, duration, genres }: any) {
    return (
        <>
            <div className="bg-cover bg-center h-[264.36px] w-full rounded-xl" style={{ backgroundImage: `url(${img})` }}></div>
                <div className='mt-[15px] text-white'>
                    <p className='mb-[10px] font-semibold'>{name}</p>
                    <div className='flex'>
                    <p className='mr-[12px] text-[9.19px] my-auto'>{Math.floor(duration / 3600)}hr {Math.floor((duration % 3600) / 60)}Min</p>
                    {genres?.map((item:any , index:any) => (
                    <div className='bg-[#FF2A00]  text-[9.19px] rounded-full py-[3px] px-[12px]'>
                        {item.name}
                    </div>
                    ))}
                    </div>
                </div>
        </>
    )
}

export default ProtraitBottomTitle
