import { supabaseClient } from '@/lib/supabaseClient';

export const getJobs = async (token) => {
    const supabase = await supabaseClient(token);

    // let query= supabase.from("jobs").select("*");

    const { data, error } = await supabaseClient
    .from('jobs')
    .select('*')
    .eq('isOpen', true);

  if (error) throw error;
  return data;

}