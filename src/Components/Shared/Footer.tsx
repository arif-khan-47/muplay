import { layoutData } from '@/http'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Footer() {

    const [data, setData] = useState<any>([])
    // console.log(data)
    const [social, setSocial] = useState<any>([])
    const [logo, setLogo] = useState<any>('')


    async function getHeaderData() {
        // console.log('Getting all movies');
        try {
            const response = await layoutData();
            setSocial(response.data.data.social_links)
            setLogo(response.data.data)
            setData(response.data.data.webSettings.footer.menu)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getHeaderData()
    }, [])


    return (
        <div className=' bg-[#232323]'>
            <div className='container m-auto'>
                <div className='grid grid-cols-2 lg:grid-cols-6 py-[44px] text-white px-5 lg:px-0'>
                    <div className='col-span-2'>
                        <div className='h-[50px] w-[150px] relative my-auto mb-[44.14px] mx-auto lg:mx-0'>
                            <Image
                                src={logo.logo}
                                className='h-fit w-fit'
                                layout='fill'
                                objectFit={'contain'}
                                alt={logo.name}
                            />

                        </div>

                        <div className='text-[16.51px] font-extralight text-gray-400 leading-loose text-center lg:text-left'>
                            Address Street 13, London, Re4d3 Pz <br />
                            (+01) 06738383838 <br />
                            (+01) 12345678910 <br />
                            muplay@gmail.com
                        </div>
                    </div>



                    <div className='col-span-1 mt-[32px]'>
                        {data && data.length > 0 && data.map((link:any, index:number) => {
                            if (index < 6) {
                                return (
                                    <div key={index} className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#FF2A00] text-gray-400 lg:text-[16.51px] font-extralight`}>
                                        <Link href={`/${link.link}`}>

                                            {link.name}

                                        </Link>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        }
                        )
                        }
                    </div>

                    <div className='col-span-1 mt-[32px]'>
                        {data && data.length > 0 && data.map((link:any, index:number) => {
                            if (index > 6) {
                                return (
                                    <div key={index} className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#FF2A00] text-gray-400 lg:text-[16.51px] font-extralight`}>
                                        <Link href={link.link}>

                                            {link.name}

                                        </Link>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        }
                        )
                        }
                    </div>



                    <div className='col-span-2 mt-[32px]'>
                        <div className='mb-[32.58px] font-bold uppercase text-center lg:text-left'>Newsletter</div>

                        <div className={`mb-[27.52px] text-gray-400 lg:text-[16.51px] font-extralight text-center lg:text-left`}>
                            Keep in Touch by signing Up for The Latest News, Offers and Styles
                        </div>

                        <input className='mb-[29px] w-full h-[44.04px] focus:outline-none bg-[#66666633] px-[27px]' placeholder='Your email address...' type="email" name="" id="" />

                        <div className='flex lg:justify-start justify-center gap-3'>

                        {
                            social?.map((social:any, index:number) => {
                                if (social.status) {
                                    return (
                                        <div key={index}>
                                            <a
                                                href={`${social.href}`}
                                                target={social.newTab ? "_blank" : "_self"}
                                                rel="noreferrer"
                                            >
                                                <img
                                                    className="w-8 h-8"
                                                    src={social.icon}
                                                    alt="" />
                                            </a>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })
                        }
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
