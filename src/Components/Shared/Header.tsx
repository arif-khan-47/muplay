import React, { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { layoutData } from '@/http'

function Header() {
  const router = useRouter()
  const Navtool = [
    { name: "Home", link: "/" },
    { name: "TV", link: "/tv" },
    // { name: "Subscription", link: "/subscription" },

  ]

  type LogoState = {
    logo: string;
  };

  interface IWebSettings {
    logo: string;
    name: string;
  }

  const [data, setData] = useState([])
  // const [logo, setLogo] = useState<string | undefined>()
  const [webSettings, SetWebSettings] = useState<any | null>(null)


  // console.log(data)

  async function getHeaderData() {
      // console.log('Getting all movies');
      try {
          const response = await layoutData();
          // console.log(response.data.data.webSettings.header.menu)
          // console.log(response.data.data)

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

  return (
    <>
      <div className='bg-[#1D1D1D]'>
        <div className='container m-auto z-50'>
          <div className='grid grid-cols-2 lg:grid-cols-5 py-3 lg:py-0'>
            <div className='col-span-2 lg:col-span-1 flex justify-end'>
              <div className='h-[50px] w-[70%] relative my-auto mx-auto'>
                <Link href={'/'}>
                <Image
                  // src={'https://res.cloudinary.com/dgyudczza/image/upload/v1677216559/muplay/Muplay_cv3hsy.png'}
                  src={webSettings?.logo}

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
                  <div key={link.name} className={`${router.pathname === link.link ? 'lg:border-t-4 lg:border-[#FF2A00] text-[#FF2A00] lg:text-white lg:py-[30px]' : 'lg:py-[30px]'} my-6 lg:my-auto text-white text-base px-10 lg:px-0`}>
                    <Link href={link.link}>{link.name}</Link>
                  </div>
                ))
                }
                {data && data.length>0 && data.map((link:any, index:number) => (
                  <div key={index} className={`${router.pathname === `/genres/${link.link}`? 'lg:border-t-4 lg:border-[#FF2A00] text-[#FF2A00] lg:text-white lg:py-[30px]' : 'lg:py-[30px]'} my-6 lg:my-auto text-white text-base px-10 lg:px-0`}>
                    <Link href={`/genres/${link.link}`}>{link.name}</Link>
                  </div>
                ))
                }
                {/* {newTab.map((link) => (
                <li key={link.name} className=" font-bold my-8 lg:my-auto hover:text-primary text-2xl lg:text-lg">
                  <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
                </li>
              ))
              } */}

              <div className='lg:hidden mx-auto text-center mb-10'>
                <Link href={'/login'}>
                  <button className='px-[43px] py-[16px] font-bold text-white uppercase text-[14.23px] rounded-xl bg-[#FF2A00]'>Login</button>
                </Link>
              </div>
              </div>

            </div>

            <div className={`lg:col-span-1 flex justify-center gap-5 my-auto`}>
              <div className='cursor-pointer hidden lg:block my-auto'> <Link href='/search'>
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
              <div className='hidden lg:block'>
                <Link href={'/login'}>
                  <button className='px-[43px] py-[16px] font-bold text-white uppercase text-[14.23px] rounded-xl bg-[#FF2A00]'>Login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Header
