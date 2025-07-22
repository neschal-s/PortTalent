import { useSession } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { getJobs } from '@/api/apiJobs';

const JobListing = () => {
  const { session, isLoaded } = useSession();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!isLoaded || !session) return;

      try {
        const supabaseAccessToken = await session.getToken({
          template: 'supabase',
        });
        const jobs = await getJobs(supabaseAccessToken);
        console.log(jobs);
      } catch (error) {
        console.error('Error fetching jobs:',error);
      }
    };

    fetchJobs();
  }, [isLoaded, session]);

  return <div>Loading jobs...</div>;
};

export default JobListing;
