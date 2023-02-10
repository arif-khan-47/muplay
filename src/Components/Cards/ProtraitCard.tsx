import React from 'react'

function ProtraitCard({ name, img, duration, genres }: any) {
    return (
        <>
            <div className="bg-cover bg-center h-[298.07px] w-full rounded-xl" style={{ backgroundImage: `url(${img})` }}></div>
                <div className='mt-[15px] text-white'>
                </div>
        </>
    )
}

export default ProtraitCard
