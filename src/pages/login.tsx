import { login, verifyOTP } from '@/http';
import React, { useState,useLayoutEffect } from 'react'
import { useDispatch } from "react-redux";
import { setPhoneAndHash } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";

import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Head from 'next/head';
import { IConfigData } from './_app';



function Login() {

    const router = useRouter();

    const bgimg = 'https://res.cloudinary.com/dgyudczza/image/upload/v1676010304/muplay/Wireframe_-_9_zuzson.png';

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    const [hash, setHash] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { phoneAndHash } = useSelector((state: RootState) => state.auth);
    const [otp, setOtp] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');


    const handlePhoneInput = (event: any) => {
        setPhone(event.target.value);
    };
    const handleOtpInput = (event: any) => {
        setOtp(event.target.value);
    };

    async function signin() {
        setIsSubmitted(true)
        console.log('clicked')

        try {
            // const response = await login({ phone });
            // try {
            //     setHash(response.data.hash)

            // } catch (error) {
            //     console.log(error)
            // }
            // } catch (error) {
            //     console.log(error);
            // }
            const { data, status } = await login({ phone })
            if (status === 200) {
                dispatch(setPhoneAndHash({
                    phone: data.phone,
                    hash: data.hash
                }))
                toast.success("OTP sent to your phone number");
                //if login is successfull redirect it to home page
            }
        } catch (error: any) {
            toast.error(error || "Something went wrong");
        }
    }

    async function submitOtp() {
        // try {
        //     const response = await verifyOTP({ hash, phone, otp })
        //     console.log(response.data)

        //     try {
        //         setAccessToken(response.data.accessToken)
        //         setRefreshToken(response.data.refreshToken)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        try {
            setIsLoading(true);
            const values = {
                phone: phoneAndHash?.phone,
                otp: parseInt(otp),
                hash: phoneAndHash?.hash
            };
            const res = await signIn("credentials", { ...values, redirect: false });
            if (res?.ok) {
                toast.success("Login Successful");
                //if login is successfull redirect it to home page
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
            <div className={`bg-right-top lg:bg-cover h-screen`} style={{ backgroundImage: `url(${bgimg})` }}>
                <div className='px-5 lg:px-10 grid lg:grid-cols-2 h-[100%]'>
                    <div className='lg:col-span-1 hidden lg:block'></div>
                    <div className='col-span-1 text-white flex'>
                        {
                            isSubmitted ?
                                <div className='m-auto lg:mx-[20%]'>
                                    <p className='font-semibold leading-tight text-[58.24px] mb-[50px] text-center underline underline-offset-[16px] decoration-[#D51742] decoration-2'>Verify</p>
                                    <div className='flex lg:w-[50%] mx-auto gap-2 border-b-2 border-[#969696] text-[25px] mb-[30px]'>
                                        <input className='w-full focus:outline-none bg-transparent text-center'
                                            autoFocus={true}
                                            defaultValue={otp}
                                            placeholder='OTP'
                                            onChange={handleOtpInput}
                                            type="number" name="" id="" />
                                    </div>


                                    {
                                        otp.length !== 4 ?
                                            <button disabled className='bg-gray-600 rounded-full text-[30px] py-[10px] font-bold w-full mr-[17.44px]'>LOGIN</button>
                                            :
                                            <button onClick={submitOtp} className='bg-gradient-to-t to-[#D41641] from-[#DD5F3C] rounded-full text-[30px] py-[10px] font-bold w-full mr-[17.44px]'>LOGIN</button>
                                    }
                                    <div className='flex mt-10 gap-1'>
                                        {phone} is not your number? <div onClick={() => setIsSubmitted(false)} className='text-[#D41641] cursor-pointer'>Edit</div>
                                    </div>
                                </div>

                                :
                                <div className='m-auto lg:mx-[20%]'>
                                    <p className='font-semibold leading-tight text-[58.24px] mb-[50px] text-center underline underline-offset-[16px] decoration-[#D51742] decoration-2'>Login</p>
                                    <div className='flex w-full gap-2 border-b-2 border-[#969696] text-[25px] mb-[30px]'> <span className='text-[#969696]'>+91</span>
                                        <input className='w-full focus:outline-none bg-transparent'
                                            autoFocus={true}
                                            defaultValue={phone}
                                            placeholder='Phone Number'
                                            onChange={handlePhoneInput}
                                            type="number" name="" id="" />
                                    </div>

                                    {
                                        phone.length !== 10 ?
                                            <button disabled className='bg-gray-600 rounded-full text-[30px] py-[10px] font-bold w-full mr-[17.44px]'>VERIFY</button>
                                            :
                                            <button onClick={signin} className='bg-gradient-to-t to-[#D41641] from-[#DD5F3C] rounded-full text-[30px] py-[10px] font-bold w-full mr-[17.44px]'>VERIFY</button>
                                    }
                                </div>


                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
