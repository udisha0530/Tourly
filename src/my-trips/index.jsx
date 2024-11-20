import { db } from "@/service/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
    const [userTrips, setUserTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/');
            return;
        }

        const q = query(collection(db, 'aitrips'), where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setUserTrips(prevVal => [...prevVal, doc.data()]);
        });
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-48 xl:px-56 px-5 mt-10 text-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen rounded-xl'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className="grid grid-cols-2 mt-10 md:grid gap-5">
                {userTrips?.length>0?userTrips.map((trip,index)=>(
                  <UserTripCardItem trip={trip} key={index} />  
                ))
                :[1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl">

                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default MyTrips;