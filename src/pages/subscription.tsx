import React, { useState } from 'react'
import Layout from '@/Components/Layout/Layout'
import { NextPage, NextPageContext } from 'next'
import { IConfigData, ISessionData } from './_app'
// import { Button } from '@mui/material'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { checkout, getSubscriptions, verifyPayment } from '../http'
// import { IWhoAmI } from './my-account'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { IAllContentResponse } from '../pages/index'


interface IVerifyPayment {
    order_id: string;
    payment_id: string;
    signature: string;
}

export enum SubscriptionPlanDuration {
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    HALF_YEARLY = 'half-yearly',
    YEARLY = 'yearly'
}

export interface ISubscriptionPlan {
    _id: string,
    name: string,
    description: string,
    price: number,
    points: string[],
    duration: SubscriptionPlanDuration,
    currency: string[],
    status: boolean,
}

interface IPremiumPageProps {
    config: IConfigData;
    userSession: ISessionData;
    //    whoAmi: IWhoAmI;
    subscriptionPlans: ISubscriptionPlan[]
}

const Subscription: NextPage<IPremiumPageProps> = ({ config, userSession, subscriptionPlans }): JSX.Element => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userSession?.accessToken}`
    }
    const router = useRouter()
    // const [selectedId, setSelectedId] = useState<string>(subscriptionPlans[0]?._id)
    const [loading, setLoading] = useState<boolean>(false)


    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const makePayment = async (data: any, rozerpay_api_key: string, item: ISubscriptionPlan) => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        const options = {
            key: rozerpay_api_key,
            amount: data.amount,
            currency: data.currency,
            name: item.name,
            description: item.description,
            image: config.data.logo,
            order_id: data.id,
            handler: async (response: any) => {
                const sendData: IVerifyPayment = {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                };
                try {
                    const response = await verifyPayment(sendData, headers);
                    if (response.status === 200) {
                        toast.success("Payment Successful");
                        setTimeout(() => {
                            router.push('/');
                        }, 1000);
                    }
                } catch (error) {
                    toast.error("Payment Failed");
                }
            },
            prefill: {
                name: userSession.user?.info.name,
                email: userSession.user?.info.email || 'email@email.com',
                contact: userSession.user?.info.phone || '9876543210',
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


    const handlePayment = async (selectedId: string) => {
        if (!userSession) {
            setTimeout(() => {
                router.push('/login');
            }, 1000);
            return toast.error("Please Login First")
        }
        setLoading(true)
        try {
            const response = await checkout({ subscriptionId: selectedId, provider: "cashfree" }, headers)
            const { data: { data, rozerpay_api_key } } = response
            const item = subscriptionPlans.find(plan => plan._id === selectedId)
            if (response.status === 201) {
                makePayment(data, rozerpay_api_key, item as any);
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
            toast.error('Something want wrong!')
            setLoading(false)
        }
    };
    return (
        <Layout
            userSession={userSession}
            config={config?.data}
        >
            <div className="bg-cover bg-center h-full" style={{ backgroundImage: `url(https://res.cloudinary.com/dgyudczza/image/upload/v1676027129/muplay/Group_77_uwlio3.png)` }}>
                <div className='px-5 lg:px-10 pt-[73px] pb-[104px]'>
                    <p className='text-[50.79px] mb-[79px] font-semibold text-white text-center'>Pricing table example</p>
                    <div className='lg:flex lg:justify-center lg:gap-20'>
                        {
                            subscriptionPlans && subscriptionPlans.length > 0 && subscriptionPlans.slice(0, 1).map((plan: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <div className='relative h-[575px] w-[322px] bg-gradient-to-t to-white from-[#DC5C3C] rounded-tl-[100px] rounded-br-[100px] flex mx-auto lg:mx-0'>
                                            <div className='bg-white w-[315px] h-[568px] overflow-hidden  rounded-tl-[100px] rounded-br-[100px] m-auto'>

                                                <div className='h-[150px] rounded-br-[100px] w-[189.03px] bg-gradient-to-t to-[#D41741] from-[#DC5A3D] flex '>
                                                    <span className='m-auto text-[33.25px] font-bold'>{plan.name}</span>
                                                </div>
                                                <p className='text-center text-[71.52px]'>₹{plan.price}<span className='text-xl'>/{plan.duration}</span></p>
                                                <p className='text-center w-[258px] text-[13.82px] mb-[20px] mx-auto'>{plan.description}</p>

                                                {plan.points.map((point: any, index: any) => {
                                                    return (
                                                        <div key={index} className='flex justify-center gap-1 mb-[15px]'><svg className='my-auto w-[14px] h-[10px] fill-none' viewBox="0 0 14 10"><path stroke="#06AD03" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.44" d="M12.313.73L4.396 8.648l-3.6-3.6" ></path>
                                                        </svg>
                                                            {point}
                                                        </div>
                                                    )
                                                }
                                                )}

                                                <div className='flex justify-center absolute bottom-14 left-[81.50px]'>
                                                    <button onClick={() => handlePayment(plan._id)} className='h-[50.67px] rounded-full bg-[#FF2A00] w-[158.93px] text-[16.12px] font-bold text-white'>
                                                        Get this plan
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            subscriptionPlans && subscriptionPlans.length > 0 && subscriptionPlans.slice(1, 2).map((plan: any, index: any) => {
                                return (
                                    <>
                                        <div className='h-[575px] relative w-[322px] bg-gradient-to-t to-white from-[#DC5C3C] rounded-tl-[100px] rounded-br-[100px] flex mx-auto lg:mx-0'>
                                            <div className='bg-[#101010] w-[315px] h-[568px] overflow-hidden  rounded-tl-[100px] rounded-br-[100px] m-auto'>

                                                <div className='h-[150px] rounded-br-[100px] w-[189.03px] bg-white flex '>
                                                    <span className='m-auto text-[32.22px] font-bold'>{plan.name}</span>
                                                </div>
                                                <div className='text-white'>
                                                <p className='text-center text-[71.52px]'>₹{plan.price}<span className='text-xl'>/{plan.duration}</span></p>
                                                    <p className='text-center w-[258px] text-[13.82px] mb-[20px] mx-auto'>{plan.description}</p>
                                                    {plan.points.map((point: any, index: any) => {
                                                    return (
                                                        <div key={index} className='flex justify-center gap-1 mb-[15px]'><svg className='my-auto w-[14px] h-[10px] fill-none' viewBox="0 0 14 10"><path stroke="#06AD03" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.44" d="M12.313.73L4.396 8.648l-3.6-3.6" ></path>
                                                        </svg>
                                                            {point}
                                                        </div>
                                                    )
                                                }
                                                )}
                                                </div>

                                                <div className='flex justify-center absolute bottom-14 left-[81.50px]'>
                                                    <button onClick={() => handlePayment(plan._id)} className='h-[50.67px] rounded-full bg-[#FF2A00] w-[158.93px] text-[16.12px] font-bold text-white'>
                                                        Get this plan
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        {
                            subscriptionPlans && subscriptionPlans.length > 0 && subscriptionPlans.slice(2, 3).map((plan: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <div className='relative h-[575px] w-[322px] bg-gradient-to-t to-white from-[#DC5C3C] rounded-tl-[100px] rounded-br-[100px] flex mx-auto lg:mx-0'>
                                            <div className='bg-white w-[315px] h-[568px] overflow-hidden  rounded-tl-[100px] rounded-br-[100px] m-auto'>

                                                <div className='h-[150px] rounded-br-[100px] w-[189.03px] bg-gradient-to-t to-[#D41741] from-[#DC5A3D] flex '>
                                                    <span className='m-auto text-[33.25px] font-bold'>{plan.name}</span>
                                                </div>
                                                <p className='text-center text-[71.52px]'>₹{plan.price}<span className='text-xl'>/{plan.duration}</span></p>
                                                <p className='text-center w-[258px] text-[13.82px] mb-[20px] mx-auto'>{plan.description}</p>

                                                {plan.points.map((point: any, index: any) => {
                                                    return (
                                                        <div key={index} className='flex justify-center gap-1 mb-[15px]'><svg className='my-auto w-[14px] h-[10px] fill-none' viewBox="0 0 14 10"><path stroke="#06AD03" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.44" d="M12.313.73L4.396 8.648l-3.6-3.6" ></path>
                                                        </svg>
                                                            {point}
                                                        </div>
                                                    )
                                                }
                                                )}

                                                <div className='flex justify-center absolute bottom-14 left-[81.50px]'>
                                                    <button onClick={() => handlePayment(plan._id)} className='h-[50.67px] rounded-full bg-[#FF2A00] w-[158.93px] text-[16.12px] font-bold text-white'>
                                                        Get this plan
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>                  

                </div>
            </div>

        </Layout>

    )
}

export default Subscription
// whoami
async function getWhoami(session: ISessionData) {
    console.log("🚀 ~ file: premium.tsx:58 ~ getWhoami ~ req", session)
    try {
        const { data, status } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/whoami`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${session?.accessToken}`
            }
        });
        if (status === 200) {
            return data.data
        }
    } catch (error) {
        return null;
    }
}
// get the subscription plans
async function getSubscriptionPlans() {
    try {
        const { data, status } = await getSubscriptions();
        if (status === 200) {
            return data.data
        }
    } catch (error) {
        console.log("🚀 ~ file: premium.tsx:59 ~ getSubscriptionPlans ~ error", error)
        return null;
    }
}

// get sever side props to get session
export const getServerSideProps = async (context: NextPageContext) => {
    const { req, res } = context;
    const session = await getSession({ req });
    const whoAmi = await getWhoami(session as any)
    if (whoAmi?.isPremium.status) {
        if (res)
            res.writeHead(302, {
                Location: '/my-account'
            })
        if (res)
            res.end()
    }
    const subscriptionPlans = await getSubscriptionPlans()
    if (!session) {
        return {
            props: {
                userSession: session,
                whoAmi: null,
                subscriptionPlans: subscriptionPlans
            },
        };
    }

    return {
        props: {
            userSession: session,
            whoAmi: whoAmi,
            subscriptionPlans: subscriptionPlans
        },
    };
}