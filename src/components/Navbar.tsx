import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Image src="/rcc 1.png" height={80} width={90} alt="logo" className='logo' ></Image>
      </div>
      <nav>
        <button className='login'>Login</button>
        <button className='signup'>SignUp</button>
      </nav>
    </div>
  )
}

export default Navbar