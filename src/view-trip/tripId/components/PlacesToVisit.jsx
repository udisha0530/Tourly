import React from 'react';

function PlacesToVisit({ trip }) {
  return (
    <div className='p-5 bg-white rounded-lg shadow-lg'>
      <h2 className='font-bold text-3xl text-gray-800 mb-5 border-b-2 border-[#f56551] pb-2'>Places to Visit</h2>
      <div className='space-y-10'>
        {trip.tripData?.itinerary ? (
          // Iterate over the keys of the itinerary object in sorted order
          Object.keys(trip.tripData.itinerary).sort().map((dayKey, index) => {
            const dayPlan = trip.tripData.itinerary[dayKey];
            return (
              <div key={index} className='bg-[#fef9f7] p-5 rounded-xl shadow-lg border border-[#f56551]/20 hover:shadow-xl transition-shadow duration-200'>
                <h3 className='text-2xl font-semibold text-[#f56551] mb-3'>{dayKey}</h3>
                <h4 className='italic text-gray-700 mb-2'>Best Time to Visit: <span className='font-medium text-gray-800'>{dayPlan.bestTime}</span></h4>
                <div className='space-y-4'>
                  {dayPlan.plan.map((place, idx) => (
                    <div key={idx} className='p-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 flex flex-col md:flex-row md:items-start'>
                      <img
                        src='/thumbnail4.jpg' // Display only the default image
                        alt='Default Preview'
                        className='rounded-lg w-full md:w-1/3 object-cover mb-3 md:mb-0 md:mr-4 h-40'
                      />
                      <div className='flex-1'>
                        <h3 className='font-medium text-xl text-gray-800 mb-1'>{place.placeName}</h3>
                        <p className='text-gray-600 mb-2 leading-relaxed'>{place.placeDetails}</p>
                        <div className='text-sm text-gray-500 space-y-1'>
                          <p>⏱ Time to Travel: <span className='font-medium'>{place.timeToTravel}</span></p>
                          <p>💵 Ticket Pricing: <span className='font-medium'>{place.ticketPricing}</span></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-gray-500'>No itinerary available</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;