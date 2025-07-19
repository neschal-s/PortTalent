import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {  Carousel,CarouselContent,CarouselItem } from "@/components/ui/carousel"
import companies from '@/data/companies.json'
import Autoplay from "embla-carousel-autoplay"
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card"


const landingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extralight sm:text-6xl lg:text-8xl tracking-tighter py-4'>
          Find your Dream Job 
          <span className='flex items-center gap-2 sm:gap-6'>
            and get Hired
          </span>
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore thousands of job listings or find the perfect candidate
        </p>

      </section>
      <div className='flex gap-6 justify-center'>
        <Link className='btn btn-primary' to='/jobs'>
          <Button variant='blue' size='xl'>Find Jobs</Button>
        </Link>
        <Link className='btn btn-primary' to='/post-job'>
          <Button variant='destructive' size='xl'>Post a Job</Button>
        </Link> 
      </div>
      <div>
        <Carousel plugins={[Autoplay({ delay: 2000})]} 
          className="w-full py-10">
          <CarouselContent className='gap-5 flex sm:gap-20 items-center'>
            {companies.map(({name,id,path})=>{
                return <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
                        <img src={path} alt={name} className='h-9 sm:h-14 object-contain'/>                     
                  
                        </CarouselItem>

            })}
          </CarouselContent>
        </Carousel>
      </div>

      <img src="./banner.jpeg" alt="banner" className='w-full'/>


      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='font-light'>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='font-extralight'>
              Search and apply for jobs, track applications, and more.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='font-light'>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='font-extralight'>Post jobs, manage applications, and find the best candidate.</p>
          </CardContent>
        </Card>
      </section>

      {/* accordian */}
    </main>
  )
}

export default landingPage