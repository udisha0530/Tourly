import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
    className='relative flex flex-col items-center mx-56 gap-9 py-16 rounded-lg'
    style={{
      backgroundImage: `url('/bg_pic.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      //filter: 'blur(4px)', // Add blur effect
      opacity: '0.6', // Reduce opacity
      }}
      >
    <div className='flex flex-col items-center mx-56 gap-9 py-16 bg-gradient-to-r rounded-lg'>
      <h1 className='font-bold text-[60px] text-center'>
        <span className='text-[#f56551] text-center mt-16'>Personalised Itineraries at your fingertips</span>
      </h1>
      <p className='text-gray-600 text-lg text-center max-w-xl'>
        Discover your next adventure with tailor-made itineraries that suit your travel style and preferences.
      </p>
      <Link to={'/create-trip'}>
        <Button className='bg-[#f56551] text-white hover:bg-[#e53e3e] transition duration-300 ease-in-out px-6 py-3 rounded-md shadow-lg'>
          Get started now
        </Button>
      </Link>
    </div>
    </div>
  );
}

export default Hero;

