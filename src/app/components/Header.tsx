import React from 'react'
import HeartIcon from '../icons/HeartIcon'
import Link from 'next/link'


const Header = () => {
  return (
    <>
        <header className=" mb-3 flex justify-between my-2">
        <Link href="" className="flex font-bold text-xl gap-1">
        <HeartIcon/><span>Caption Generator.</span>
        </Link>
        <nav className=" flex gap-7 font-semibold sm:text-sm items-center">
        <Link href="/" className=' hover:text-zinc-200'>Home</Link>
        <Link href="/pricing" className=' hover:text-zinc-200'>Pricing</Link>
        <Link href="mailto:trannamson0328@gmail.com" className=' hover:text-zinc-200'>Contact</Link>
        </nav>
        </header>
    </>
  )
}

export default Header