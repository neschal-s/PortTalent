import { getJobs } from '@/api/apiJobs';
import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import BarLoader from 'react-spinners/BarLoader';
import JobCard from '@/components/job-card';

const JobListing = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const { isLoaded, session } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    error: errorJobs
  } = useFetch(getJobs);

  // console.log(dataJobs);

  useEffect(() => {
    if (isLoaded && session) {
      fnJobs({ location, company_id, searchQuery });
    }
  }, [isLoaded, session, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
  }

  return <div>
    <h1 className='gradient-title font-light text-6xl sm:text-7xl text-center pb-8'>
      Latest Jobs
    </h1>

    {loadingJobs && (<BarLoader className='mt-4' width={'100%'} color='#36d7b7' />)}

    {loadingJobs === false && (
      <div>{jobs?.length ? (
        jobs.map((job) => {
          return (<JobCard
            key={job.id}
            job={job}
            savedInit={job?.saved?.length > 0}
          />
          );
        })
      ) : (
        <p className='text-center text-gray-500'>No jobs found</p>
      )}</div>
    )}

  </div>
}

export default JobListing