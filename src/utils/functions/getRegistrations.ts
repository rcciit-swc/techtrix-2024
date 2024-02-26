import { supabase } from "@/lib"

export const getRegistrations = async () => {
    
    const {data,error} = await supabase.from('teams').select('*,participations(*),events(event_name,fest_name,max_team_member)');
  let filteredData:any = [];
    data?.map((res:any) => {
      if(res.events.fest_name === 'Techtrix'){
         filteredData.push(res);
      }
      
    })
   //  console.log(filteredData)
    filteredData?.forEach((res:any) => {
       if(res.events.max_team_member > 1){
          res['team_type'] = 'Team';
       }
         else{
            res['team_type'] = 'Individual';
         }
    })
    return filteredData;
}