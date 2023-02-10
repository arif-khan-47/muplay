import React, { useState } from 'react'

function login() {
    const bgimg = 'https://res.cloudinary.com/dgyudczza/image/upload/v1676010304/muplay/Wireframe_-_9_zuzson.png';

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const handlePhoneInput = (event: any) => {
        setPhone(event.target.value);
    };
    const handleOtpInput = (event: any) => {
        setOtp(event.target.value);
    };

    return (
        <div>
            <div className="bg-cover h-screen" style={{ backgroundImage: `url(${bgimg})` }}>
                <div className='px-5 lg:px-10 grid grid-cols-2 h-[100%]'>
                    <div className='col-span-1'></div>
                    <div className='col-span-1 text-white flex'>
                        {
                            isSubmitted ?
                                <div className='m-auto mx-[20%]'>
                                    <p className='font-semibold leading-tight text-[58.24px] mb-[50px] text-center underline underline-offset-[16px] decoration-[#D51742] decoration-2'>Verify</p>
                                    <div className='flex w-[50%] mx-auto gap-2 border-b-2 border-[#969696] text-[25px] mb-[30px]'>
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
                                            <button className='bg-gradient-to-t to-[#D41641] from-[#DD5F3C] rounded-full text-[30px] py-[10px] font-bold w-full mr-[17.44px]'>LOGIN</button>
                                    }
                                    <div className='flex mt-10 gap-1'>
                                    {phone} is not your number? <div onClick={() => setIsSubmitted(false)} className='text-[#D41641] cursor-pointer'>Edit</div>
                                    </div>
                                </div>

                                :
                                <div className='m-auto mx-[20%]'>
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
                                            <button onClick={() => setIsSubmitted(true)} className='bg-gradient-to-t to-[#D41641] from-[#DD5F3C] rounded-full text-[30px] py-[10px] font-bold w-full mr-[17.44px]'>VERIFY</button>
                                    }
                                </div>


                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login
