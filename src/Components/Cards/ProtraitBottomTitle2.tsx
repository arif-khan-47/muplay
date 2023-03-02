import React from 'react'

function ProtraitBottomTitle({ name, img, duration, genres }: any) {
    // console.log('wdcsc', genres)
    return (
        <>
            <div className="bg-cover bg-center h-[264.36px] w-full rounded-xl" style={{ backgroundImage: `url(${img})` }}></div>
            <div className='m-[10px] text-white'>
                <p className=' font-semibold'>{name}</p>
                {/* <div className='flex my-auto'> */}

                    <p className='text-[9.19px] my-auto'>{Math.floor(duration / 3600)}hr {Math.floor((duration % 3600) / 60)}Min</p>
            </div>
        </>
    )
}

export default ProtraitBottomTitle
