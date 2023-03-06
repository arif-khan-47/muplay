import Image from 'next/image';
import React, { useState } from 'react';
import EpisodeSlider from '../TV/EpisodeSlider';
import LandscapeSlider from '../TV/LandscapeSlider';

const SeasonTabs = ({ data }: any) => {
    console.log('ssssss',data);
    const [selectedTab, setSelectedTab] = useState(data[0]._id);
    //  console.log(selectedTab);
    return (
        <div className='mt-5 lg:mt-0'>
            <div className='flex gap-10 px-[64px]'>
                {
                    data.map((item: any, index: any) => (
                        <div key={index}>
                            <div className={`text-[22.89px] ${selectedTab === item._id ? 'text-[#FF2A00]' : 'text-white'} font-bold cursor-pointer mr-[20px]`}
                                onClick={() => setSelectedTab(item._id)}>
                                {item.name}
                            </div>
                        </div>

                    ))
                }
            </div>
            <div>
                {data.map((item: any, index: any) => (
                    <div className='mt-[37px]'
                        key={index}
                        style={{ display: selectedTab === item._id ? 'block' : 'none' }}
                    >
                        <EpisodeSlider data={item.episodes} />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeasonTabs;
