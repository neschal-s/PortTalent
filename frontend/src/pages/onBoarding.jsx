import React from 'react'
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';


const OnBoarding = () => {

  const {user,isLoaded}=useUser();

  if(!isLoaded) return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <h2 className='gradient-title font-extralight text-7xl sm:text-8xl tracking-tighter'>
        I am a...
      </h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
        <Button variant='blue' className='h-36 text-2xl font-bold' onClick={()=>handleRoleSelection("candidate")}>
          Candidate
        </Button>
        <Button variant='destructive' className='h-36 text-2xl font-bold'
        onClick={()=>handleRoleSelection("recruiter")}>
            Recruiter
        </Button>
      </div>
    </div>
  )
}

export default OnBoarding;