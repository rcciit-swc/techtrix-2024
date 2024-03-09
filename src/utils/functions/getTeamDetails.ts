import { supabase } from "@/lib";

export const getTeamDetails = async (teamId: string) => {
  try {
    const { data: teamDetails, error } = await supabase
      .from("teams")
      .select("*,participations(phone,name),users(*)")
      .eq("team_id", teamId);
    return teamDetails;
  } catch (e) {
    console.log(e);
    return null;
  }
};
