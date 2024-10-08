import React from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

function Createtrip() {
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-center'>
      <h2 className='font-bold text-3xl'>Tell us your travel preference</h2>
      <p className='mt-3 text-gray-500 text-xl'>bhwebblseebsew ebdhe bdwehjd hfbwfhlef</p>
      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
          <ReactGoogleAutocomplete
          apiKey=''
          
          /> 

          
        </div>
      </div>
    </div>
  );
}

export default Createtrip;

