import { selectBudgetoption, selectTravelersList } from '@/constant/option';
import {React,useState} from 'react';


function Createtrip() {
  const [destination, setDestination] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [apiKey] = useState('7d11130ca0msh5a45a2a02528a79p14aec8jsn37a35dcda68a'); // Store your API key
    const [isFetching, setIsFetching] = useState(false);
    const [lastInputLength, setLastInputLength] = useState(0);

  const fetchSuggestions = async (query) => {
    const endpoint = 'https://google-map-places.p.rapidapi.com/maps/api/place/autocomplete/json';
    const url = `${endpoint}?input=${query}&language=en`; // Input and language parameters as per the API documentation
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'google-map-places.p.rapidapi.com',
        'X-RapidAPI-Key': apiKey,
      },
    };

    try {
      setIsFetching(true); // Set loading state
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Response data:", data);
      // Clear previous suggestions
      setSuggestions([]);

      if (data.predictions && data.predictions.length > 0) {
        setSuggestions(data.predictions); // Use the predictions array for suggestions
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsFetching(false); // Reset loading state
    }
  };

  const handleInputChange = (e) => {
     const inputValue = e.target.value;
    setDestination(inputValue);
    if (inputValue.length >=3 && inputValue.length % 3 === 0) {
    fetchSuggestions(inputValue); // Call API every two characters after the second one
  } else if (inputValue.length <= 2) {
    setSuggestions([]); // Clear suggestions if input is too short
  }
  };

  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion.description); // Set the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
  };
  return (
    
    <div className="sm:px-10 md:px-32 lg:px-48 xl:px-56 px-5 mt-10 text-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h2 className="font-extrabold text-4xl text-gray-800 tracking-tight mb-4">Tell Us Your Travel Preference</h2>
      <p className="mt-3 text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
        Select your travel style, pace, and budget to get a trip that matches your vibe. <br />
        Discover unique destinations, popular sights, and hidden gems for an exciting adventure.
      </p>
       <div className="mt-16 space-y-12">
        {/* Destination Input */}
        <div className="relative bg-white rounded-lg shadow-lg p-6 md:p-8 transition hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">What is your destination?</h2>
          <input
            type="text"
            value={destination}
            onChange={handleInputChange}
            placeholder='Enter your destination'
            className="border border- gray-500 rounded-lg p-3 w-full h-14 text-lg text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
      {isFetching ? (
            <div className="mt-2 text-gray-500">Loading...</div> // Display loading state
          ) : (
            suggestions.length > 0 && (
              <div className="mt-2 relative rounded-lg text-lg focus:ring-2 border border-gray-300  text-left pl-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion.description} {/* Display the suggestion description */}
                  </div>
                ))}
              </div>
            )
          )}
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
