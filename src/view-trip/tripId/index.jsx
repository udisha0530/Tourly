import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/service/firebaseConfig';
import {doc, getDoc} from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
function Viewtrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
       tripId && GetTripData();
    },[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'aitrips', tripId);
        const docSnap= await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such doc");
            toast('No trip found!')
        }
    }
  return (
    
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information Section  */}
        <InfoSection trip={trip}/> 

        {/* Recommneded Hotels */}
        <Hotels trip={trip}/>


        {/* Daily Plan */}
        <PlacesToVisit trip={trip}/>


    </div>
  )
}

export default Viewtrip