import { selectBudgetoption, selectTravelersList } from '@/constant/option';
import React from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

function Createtrip() {
  return (
    <div className="sm:px-10 md:px-32 lg:px-48 xl:px-56 px-5 mt-10 text-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h2 className="font-extrabold text-4xl text-gray-800 tracking-tight mb-4">Tell Us Your Travel Preference</h2>
      <p className="mt-3 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
        Select your travel style, pace, and budget to get a trip that matches your vibe. <br />
        Discover unique destinations, popular sights, and hidden gems for an exciting adventure.
      </p>

      <div className="mt-16 space-y-12">
        {/* Destination Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 transition hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">What is your destination?</h2>
          <ReactGoogleAutocomplete
            apiKey='' // Leave blank for now
            placeholder='Enter your destination'
            className="border border-gray-300 rounded-lg p-3 w-full h-14 text-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
          /> 
        </div>

        {/* Days of Stay Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 transition hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">How many days are you planning to stay?</h2>
          <input 
            type="number" 
            placeholder="Ex. 3" 
            className="border border-gray-300 rounded-lg p-3 w-full h-14 text-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Choose your Budget</h2>
          <div className="flex flex-wrap gap-5 justify-center">
            {selectBudgetoption.map((item, index) => (
              <button
                key={index}
                className="w-48 h-40 bg-white rounded-lg shadow-md p-5 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="text-4xl text-primary mb-2">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-700">{item.title}</h3>
                <p className="text-gray-500 text-center text-sm mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Who are you travelling with?</h2>
          <div className="flex flex-wrap gap-5 justify-center">
            {selectTravelersList.map((item, index) => (
              <button
                key={index}
                className="w-48 h-40 bg-white rounded-lg shadow-md p-5 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="text-4xl text-primary mb-2">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-700">{item.title}</h3>
                <p className="text-gray-500 text-center text-sm mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createtrip;
