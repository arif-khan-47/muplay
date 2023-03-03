import React from "react";
import Link from "next/link";
import Image from "next/image";
import Title from "../../../tailwind/Title/Title";
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
import dynamic from "next/dynamic";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import { useRouter } from "next/router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { IAllContentResponse, IEpisodeContentResponse } from "../../pages";
import { ISessionData } from "../../pages/_app";
import { IWhoAmI } from "../../pages/my-account";

interface IEpisodeCardProps {
  title: string;
  userSession: ISessionData
  whoAmi: IWhoAmI | null
  data: IEpisodeContentResponse[];
  link?: boolean
  slug: string
  activeEpisode?: string
}


const EpisodeCard = ({ title, data, link, userSession, whoAmi, slug, activeEpisode }: IEpisodeCardProps): JSX.Element => {
  const router = useRouter();

  // handle play 
  const handlePlayUrl = (item: IEpisodeContentResponse, slug: string) => {
    if (!userSession) {
      router.push('/login');
      return;
    }
    if (item.content_offering_type === 'PREMIUM') {
      if (whoAmi?.isPremium.status) {
        router.push(`/watch/${slug}?episode=${item._id}`).then(() => router.reload())
        return;
      } else {
        router.push('/premium')
        return;
      }
    } else {
      router.push(`/watch/${slug}?episode=${item._id}`).then(() => router.reload())
    }
  }


  const responsive = {
    0: {
      items: 3,
      nav: false,
      dots: false,
      margin: 10,
      stagePadding: 20,
    },
    600: {
      items: 5,
      nav: false,
      dots: false,
      margin: 10,
      stagePadding: 20,
    },
    1000: {
      items: 5,
      nav: false,
      loop: false,
      dots: false,
      margin: 20,
      stagePadding: 40,
    }
  }
  return (
    <div className="2xl:container mx-auto">
      <div>
        <Title
          className="ml-5 xl:ml-10"
        >
          {title}
        </Title>
        {/* <div className="flex gap-5 overflow-scroll scrollbar-hide mt-4"> */}
        {/* <OwlCarousel
            responsive={responsive}
          > */}
        <div className="px-10 mt-3">
          <Swiper slidesPerView={5} spaceBetween={30} className="mySwiper"
            breakpoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              "@1.50": {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {
              data && data.length > 0 && data.map((item, index: number) => {
                return (
                  <SwiperSlide tag="li" key={index}>
                    <div
                      onClick={() => handlePlayUrl(item, slug)}
                      key={index} className={`relative w-full h-36 rounded-lg aspect-video overflow-hidden scrollbar-hide item cursor-pointer`}>
                      <a>
                        <Image
                          src={item.thumbnail}
                          className="object-cover"
                          alt={item.name}
                          layout="fill"
                        />
                      </a>

                      <div className="bg-gradient-to-t from-black absolute bottom-0 h-full w-full">
                        <div className="text-white text-sm font-bold px-3 py-2 absolute bottom-0 w-full">
                          <div className="flex items-center">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-1.5 right-2">
                        {item._id === activeEpisode &&
                          <div className="bg-[#FF2A00] rounded-full py-0.5 px-2 text-sm">
                            Now Playing
                          </div>}
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>


        {/* </OwlCarousel> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default EpisodeCard;
