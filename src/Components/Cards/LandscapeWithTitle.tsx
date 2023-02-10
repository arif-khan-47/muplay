import React from 'react'

function LandscapeWithTitle({ name, thumbnail, duration, genres }: any) {
    return (
        <>
            <div className="bg-cover bg-center h-[184px] w-full rounded-xl" style={{ backgroundImage: `url(${thumbnail})` }}>
                <div className='bottom-[11px] absolute left-[20px] text-white'>
                    <p className='mb-[10px] font-semibold'>{name}</p>
                    <div className='flex'>
                    <p className='mr-[12px]'>{Math.floor(duration / 3600)}hr {Math.floor((duration % 3600) / 60)}Min</p>
                    {genres?.map((item:any , index:any) => (
                    <div key={index} className='bg-[#FF2A00] rounded-full py-[3px] px-[12px]'>
                        {item.name}
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandscapeWithTitle
