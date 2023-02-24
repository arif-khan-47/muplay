import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

function Header() {
  const router = useRouter()
  const Navtool = [
    { name: "Home", link: "/" },
    { name: "TV", link: "/tv" },
    { name: "Search", link: "/search" },
    { name: "Subscription", link: "/subscription" },

  ]
  const newTab = [
    // { name: "Trons Scan", link: "/" },
    // { name: "Whitepaper", link: "/" },
    // { name: "Certificate", link: "/img/CERTIFICATE.pdf" },
  ]

  const [open, setOpen] = useState(false)

  return (
    <>
    <div className='bg-[#1D1D1D]'>
      <div className='container m-auto z-50'>
        <div className='grid grid-cols-2 lg:grid-cols-5 pt-3 lg:pt-0'>
          <div className='col-span-2 lg:col-span-1 flex justify-end'>
            <div className='h-[50px] w-[100%] relative my-auto'>
              <Image
                src={'https://res.cloudinary.com/dgyudczza/image/upload/v1677216559/muplay/Muplay_cv3hsy.png'}
                className='h-fit w-fit'
                layout='fill'
                objectFit={'contain'}
                alt={'https://res.cloudinary.com/dgyudczza/image/upload/v1677216559/muplay/Muplay_cv3hsy.png'}
              />

            </div>
            <div className='lg:hidden z-10 mx-10 my-auto' onClick={() => setOpen(!open)}>
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
            <ul className="lg:flex text-center lg:mx-10 gap-9 absolute lg:relative lg:bg-transparent border-b-2 lg:border-b-0 bg-white border-black left-0 right-0">
              {Navtool.map((link) => (
                <li key={link.name} className={`${router.pathname === link.link ? 'border-t-4 border-[#FF2A00] py-3 lg:py-[30px]' : ''} my-6 lg:my-auto text-white text-2xl lg:text-lg`}>
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))
              }
              {/* {newTab.map((link) => (
                <li key={link.name} className=" font-bold my-8 lg:my-auto hover:text-primary text-2xl lg:text-lg">
                  <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
                </li>
              ))
              } */}

            </ul>

          </div>

          <div className='col-span-1 flex justify-center gap-5 my-auto'>
            <div className='cursor-pointer my-auto'> <Link href='/search'>
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
            <div>
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
