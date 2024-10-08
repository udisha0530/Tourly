import React from 'react';
import { Button } from '../button';

function Header() {
  return (
    <header className="bg-white w-full shadow-sm">
      <div className='p-3 flex justify-between items-center px-5'>
        <img src='/logo.svg' alt='Logo' className="h-8" />
        <div className="flex-grow"></div>
        <Button>Sign In</Button>
      </div>
    </header>
  );
}

export default Header;
