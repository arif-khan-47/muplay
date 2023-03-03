import { delFavorite, getAllContentEndpoint } from '@/http';
import React from 'react'
import toast from "react-hot-toast";
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import axios from 'axios'
import Layout from '@/Components/Layout/Layout';


function Favorite({ favorite, userSession, config }: any) {

    const router = useRouter();






    // generate href for slider
    const generateUrl = (item: any) => {
        const type = item.type.toLowerCase();
        const slug = item.slug;
        const url = `/${type}/${slug}`;
        return url;
    }


    // handleSliderClick
    const handleSliderClick = (item: any, reload?: boolean) => {
        const url = generateUrl(item);
        if (reload) {
            router.push(url).then(() => router.reload())
        } else {
            router.replace(url)
        }
    }



    async function handleDelFavorite(id: number) {
        // console.log(id)
        try {
            const res = await delFavorite(id);

            console.log(res)
            toast.success("Removed from Favorite.", {
                style: {
                    border: '1px solid #FF2A00',
                    padding: '16px',
                    color: '#FF2A00',
                    backgroundColor: '#1D1D1D'
                },
                iconTheme: {
                    primary: '#FF2A00',
                    secondary: '#1D1D1D',
                },
            });

        } catch (error: any) {
            // console.log(error.response.data.error.message)
            toast.success(error.response.data.error.message, {
                style: {
                    border: '1px solid #FF2A00',
                    padding: '16px',
                    color: '#FF2A00',
                    backgroundColor: '#1D1D1D'
                },
                iconTheme: {
                    primary: '#FF2A00',
                    secondary: '#1D1D1D',
                },
            });
        }
    }





    return (
        <div>
            <Layout
                userSession={userSession}
                config={config?.data || false}
            >
                <div className="w-[94%] mx-auto mt-10">
                    <h1 className="text-2xl text-white font-semibold">
                        Favorite List
                    </h1>

                </div>

                <div className="container m-auto mt-4">
                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 mx-5 lg:mx-0'>

                        {
                            // loading ? loadingData.map((item, index) => {
                            //     return (
                            //         <div key={index} className='col-span-1'>
                            //             <div className='relative'>
                            //                 <div className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'>

                            //                 </div>
                            //             </div>
                            //         </div>
                            //     )
                            // })
                            //     :
                            favorite && favorite.length > 0 && favorite.map((item: any, index: any) => {
                                return (
                                    <div key={index} className='col-span-1 relative z-30'>
                                        <div className='absolute right-1 top-1 hover:scale-125 duration-500 bg-red-600 rounded-full p-1 cursor-pointer' onClick={() => handleDelFavorite(item._id)}>
                                            <svg className='w-6 stroke-white fill-none' viewBox="0 0 24 24"><g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 003 3h6a3 3 0 003-3v-8M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"></path></g></svg>
                                        </div>
                                        <div className='aspect-video mx-auto bg-cover bg-no-repeat w-[100%] my-auto rounded cursor-pointer bg-gray-600 hover:border-2' onClick={() => handleSliderClick(item.content)} style={{ backgroundImage: `url(${item.content.thumbnail})` }}>
                                            {/* <img
                                                // onClick={() => handleSliderClick(item)}
                                                src={item.content.thumbnail}
                                                className=''
                                            /> */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Favorite



async function getAllFavorite(session: any) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorite`, {
            withCredentials: true,
            headers: {
                "x-requested-with": "",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error: any) {
        console.log(error.response)
        return null;
    }
}
async function getWhoami(session: any) {
    try {
        const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/whoami`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        });
        if (status === 200) {
            // return data.data
            console.log(data);
        }
    } catch (error) {
        return null;
    }
}
async function getAllContent() {
    try {
        const { data, status } = await getAllContentEndpoint();
        if (status === 200) {
            return data;
        }
    } catch (error) {
        return [];
    }
}
export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const favorite = await getAllFavorite(session as any);
    const whoAmi = await getWhoami(session as any)
    if (!session) {
        const content = await getAllContent();
        return {
            props: {
                userSession: session,
                content: content,
                whoAmi: null,
                favorite: favorite,
            },
        };
    } else {
        const content = await getAllContent();
        return {
            props: {
                userSession: session,
                favorite: favorite,
                content: content,
                whoAmi: whoAmi,
            },
        };
    }
}