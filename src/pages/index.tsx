import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-white">
        Welcome to MUPLAY
      </h1> 



      <div className='text-center mt-20 text-white'>
        <Link href='/home'>/HOME</Link>
        <br/><br/>
        {/* <Link href='/'>/MOVIES</Link>
        <br/><br/>
        <Link href='/'>/LOGIN</Link>
        <br/><br/>    
        <Link href='/'>/SIGNIN</Link>
        <br/><br/> 
        <Link href='/'>/TV</Link>
        <br/><br/>  
        <Link href='/'>/SEARCH</Link>
        <br/><br/>  
        <Link href='/'>/Subscription</Link>
        <br/><br/>        */}
      </div>
    </>
  )
}
