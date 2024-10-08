import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'> 
    <h1
        className='font-bold text-[60px] text-center'
>
        <span className='text-[#f56551] text-center mt-16'>Personalised Itenraries at your fingertips</span> </h1>
        <p className='text-gray-600'>ede egdeydgewy wefgweyfgwylsf</p>
   <Link to={'/create-trip'}>
   <Button>Get started now</Button>
   </Link>
    </div>
  )
}

export default Hero  