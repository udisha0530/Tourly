
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';
function Header() {
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDailog]= useState(false);
  useEffect(()=>{
    console.log(user)
  }, [])
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    //onSuccess:(codeResp)=>console.log(codeResp),
    onError: (error) => error,
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        
        setOpenDailog(false);
        window.location.reload()
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response || error.message
        );
      });
  };
    
  return (
<header className="bg-cover bg-center w-full shadow-sm" style={{ backgroundImage: `url('pic3.jpg')` }}>
  <div className="p-1 flex justify-between items-center px-5">
    {/* Logo */}
    <img src="/tourlogo.jpg" alt="Logo" className="h-20" />

    <div className="flex-grow"></div>

    <div className="flex items-center gap-4">
      {/* Conditional Rendering Based on User Authentication */}
      {user ? (
        <div className="flex items-center gap-5">
          {/* My Trips Button */}
          <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
          </a>

          {/* User Profile with Popover */}
          <Popover>
                  <PopoverTrigger className="focus:outline-none p-0 m-0 bg-transparent">
          <img 
              src={user?.picture || '/default-avatar.jpg'} 
              className='h-[35px] w-[35px] rounded-full' 
              alt='Profile'
          />
          </PopoverTrigger>
          <PopoverContent className="p-4 bg-white shadow-lg rounded-lg text-center">
            <h2
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </h2>
          </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDailog(true)}>Sign Up</Button>
      )}
    </div>

    {/* Sign-In Dialog */}
    <Dialog open={openDailog} onOpenChange={setOpenDailog}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="flex items-center mb-6">
              <img src="/tourlogo.jpg" className="w-20 h-20 mr-4" />
              <span className="text-xl font-bold italic text-black">
                Your Ultimate Tour Planner{" "}
                <span style={{ fontSize: "1.75em" }}>🛫</span>
              </span>
            </div>
            <h2 className="font-bold text-lg mt-3 text-black">
              Sign in with Google
            </h2>
            <p className="text-gray-600 mb-6">
              Sign in to the app with Google authentication.
            </p>
            <Button
              onClick={login}
              className="w-full flex items-center justify-center gap-2 bg-[#4285F4] hover:bg-[#357ae8] text-white py-3 rounded-md"
            >
              <FcGoogle className="text-2xl" />
              <span>Sign In With Google</span>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</header>

  );
}

export default Header;