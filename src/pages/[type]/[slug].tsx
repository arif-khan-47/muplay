import LandscapeSlider from '@/Components/TV/LandscapeSlider'
import PortraitSlider from '@/Components/TV/PortraitSlider'
import RectangleSlider from '@/Components/TV/RectangleSlider'
import { getSinglePageData, getTrending } from '@/http'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next';
import SeasonTabs from '@/Components/Tabs/SeasonTabs'




interface ISlugPageProps {
  slug: {
    slug: string
  }
}

interface ISlugDataProps {
  slug: {
    slug: string
  }
}

const Movie: NextPage<ISlugPageProps> = ({ slug }): JSX.Element => {
  const [slugData, setslugData] = useState<any>([])
  // console.log(slugData)

  async function slugDataAllMovies(slug: string) {

    try {


      const response = await getSinglePageData(slug)
      // responseType: 'json'
      setslugData(response.data.data[0])


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    slugDataAllMovies(slug.slug)
  }, [])

  const [trending, setTrending] = useState([])
  // console.log(bgHero)

  async function getAllTrends() {
    // console.log('Getting all movies');
    try {
      const response = await getTrending();
      // console.log(response.data.data)
      setTrending(response.data.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getAllTrends()
  }, [])


  const [playButtonClicked, setPlayButtonClicked] = useState(false)

  return (
    <>
      <div className='text-white'>
        {
          playButtonClicked ?
            <div className="bg-cover bg-center h-screen bg-[#FF2A00] flex">
              <svg onClick={() => setPlayButtonClicked(false)} className='w-10 absolute m-10 stroke-white fill-white cursor-pointer' viewBox="0 0 1024 1024">
                <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"></path>
              </svg>
              <span className='m-auto text-3xl'>
                Video Player
              </span>
            </div>
            :
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${slugData.thumbnail})` }}>
              <div className='absolute h-full w-1/2 bg-gradient-to-r from-[#101010] via-[#101010] to-transparent'>
              </div>
              <div className='px-5 lg:px-10 absolute pt-[84px]'>
                <div className='grid grid-cols-3'>
                  <div className="col-span-1">
                    <div className='h-[491px] w-[80%] relative mx-auto'>
                      <Image
                        src={slugData.poster}
                        className='h-fit w-fit rounded-xl'
                        layout='fill'
                        objectFit={'cover'}
                        alt={slugData.name}
                      />

                    </div>
                  </div>
                  <div className='col-span-1 text-white mt-[98px]'>
                    <p className='font-semibold leading-tight text-[40.71px] uppercase mb-[16px]'>{slugData.name}</p>
                    {slugData.genres?.map((slugData: any, index: any) => (
                      <div key={index} className='bg-[#1D1D1D] border-[#CCCCCCB5] border w-fit text-[9.23px] rounded-full py-[3.5px] px-[11px] mb-[42.58px]'>
                        {slugData.name}
                      </div>
                    ))}
                    <p className='text-[12.07px] mb-[33px]'>
                      {slugData?.description?.length > 300 ? slugData.description.substring(0, 300) + '...' : slugData.description}
                    </p>



                    <div className='flex'>
                      <div className='text-white my-auto mr-[20px] text-[24.71px] font-bold'>€ 4,99</div>
                      <button className='bg-[#FF2A00] py-[18px] px-[30px] border text-[16.71px] rounded-lg mr-[24px] uppercase'>Rent {slugData.type}</button>
                      <button> <svg className="w-[55px] fill-none" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" fill="#282827"></circle><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.064" d="M36.64 21.203a5.676 5.676 0 00-8.029 0l-1.094 1.094-1.094-1.094a5.678 5.678 0 00-8.03 8.03l1.095 1.093 8.029 8.03 8.03-8.03 1.093-1.094a5.677 5.677 0 000-8.029v0z"></path>
                      </svg></button>
                    </div>
                  </div>
                  <div className="col-span-1 flex h-full">
                    <svg onClick={() => setPlayButtonClicked(true)} className="m-auto cursor-pointer animate-pulse hover:animate-none hover:scale-125 hover:duration-500 w-[85px] fill-none" viewBox="0 0 85 85">
                      <circle cx="42.043" cy="42.043" r="42.043" fill="#fff" fillOpacity="0.54"></circle> <circle cx="42.043" cy="42.043" r="32.233" fill="#282827" fillOpacity="0.76"></circle>
                      <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.491" d="M36.126 30.831l17.44 11.212-17.44 11.212V30.83z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>

      {
        slugData.seasons && slugData.seasons.length > 0 ?
          <div className='m-auto container'>
            <SeasonTabs data={slugData.seasons} />
          </div>
          :
          null
      }


      <div className='mt-[73px] m-auto container'>
        <LandscapeSlider data={trending} title={'Hindi Movies'} />
      </div>
      <div className='mt-[82.93px] m-auto container'>
        <PortraitSlider data={trending} title={'hindi Movies'} />
      </div>
      <div className='mt-[73px] m-auto container'>
        <LandscapeSlider data={trending} title={'Top Movies'} />
      </div>
      <div className='mt-[82.93px] m-auto container'>
        <PortraitSlider data={trending} title={'popular Movies'} />
      </div>
      <div className='mt-[85px] mb-[88px] m-auto container'>
        <RectangleSlider data={trending} title={'latest & trending'} />
      </div>
    </>
  )
}

export default Movie


export async function getServerSideProps(context: NextPageContext) {
  const slug = context.query
  return {
    props: {
      slug
    },
  }
}