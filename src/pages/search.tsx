import { getTrending } from '@/http'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { searching } from '../http/index';
import { useRouter } from 'next/router';



function Search() {
    const genre = [
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_xxaca9.png'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_1_wxsllp.png'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_2_c7ipd1.png'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_3_vgyvw4.png'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_67_gyu5h8.png'
        },
    ]

    const [trending, setTrending] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [data, setData] = useState([])
    const router = useRouter()
    // console.log(searchInput)


    // console.log(bgHero)

    async function getSearchContent() {
        // console.log('Getting all movies');
        try {
            const response = await searching(searchInput);
            console.log(response.data.data);
            setData(response.data.data)
        } catch (error) {
            // return 'Data not found';
        }

    }
    async function getAllTrends() {
        // console.log('Getting all movies');
        try {
            const response = await getTrending();
            // console.log(response)
            setTrending(response.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllTrends()
        // getSearchContent()
    }, [])

    const handleSearchInput = (event: any) => {
        getSearchContent()
        setSearchInput(event.target.value);
    };






    return (
        <>
            <div className='mt-[78px] mb-[60px]'>
                    <svg onClick={() => { router.back() }} className='absolute w-[23px] top-[101.11px] right-[5%] fill-none cursor-pointer' viewBox="0 0 23 23">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.21" d="M21.08 2.109L1.822 21.366M1.822 2.109L21.08 21.366"></path></svg>

                <div className='mx-auto w-[70%]'>
                    <div className='bg-[#202020] h-[67.02px] flex justify-between rounded-xl'>
                        <div className='h-full w-[8%] flex'>
                            <svg className='m-auto fill-none w-[25px]' viewBox="0 0 25 25"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.225" d="M10.326 19.14a8.901 8.901 0 100-17.801 8.901 8.901 0 000 17.802zM22.993 22.907l-6.162-6.163"></path>
                            </svg>
                        </div>



                        <div className='h-full w-[84%]'>
                            <input className='h-full text-[22.12px] bg-transparent focus:outline-none text-white w-full placeholder:text-[#CCCCCCB5]'
                                defaultValue={searchInput}
                                onChange={handleSearchInput}
                                placeholder='Search for a Web Shows, Movie & Genre etc' type="text" name="" id="" />
                        </div>




                        <div className='h-full w-[8%] flex'>
                            <svg className='w-[20px] h-[29px] m-auto cursor-pointer fill-none' viewBox="0 0 20 29">
                                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.381" d="M10.094 1.257A3.571 3.571 0 006.522 4.83v9.523a3.572 3.572 0 007.143 0V4.83a3.572 3.572 0 00-3.571-3.572v0z"></path>
                                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.381" d="M18.427 11.971v2.381a8.334 8.334 0 01-16.666 0v-2.38M10.094 22.686v4.761M5.332 27.447h9.524"></path>
                            </svg>
                        </div>

                    </div>



                    <div className='mt-[23.11px] grid grid-cols-5 gap-2'>
                        {
                            genre.map((item, index) => (
                                <div key={index} className='h-[68.56px] w-full relative'>
                                    <Image
                                        src={item.img}
                                        className='h-fit w-fit rounded-xl hover:border-2 hover:border-[#FF2A00] cursor-pointer'
                                        layout='fill'
                                        objectFit={'cover'}
                                        alt='digital marketing agency in andheri'
                                    />

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className='m-auto px-5 container'>
                {searchInput === '' ?
                    <>
                        <p className='text-[18.26px] text-white mb-[23px]'>Today&apos;s Top Searches</p>

                        <div className='grid grid-cols-6 gap-3'>
                            {
                                trending.map((item:any, index) => (
                                    <div key={index} className='h-[130px] w-full relative'>
                                        <Image
                                            src={item.thumbnail}
                                            className='h-fit w-fit rounded-xl hover:border-2 hover:border-[#FF2A00] cursor-pointer'
                                            layout='fill'
                                            objectFit={'cover'}
                                            alt='digital marketing agency in andheri'
                                        />

                                    </div>
                                ))
                            }
                        </div>
                    </>
                    :
                    <div className='grid grid-cols-6 gap-3'>
                        {
                            data && data.length > 0 && data.map((item:any, index) => (
                                <div key={index} className='h-[130px] w-full relative'>
                                    <Image
                                        src={item.thumbnail}
                                        className='h-fit w-fit rounded-xl hover:border-2 hover:border-[#FF2A00] cursor-pointer'
                                        layout='fill'
                                        objectFit={'cover'}
                                        alt='digital marketing agency in andheri'
                                    />

                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default Search
