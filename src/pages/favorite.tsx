import { getAllContentEndpoint } from '@/http';
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { setPhoneAndHash } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";
import { getSession } from 'next-auth/react'
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Head from 'next/head';
import { IConfigData } from './_app';

import axios from 'axios'
import Layout from '@/Components/Layout/Layout';


function Favorite({ favorite, userSession, config }: any) {

    console.log(favorite);
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     setData(favorite)
    // }, [])
    // console.log(data)

    // async function fetchFavoriteData(session: any) {
    //     try {
    //     //   const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/history`, {
    //       const response = await axios.get(`https://cors-anywhere-969l.onrender.com/https://api.zezosoft.com/api/favorite`, {
    //         withCredentials: true,
    //         headers: {
    //           "Authorization": `Bearer ${session?.accessToken}`
    //         }
    //       });
    //       if (response.status === 200) {
    //         setData(response.data);
    //       }
    //     } catch (error) {
    //       return null;
    //     }
    //   }

    // useEffect(() => {
    //     fetchFavoriteData();
    //     return () => { }
    // }, [])











    const router = useRouter();

    const bgimg = 'https://res.cloudinary.com/dgyudczza/image/upload/v1676010304/muplay/Wireframe_-_9_zuzson.png';

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    const [hash, setHash] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { phoneAndHash } = useSelector((state: RootState) => state.auth);
    const [otp, setOtp] = useState('');



    const handlePhoneInput = (event: any) => {
        setPhone(event.target.value);
    };
    const handleOtpInput = (event: any) => {
        setOtp(event.target.value);
    };

    async function signin() {
        setIsSubmitted(true)
        try {
            // const response = await favorite({ phone });
            // try {
            //     setHash(response.data.hash)

            // } catch (error) {
            //     console.log(error)
            // }
            // } catch (error) {
            //     console.log(error);
            // }
            // const { data, status } = await favorite({ phone })
            // if (status === 200) {
            //     dispatch(setPhoneAndHash({
            //         phone: data.phone,
            //         hash: data.hash
            //     }))
            //     toast.success("OTP sent to your phone number");
            //     //if favorite is successfull redirect it to home page
            // }
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    }

    async function submitOtp() {
        try {
            setIsLoading(true);
            const values = {
                phone: phoneAndHash?.phone,
                otp: parseInt(otp),
                hash: phoneAndHash?.hash
            };
            const res = await signIn("credentials", { ...values, redirect: false });
            if (res?.ok) {
                toast.success("favorite Successful");
                //if favorite is successfull redirect it to home page
                setTimeout(() => {
                    router.push("/");
                }, 1000);
                setIsLoading(false);
            } else {
                toast.error(res?.error || "Something went wrong");
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error)
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
                {
                    favorite && favorite > 0 && favorite.map((item: any, index: any) => {
                        // return (
                        //     <div className='text-white font-bold text-2xl'>

                        //     </div>
                        // )
                        // console.log(favorite)
                    })
                }

                <div className="container m-auto mt-4">
                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 mx-5 lg:mx-0'>
                        {
                            <>

                                {/* 
                                {
                                    loading ? loadingData.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-1'>
                                        <div className='relative'>
                                            <div className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'>

                                            </div>
                                        </div>
                                    </div>
                                        )
                                    }) : categoryData && categoryData.length > 0 && categoryData.map((item, index) => {
                                        return (
                                            <div key={index} className='col-span-1'>
                                        <div className='hover:scale-110 duration-500'>
                                            <img
                                                onClick={() => handleSliderClick(item)}
                                                src={item.thumbnail}
                                                className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'
                                            />
                                        </div>
                                    </div>
                                        )
                                    })
                                } */}

                            </>
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
        const response = await axios.get(`https://cors-anywhere-969l.onrender.com/https://api.zezosoft.com/api/favorite`, {
            withCredentials: true,
            headers: {
                "x-requested-with": "",
                "Authorization": `Bearer ${session?.accessToken}`
            }
        });
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}
async function getWhoami(session: any) {
    try {
        const { data, status } = await axios.get(`https://cors-anywhere-969l.onrender.com/https://api.zezosoft.com/api/auth/whoami`, {
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
                content: content,
                whoAmi: whoAmi,
                favorite: favorite,
            },
        };
    }
}