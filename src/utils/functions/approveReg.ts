import { supabase } from "@/lib"

export const approveReg = async ({teamId}:{
    teamId:string
})=>{
    const {error} = await supabase.from('teams').update({transaction_verified:true}).eq('team_id',teamId);
    if(error){
        return false;
    }
    return true;
}