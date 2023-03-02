import React, { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { layoutData } from '@/http'
// import Logo from "../Logo/Logo";
import { signOut } from "next-auth/react";
// import "react-pro-sidebar/dist/css/styles.css";
import { useDispatch } from "react-redux";
// import { DownArrowIcon, LogOutIcon, NotificationBellIcon, SearchIcon } from "../Icons";
// import { IoMdClose } from "react-icons/io";
import { IConfigData, ISessionData } from "../../pages/_app";
import { NextPage } from "next";


interface IHeaderProps {
  userSession: ISessionData;
  config: IConfigData['data'];
}

const Header: NextPage<IHeaderProps> = ({ userSession, config }) => {
  const router = useRouter()
  const handleLogout = () => {
    signOut();
  };
  const Navtool = [
    { name: "TV", link: "/tv" },
  ]


  interface IWebSettings {
    logo: string;
    name: string;
  }

  const [data, setData] = useState([])
  const [webSettings, SetWebSettings] = useState<any | null>(null)

  async function getHeaderData() {
    try {
      const response = await layoutData();
      SetWebSettings(response.data.data)
      setData(response.data.data.webSettings.header.menu)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getHeaderData()
  }, [])

  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)


  return (
    <>
      <div className='bg-[#1D1D1D]'>
        <div className='container m-auto z-50'>
          <div className='grid grid-cols-2 lg:grid-cols-5 py-3 lg:py-0'>
            <div className='col-span-2 lg:col-span-1 flex justify-end'>
              <div className='h-[50px] w-[70%] relative my-auto mx-auto'>
                <Link href={'/'}>
                  <Image
                    src={config.logo}

                    className='h-fit w-fit'
                    layout='fill'
                    objectFit={'contain'}
                    alt={webSettings?.name}
                  />
                </Link>
              </div>
              <div className='lg:hidden z-10 mx-10 my-auto flex gap-10' onClick={() => setOpen(!open)}>
                <div className='cursor-pointer lg:hidden my-auto'> <Link href='/search'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="24"
                    fill="none"
                    viewBox="0 0 23 24"
                  >
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.24"
                      d="M10.413 20.26c4.95 0 8.962-4.117 8.962-9.197 0-5.08-4.013-9.197-8.962-9.197-4.95 0-8.962 4.118-8.962 9.197 0 5.08 4.012 9.197 8.962 9.197zM21.615 22.56l-4.873-5.001"
                    ></path>
                  </svg>
                </Link>
                </div>
                {!open ?
                  <svg
                    className="stroke-white w-14 cursor-pointer"
                    viewBox="0 0 512 512"
                  >
                    <path
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="32"
                      d="M80 160h352M80 256h352M80 352h352"
                    ></path>
                  </svg>
                  :
                  <svg
                    className="stroke-white w-14 cursor-pointer"
                    viewBox="0 0 512 512"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M368 368L144 144m224 0L144 368"
                    ></path>
                  </svg>}
              </div>
            </div>

            <div className={`${!open && 'hidden'} z-20 lg:block col-span-2 lg:col-span-3 bg-transparent mx-3 lg:mx-0 lg:my-auto`}>
              <div className="lg:flex lg:text-center gap-5 absolute lg:relative lg:bg-transparent border-b-2 lg:border-b-0 bg-[#1D1D1D] border-black left-0 right-0">
                {Navtool.map((link) => (
                  // ${router.pathname === link.link ? 'lg:border-t-4 lg:border-[#FF2A00] text-[#FF2A00] lg:text-white lg:py-[30px]' : 'lg:py-[30px]'}
                  <div key={link.name} className={`
                  my-6 lg:my-auto text-white text-base px-10 lg:px-0`}>
                    <Link href={link.link}>{link.name}</Link>
                  </div>
                ))
                }
                {
                  config.webSettings && config?.webSettings?.header?.menu?.map((link: any, index: number) => (
                    <div key={index} className={`${router.pathname === `/genres/${link.link}` ? 'lg:border-t-4 lg:border-[#FF2A00] text-[#FF2A00] lg:text-white lg:py-[30px]' : 'lg:py-[30px]'} my-6 lg:my-auto text-white text-base px-10 lg:px-0`}>
                      {/* {console.log('This is Pathname',router.pathname)} */}
                      <Link href={`/genres/${link.link}`}>{link.name}</Link>
                    </div>
                  ))
                }

                {
                  userSession ? (
                    <div className='lg:hidden'>
                      <div className="my-6 lg:my-auto text-white text-base px-10 lg:px-0">
                        <ul tabIndex={0} className={`text-white`}>

                          <Link href="/my-account">
                            <div className="flex gap-3 items-center">
                            <svg className='w-12 rounded-full fill-white' viewBox="0 0 24 24">
                          <g>
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-6a4 4 0 100 8 4 4 0 000-8zm5.111 9.997c.758.488.721 1.552.031 2.132A7.968 7.968 0 0112 20a7.967 7.967 0 01-5.114-1.848c-.697-.58-.734-1.649.028-2.14.236-.153.494-.287.774-.402C8.815 15.145 10.254 15 12 15c1.755 0 3.202.136 4.331.595.283.115.542.25.78.402z"
                              clipRule="evenodd"
                            ></path>
                          </g>
                        </svg>
                              {/* <div className="w-10 h-10 rounded relative shadow-md">
                                <Image
                                  src={"https://res.cloudinary.com/dgyudczza/image/upload/v1663232885/MD/cto_vn2nqi.jpg"}
                                  alt="Profile Picture"
                                  className="absolute object-cover rounded-full"
                                  layout="fill"
                                />
                              </div> */}
                              <div className="font-bold text-xl">
                                <span className="font-poppins font-medium">{
                                  userSession.user?.info.name || userSession.user?.info.email || userSession.user?.info.phone
                                }</span>
                              </div>
                            </div>
                          </Link>
                          <hr className="my-4" />
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-3 items-center hover:underline" onClick={handleLogout}>
                              <svg className='fill-red-500 w-10' viewBox="0 0 16 16">
                                <g>
                                  <path d="M1 8a6 6 0 018.514-5.45.75.75 0 01-.629 1.363 4.5 4.5 0 100 8.175.75.75 0 11.63 1.361A6 6 0 011 8z"></path>
                                  <path d="M11.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H6.75a.75.75 0 000 1.5h5.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.748.748 0 00-.002-1.012l-2.498-2.748a.75.75 0 00-1.06-.05z"></path>
                                </g>
                              </svg>
                              <div className="font-bold text-xl">
                                <span className="font-poppins font-medium">
                                  Logout
                                </span>
                              </div>
                            </div>
                          </div>

                        </ul>
                      </div>
                    </div>
                  )
                    :
                    <div className='lg:hidden mx-auto text-center mb-10'>
                      <Link href={'/login'}>
                        <button className='px-[43px] py-[16px] font-bold text-white uppercase text-[14.23px] rounded-xl bg-[#FF2A00]'>Login</button>
                      </Link>
                    </div>
                }
              </div>

            </div>

            <div className={`lg:col-span-1 flex justify-center gap-8 my-auto`}>
              <div className='cursor-pointer hidden lg:block my-auto'> <Link href='/search'>
                <svg className='w-[23px] h-[24px] fill-none' viewBox="0 0 23 24">
                  <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.24"
                    d="M10.413 20.26c4.95 0 8.962-4.117 8.962-9.197 0-5.08-4.013-9.197-8.962-9.197-4.95 0-8.962 4.118-8.962 9.197 0 5.08 4.012 9.197 8.962 9.197zM21.615 22.56l-4.873-5.001"
                  ></path></svg>
              </Link>
              </div>
              {
                userSession ? (
                  <div className='hidden lg:block'>
                    <div className="flex relative items-center cursor-pointer h-16">
                      <div onClick={() => setDropdown(!dropdown)} className='flex gap-2'>
                        {/* <div className="w-12 h-12 relative" tabIndex={0}>
                          <Image
                            src={"https://res.cloudinary.com/dgyudczza/image/upload/v1663232885/MD/cto_vn2nqi.jpg"}
                            alt="Profile Picture"
                            className="absolute object-cover rounded-full"
                            layout="fill"
                          />
                        </div>
                        <svg className='w-8 fill-white' viewBox="0 0 24 24">
                          {
                            dropdown ?
                              <path d="M3 19h18a1.002 1.002 0 00.823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 003 19z"></path>
                              :
                              <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z"></path>
                          }
                        </svg> */}




                        <svg className='w-12 rounded-full fill-white' viewBox="0 0 24 24">
                          <g>
                            <path
                              fillRule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-6a4 4 0 100 8 4 4 0 000-8zm5.111 9.997c.758.488.721 1.552.031 2.132A7.968 7.968 0 0112 20a7.967 7.967 0 01-5.114-1.848c-.697-.58-.734-1.649.028-2.14.236-.153.494-.287.774-.402C8.815 15.145 10.254 15 12 15c1.755 0 3.202.136 4.331.595.283.115.542.25.78.402z"
                              clipRule="evenodd"
                            ></path>
                          </g>
                        </svg>
                        {/* <svg className='w-12 rounded-full fill-white' viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"></path> </g></svg> */}
                      </div>
                      <div className="absolute z-30 top-16 right-0">
                        <ul tabIndex={0} className={`${dropdown ? '' : 'hidden'} p-4 shadow bg-white w-52 rounded`}>

                          <Link href="/">
                            <div className="flex gap-3 items-center">
                              <div className="w-10 h-10 rounded relative shadow-md">
                                <Image
                                  src={"https://res.cloudinary.com/dgyudczza/image/upload/v1663232885/MD/cto_vn2nqi.jpg"}
                                  alt="Profile Picture"
                                  className="absolute object-cover rounded-full"
                                  layout="fill"
                                />
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-poppins font-medium">{
                                  userSession.user?.info.name || userSession.user?.info.email || userSession.user?.info.phone
                                }</span>
                              </div>
                            </div>
                          </Link>
                          <hr className="my-4" />
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-3 items-center hover:underline" onClick={handleLogout}>
                              <svg className='fill-none w-10' viewBox="0 0 16 16">
                                <g fill="#000">
                                  <path d="M1 8a6 6 0 018.514-5.45.75.75 0 01-.629 1.363 4.5 4.5 0 100 8.175.75.75 0 11.63 1.361A6 6 0 011 8z"></path>
                                  <path d="M11.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H6.75a.75.75 0 000 1.5h5.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.748.748 0 00-.002-1.012l-2.498-2.748a.75.75 0 00-1.06-.05z"></path>
                                </g>
                              </svg>
                              <div className="text-sm text-gray-600">
                                <span className="font-poppins font-medium">
                                  Logout
                                </span>
                              </div>
                            </div>
                          </div>

                        </ul>
                      </div>
                    </div>
                  </div>
                ) :
                  <div className='hidden lg:block'>
                    <Link href={'/login'}>
                      <button className='px-[43px] py-[16px] font-bold text-white uppercase text-[14.23px] rounded-xl bg-[#FF2A00]'>Login</button>
                    </Link>
                  </div>
              }
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Header
