import { supabase } from "@/lib";

export const getRegbyUser = async (user: any) => {
  try {
    const { data, error } = await supabase
      .from("participations")
      .select("teams(*)")
      .eq("phone", user.phone);
    let teams: any = [];
    data?.map(async (team: any) => {
        teams.push(team.teams);
    })
    data?.map(async(team: any,index:number) => {
       
        const {data:members,error:memberError} = await supabase.from("participations").select("*").eq("team_id",team.teams.team_id);
        teams[index].members = members;
        
    });
    return teams;
  } catch (e) {
    //  console.log(e);
  }
};

