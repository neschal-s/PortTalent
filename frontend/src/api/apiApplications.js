export async function updateHiringStatus(token,{job_id},isOpen){
    const supabase=await supabaseClient(token);

    const {data,error}=await supabase.from("jobs").update({isOpen}).eq("id",job_id).select();
    if(error){
        console.error("Error Updating Job",error);
        return null;
    }
    return data;
}
