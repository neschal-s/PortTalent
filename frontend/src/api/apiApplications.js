import supabaseClient from "@/utils/supabase";
import { superBaseUrl } from "@/utils/constants"; // (if defined)


export async function applytoJob(token,_,jobData){
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