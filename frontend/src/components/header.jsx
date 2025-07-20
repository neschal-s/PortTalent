import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import {Button,buttonVariants} from './ui/button';
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { BriefcaseBusiness, BriefcaseBusinessIcon, Heart, HeartIcon, PenBox } from 'lucide-react';
import { useState } from 'react';




const Header = () => {
  const [showSignedIn, setShowSignedIn] = useState(false);
  const {user}=useUser();

  const [search,setSearch]=useSearchParams();
  useEffect(() => {
    if(search.get('sign-in')) {
      setShowSignedIn(true);
    }
  },[search])

  const handleOverLayClick = (e) => {
    if(e.target===e.currentTarget){
      setShowSignedIn(false);
      setSearch({});
    }
  }

  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link>
        <img src="./logo_final.png" alt="Logo" className='h-20'/>
        </Link>
        <div className='flex gap-4 items-center'>
          <SignedOut>
            <Button variant="outline" onClick={()=>setShowSignedIn(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            { user?.unsafeMetadata?.role === 'recruiter' && (
              <Link to='/post-job'>
                  <Button variant="destructive" className='rounded-full'>
                    <PenBox size={20} className='mr-2'/>
                    Post a Job</Button>
              </Link>
            )}
            <UserButton
                appearance={{elements:{avatarBox:"w-10 h-10"}}}>
                <UserButton.MenuItems>
                  <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15}/>}
                  href='/my-jobs'
                  />
                  <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15}/>}
                  href='/saved-jobs'
                  />
                </UserButton.MenuItems>
              </UserButton>
              
          </SignedIn>
        </div>
        {
          showSignedIn && <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60' onClick={handleOverLayClick}>
            <SignIn signUpForceRedirectUrl='/onboarding'
                fallbackRedirectUrl='/onboarding'
            />
          </div>
        }        

      </nav>
    </>
  )
}

export default Header;