import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
    const Navtool = [
        { name: "View Orders", link: "/" },
        { name: "Store Location", link: "/tv" },
        { name: "Service", link: "/search" },
        { name: "Delivery", link: "/subscription" },
        { name: "FAQ", link: "/subscription" },
    ]
    const Navtool2 = [
        { name: "About Us", link: "/" },
        { name: "Order history", link: "/tv" },
        { name: "Blog", link: "/search" },
        { name: "Our Service", link: "/subscription" },
        { name: "Contact Us", link: "/subscription" },
    ]

    return (
        <div className=' bg-[#232323]'>
            <div className='container m-auto'>
                <div className='grid grid-cols-2 lg:grid-cols-6 py-[44px] text-white px-5 lg:px-0'>
                    <div className='col-span-2'>
                        <div className='h-[50px] w-[150px] relative my-auto mb-[44.14px] mx-auto lg:mx-0'>
                            <Image
                                src={'https://res.cloudinary.com/dgyudczza/image/upload/v1677216559/muplay/Muplay_cv3hsy.png'}
                                className='h-fit w-fit'
                                layout='fill'
                                objectFit={'contain'}
                                alt={'https://res.cloudinary.com/dgyudczza/image/upload/v1677216559/muplay/Muplay_cv3hsy.png'}
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
                        <div className='mb-[32.58px] font-bold'>FIND A STORE</div>
                        {Navtool.map((link) => (
                            <div key={link.name} className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#FF2A00] text-gray-400 lg:text-[16.51px] font-extralight`}>
                                {/* <Link href={link.link}>{link.name}</Link> */}
                                {link.name}

                            </div>
                        ))
                        }
                    </div>

                    <div className='col-span-1 mt-[32px]'>
                        <div className='mb-[32.58px] font-bold uppercase'>about us</div>
                        {Navtool2.map((link) => (
                            <div key={link.name} className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#FF2A00] text-gray-400 lg:text-[16.51px] font-extralight`}>
                                {/* <Link href={link.link}>{link.name}</Link> */}
                                {link.name}

                            </div>
                        ))
                        }
                    </div>



                    <div className='col-span-2 mt-[32px]'>
                        <div className='mb-[32.58px] font-bold uppercase text-center lg:text-left'>Newsletter</div>

                        <div className={`mb-[27.52px] text-gray-400 lg:text-[16.51px] font-extralight text-center lg:text-left`}>
                            Keep in Touch by signing Up for The Latest News, Offers and Styles
                        </div>

                        <input className='mb-[29px] w-full h-[44.04px] focus:outline-none bg-[#66666633] px-[27px]' placeholder='Your email address...' type="email" name="" id="" />

                        <div className='flex lg:justify-start justify-center gap-3'>
                            <div className='w-10 fill-[#232323] bg-white hover:bg-[#FF2A00] cursor-pointer rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path>
                                </svg>
                            </div>


                            <div className='w-10 fill-[#232323] bg-white hover:bg-[#FF2A00] cursor-pointer rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path
                                        fill="#000"
                                        d="M12 7.9a4.1 4.1 0 104.1 4.1A4.09 4.09 0 0012 7.9zm0 6.77a2.67 2.67 0 110-5.34 2.67 2.67 0 010 5.34zm5.23-6.94a1 1 0 11-2 0 1 1 0 012 0zm2.71 1a4.71 4.71 0 00-1.29-3.35 4.71 4.71 0 00-3.35-1.32C14 4 10 4 8.7 4.06a4.73 4.73 0 00-3.35 1.29A4.71 4.71 0 004.06 8.7C4 10 4 14 4.06 15.3a4.71 4.71 0 001.29 3.35 4.73 4.73 0 003.35 1.29c1.32.08 5.28.08 6.6 0a4.71 4.71 0 003.35-1.29 4.71 4.71 0 001.29-3.35c.06-1.3.06-5.3 0-6.6v.03zm-1.7 8a2.7 2.7 0 01-1.52 1.52c-1.552.314-3.14.422-4.72.32a17.912 17.912 0 01-4.71-.32 2.7 2.7 0 01-1.52-1.52c-.42-1.06-.33-3.56-.33-4.72 0-1.16-.09-3.67.33-4.72a2.65 2.65 0 011.52-1.53A17.91 17.91 0 0112 5.44a18 18 0 014.72.32 2.7 2.7 0 011.52 1.52c.42 1.06.32 3.56.32 4.72 0 1.16.1 3.67-.32 4.72v.01z"
                                    ></path>
                                </svg>
                            </div>


                            <div className='w-10 fill-[#232323] bg-white hover:bg-[#FF2A00] cursor-pointer rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <path d="M11.919 24.94c-2.548 0-4.921-.747-6.919-2.032a9.049 9.049 0 006.681-1.867 4.512 4.512 0 01-4.215-3.137c.276.054.559.082.848.082.412 0 .812-.056 1.193-.156a4.519 4.519 0 01-3.622-4.425v-.059a4.478 4.478 0 002.042.564 4.507 4.507 0 01-2.008-3.758c0-.824.225-1.602.612-2.268a12.811 12.811 0 009.303 4.715 4.517 4.517 0 017.692-4.115 9.107 9.107 0 002.866-1.094 4.542 4.542 0 01-1.983 2.498 9.08 9.08 0 002.592-.71 9.283 9.283 0 01-2.252 2.337c.008.193.014.388.014.583-.001 5.962-4.542 12.843-12.844 12.842"></path>
                                </svg>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
