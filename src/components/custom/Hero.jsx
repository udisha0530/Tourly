import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';
//import Header from '../custom/Header'; // Assuming you have a Header component

function Hero() {
  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('/bg_pic.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.8)',
      }}
    >
      

      {/* Translucent Box */}
      <div
        className="relative flex flex-col items-center gap-9 p-16 rounded-xl shadow-lg mx-auto mt-12"
        style={{
          backgroundImage: `url('/bg_pic2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Translucent background
          backdropFilter: 'blur(10px)', // Blur effect
          //boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
        }}
      >
        {/* Text */}
        <h1 className="font-bold text-[40px] md:text-[60px] text-center">
          <span className="text-[#b85c00]">Personalised Itineraries at Your Fingertips</span>
        </h1>
        <p className="text-gray-700 text-2xl font-bold text-center max-w-2xl">
          Discover your next adventure with tailor-made itineraries that suit your travel style and preferences.
        </p>
        {/* Button */}
        <Link to={'/create-trip'}>
          <Button className="bg-[#b85c00] text-white hover:bg-[#e53e3e] transition duration-300 ease-in-out px-6 py-3 rounded-md shadow-lg text-lg font-medium relative -top-8">
            Get Started Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
