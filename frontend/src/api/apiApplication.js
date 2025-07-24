import supabaseClient from "@/utils/supabase";
// import { superBaseUrl } from "@/utils/constants";


export async function applyToJob(token,_,jobData){
    const supabase=await supabaseClient(token);

    const random=Math.floor(Math.random()*90000);
    const fileName=`resume-${random}-${jobData.candidate_id}`

    const {error:storageError}=await supabase.storage.from('resumes').upload(fileName,jobData.resume);
    // const {data,error}=await supabase.from("jobs").update({isOpen}).eq("id",job_id).select();
    if(storageError){
        console.error("Error Uploading Resume",storageError);
        return null;
    }
    const resume=`${superBaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    const {data,error}=await supabase.from("applications").insert([{...jobData,resume,},]).select();

    if(error){
        console.error("Error submitting Application",error);
        return null;
    }
    return data;
}


export async function updateApplicationStatus(token,{job_id},status){
    const supabase=await supabaseClient(token);

    const {data,error}=await supabase.from("companies").update({status}).eq("job_id",job_id).select();
    if(error || data.length===0){
        console.error("Error Updating Application status",error);
        return null;
    }
    return data;
}