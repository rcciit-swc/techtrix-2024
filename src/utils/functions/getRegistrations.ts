import { supabase } from "@/lib";

export const getRegistrations = async () => {
  const { data, error } = await supabase
    .from("teams")
    .select("*,participations(*),events(event_name,fest_name,max_team_member)");

  let filteredData: any = [];
  await Promise.all(
    (data || []).map(async (res: any) => {
      if (res.events.fest_name === "Techtrix") {
        res['team_college'] = res.college;
        filteredData.push(res);
        const { data: swcCleared, error } = await supabase
          .from("users")
          .select("swc,college,name,phone,email")
          .eq("phone", res.team_lead_phone);

        res["team_lead_name"] = swcCleared![0]?.name;
        res["team_lead_email"] = swcCleared![0]?.email;

        res["college"] = swcCleared![0]?.college;
        if (swcCleared![0]?.swc!) {
          res["swc"] = "Yes";
        } else {
          res["swc"] = "No";
        }
      }
    })
  );

  filteredData?.forEach((res: any) => {
    if (res.events.max_team_member > 1) {
      res["team_type"] = "Team";
    } else {
      res["team_type"] = "Individual";
    }
  });
  return filteredData;
};
