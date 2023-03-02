import React from 'react'

function LandscapeWithTitle({ name, thumbnail, duration, genres }: any) {
    return (
        <>
            <div className="bg-cover bg-center h-[184px] w-full rounded-xl" style={{ backgroundImage: `url(${thumbnail})` }}>
                <div className=' bg-[rgba(0,0,0,0.5)] h-full w-full rounded-xl'>
                    <div className='bottom-[11px] absolute left-[20px] text-white'>
                        <p className='mb-[10px] font-semibold'>{name}</p>
                        <div className='grid grid-cols-5'>
                            <div className='text-[10px] my-auto mr-[10px] col-span-1'>{Math.floor(duration / 3600)}hr {Math.floor((duration % 3600) / 60)}Min</div>
                            <div className='col-span-4'>
                                <div className='flex h-fit  flex-wrap gap-1'>
                                    {genres?.slice(0,3).map((item: any, index: any) => (
                                        <div key={index} className='bg-[#FF2A00] text-[10px] rounded-full py-[3px] px-[12px]'>
                                            {item.name}
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LandscapeWithTitle
