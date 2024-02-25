import { supabase } from "@/lib"

export const getRegistrations = async () => {
    const {data,error} = await supabase.from('teams').select('*,participations(*),events(event_name,max_team_member)');
    data?.forEach((res:any) => {
       if(res.events.max_team_member > 1){
          res['team_type'] = 'Team';
       }
         else{
            res['team_type'] = 'Individual';
         }
    })
    return data;
}