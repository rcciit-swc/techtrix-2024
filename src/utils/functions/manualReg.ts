import { supabase } from "@/lib";
import { v4 as uuidv4 } from "uuid";
import { v1 as uuidv1 } from "uuid";
export const manualReg = async (
  team: any,
  participants: any,
  file: any,
  eventId: any,
  swc: boolean
) => {
  const eventResponse = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  let teamId = "";
  const eventType =
    eventResponse.data![0].max_team_member > 1 ? "team" : "individual";
  if (eventType === "team") {
    const { data } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_phone: team.teamLeadPhone,
        transaction_id: uuidv4() ,
        transaction_ss_filename:  uuidv1(),
        referral_code: "default",
        transaction_verified: true,
        reg_mode: team.regMode,
        college: team.college,
      })
      .select();
    teamId = data![0].team_id!;
    participants.forEach(async (participant: any) => {
      await supabase
        .from("participations")
        .insert({
          team_id: teamId,
          phone: participant.phone,
          name: participant.name,
          //  email:participant.email,
        })
        .select();
    });
  }

  if (eventType === "individual") {
    const { data: individualData, error: individualError } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_phone: team.teamLeadPhone,
        transaction_id: uuidv4(),
        transaction_ss_filename: uuidv1(),
        referral_code: "default",
        transaction_verified: true,
        reg_mode: team.regMode,
        college: team.college,
      })
      .select();
    teamId = individualData![0].team_id!;
    const { data: participantData, error: participantError } = await supabase
      .from("participations")
      .insert({
        team_id: individualData![0].team_id!,
        phone: team.teamLeadPhone,
        name: team.teamLeadName,
      })
      .select();
    if (individualError || participantError) {
      // console.log(individualError, participantError);
    }
    // console.log(individualData, participantData);
  }
  // console.log(uploadFile);
};
