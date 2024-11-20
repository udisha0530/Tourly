import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-2xl mt-5 mb-4 text-gray-800'>Hotel Recommendations</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotelName+","+ hotel?.hotelAddress} target='_blank'>
          <div key={index} className='bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105'>
            <img src='/hotelpic.jpg' alt={hotel?.hotelName} className='rounded-t-xl w-full h-48 object-cover' />
            <div className='p-4'>
              <h2 className='font-semibold text-lg text-gray-900'>{hotel?.hotelName}</h2>
              <h2 className='text-sm text-gray-600 mt-1'>📍 <span className='italic'>{hotel?.hotelAddress}</span></h2>
              <h2 className='text-sm text-gray-600 mt-1'>🏷 <span className='text-gray-800 font-medium'>{hotel?.price}</span></h2>
              <h2 className='text-sm text-yellow-500 mt-1'>⭐ {hotel?.rating}</h2>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>

  );
}

export default Hotels;