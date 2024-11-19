import { Button } from '@/components/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({trip}) {
  return (
    <div>
        <img src='/placeholder2.jpg' className='h-[340px] w-full object-cover rounded-xl'/>
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
            <div className='flex gap-5'>
                <h2 className='px-2 py-1 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md font-dark leading-tight'>🗓 {trip.userSelection?.noOfDays} Days</h2>
                <h2 className='px-2 py-1 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md font-dark leading-tight'>💵 {trip.userSelection?.budget} Budget</h2>
                <h2 className='px-2 py-1 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md font-dark leading-tight'>🧳 No of travellers: {trip.userSelection?.travellers} </h2>
            </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection