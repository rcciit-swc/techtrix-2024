import { supabase } from "@/lib";

export const eventReg = async(team:any,participants:any,file:any,event:any) => {
    const eventResponse = await supabase.from('events').select('*').eq('event_name',event);
    const eventId = eventResponse.data![0].id;
    let teamId="";
    const eventType = eventResponse.data![0].max_team_member > 1 ? 'team' : 'individual';
    console.log(eventType);
    if(eventType==="team"){
        const {data} = await supabase.from('teams').insert({
            team_name:team.teamName,
            event_id:eventId,
            team_lead_phone:team.teamLeadPhone,
            transaction_id:team.transactionId,
            transaction_ss_filename:file.name!,
        }).select();
        teamId = data![0].team_id!
     participants.forEach(async (participant:any)=>{
         await supabase.from('participations').insert({
             team_id:teamId,
             phone:participant.phone,
        }).select();
     })

    }

    if(eventType==="individual"){
        const {data:individualData,error:individualError} = await supabase.from('teams').insert({
            team_name:team.teamName,
            event_id:eventId,
            team_lead_phone:team.teamLeadPhone,
            transaction_id:team.transactionId,
            transaction_ss_filename:file.name!,
        }).select();
        teamId = individualData![0].team_id!
        const {data:participantData,error:participantError} = await supabase.from('participations').insert({
            team_id:individualData![0].team_id!,
            phone:team.teamLeadPhone,
        }).select();
        if(individualError || participantError){
            console.log(individualError,participantError);
        }
        console.log(individualData,participantData);
    }
    const { data: uploadFile, error: uploadError } = await supabase.storage
    .from("fests")
    .upload(
      `Techtrix/2024/${eventId}/transactions/${teamId}.png`,
      file!,
    );
    console.log(uploadFile)

}