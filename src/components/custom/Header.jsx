import React from 'react';
import { Button } from '../button';

function Header() {
  return (
    <header className="bg-cover bg-center w-full shadow-sm" style={{ backgroundImage: `url('pic3.jpg')` }}>
      <div className='p-3 flex justify-between items-center px-5'>
        <img src='/tourlogo.jpg' alt='Logo' className="h-20" />
        <div className="flex-grow"></div>
        <Button>Sign In</Button>
      </div>
    </header>
  );
}

export default Header;
