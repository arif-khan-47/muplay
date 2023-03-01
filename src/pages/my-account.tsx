import { NextPage, NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import React from 'react'
import Layout from '../Components/Layout/Layout'
import { IConfigData, ISessionData } from './_app'
// import { AiOutlineRight } from 'react-icons/ai'
import { NextRequest } from 'next/server'
import axios from 'axios'
import Link from 'next/link'
import { ISubscriptionPlan, SubscriptionPlanDuration } from './subscription'
import moment from 'moment'

export interface IWhoAmI {
    user: {
        _id: string;
        name: string | null;
        phone: string | null;
        email: string | null;
        role: "admin" | "user";
        avatar: string | null;
    },
    isPremium: {
        subscriptionId: string | null;
        subscriptionDetails: ISubscriptionPlan | null;
        status: boolean
        active_at: string | null,
        expiresIn: string | null
    }
}

interface IMyAccountProps {
    config: IConfigData;
    userSession: ISessionData;
    whoAmi: IWhoAmI | null
}

// validity to days
export function durationMonthToDays(duration: string) {
    switch (duration) {
        case SubscriptionPlanDuration.WEEKLY:
            return 7
        case SubscriptionPlanDuration.MONTHLY:
            return 30
        case SubscriptionPlanDuration.QUARTERLY:
            return 90
        case SubscriptionPlanDuration.HALF_YEARLY:
            return 180
        case SubscriptionPlanDuration.YEARLY:
            return 365
        default:
            return 0
    }
}

const MyAccount: NextPage<IMyAccountProps> = ({ config, userSession, whoAmi }): JSX.Element => {
    console.log("🚀 ~ file: my-account.tsx:56 ~ whoAmi", whoAmi)
    return (
        <Layout
            config={config.data}
            userSession={userSession}
        >
            <div className="flex justify-center">
                <div className='flex flex-col justify-center items-center my-10 w-80'>
                    <img
                        src={userSession.user?.info.avatar || 'https://res.cloudinary.com/dm4uaqlio/image/upload/v1673079153/avatar-male_lrf8k1.png'}
                        alt={userSession.user?.info.name || ''}
                        className="rounded-full w-20 h-20"
                    />
                    <p className='mt-4 text-white text-xl font-semibold capitalize'>
                        {userSession.user?.info.name || 'Guest User'}
                    </p>
                    <p className='text-base text-white capitalize'>
                        +91 {userSession.user?.info.email || userSession.user?.info.phone}
                    </p>

                    {
                        whoAmi?.isPremium.status ? (<div className='mt-5 w-full'>
                            <h1 className='text-center font-medium'>
                                Thanks for being a Premium member.
                            </h1>
                            <div className='bg-slate-700 px-4 py-2.5 mt-5 w-full'>
                                <p className='font-semibold'>
                                    {whoAmi.isPremium.subscriptionDetails?.name} membership: ₹{whoAmi.isPremium?.subscriptionDetails?.price}/{whoAmi.isPremium?.subscriptionDetails?.duration}
                                </p>
                                <p className='mt-1 text-sm'>
                                    Next payment date: {moment(whoAmi.isPremium?.active_at).add(durationMonthToDays(whoAmi.isPremium?.subscriptionDetails?.duration || ''), 'days').format('DD-MMM-YYYY')}
                                </p>
                            </div>
                        </div>) : (<div className='mt-5 w-full'>
                            <Link href={`/subscription`}>
                                    <div
                                        className='bg-[#FF2A00] px-4 py-5 rounded-xl w-full flex justify-between items-center cursor-pointer'>
                                        <p className='mx-auto text-white'>
                                            Get Premium
                                        </p>
                                        {/* <AiOutlineRight /> */}
                                    </div>
                            </Link>
                        </div>)
                    }
                    <div
                        onClick={() => signOut()}
                        className='bg-red-800 px-4 py-3 mt-2 flex rounded-xl w-full cursor-pointer items-center justify-between'>
                        <p className='font-semibold mx-auto text-white'>
                            Log Out
                        </p>
                        {/* <AiOutlineRight /> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyAccount

// whoami
async function getWhoami(session: ISessionData) {
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

// get sever side props to get session
export const getServerSideProps = async (context: NextPageContext) => {
    const { req, res } = context;
    const session = await getSession({ req });
    const whoAmi = await getWhoami(session as any)
    if (!session) {
        if (res)
            res.writeHead(302, {
                Location: '/login',
            });
        if (res)
            res.end();
        return {
            props: {},
        };
    }

    return {
        props: {
            userSession: session,
            whoAmi: whoAmi
        },
    };
}