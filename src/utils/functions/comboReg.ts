import { supabase } from "@/lib";

export const comboReg = async (inputs: any, eventInputs: any, file: any) => {
  //   console.log(inputs, eventInputs, file);

  try {
    const promises = eventInputs.map(async (eventInput: any) => {
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert([
          {
            event_id: eventInput.id,
            team_name: inputs.teamName,
            team_lead_phone: inputs.teamLeadPhone,
            transaction_id: eventInput.eventName + "-" + inputs.transactionId,
            transaction_ss_filename: eventInput.eventName + "-" + file.name!,
            referral_code:
              inputs.referralCode !== "" ? inputs.referralCode : "default",
          },
        ])
        .select();

      if (teamError) {
        throw new Error(`Error inserting team: ${teamError.message}`);
      }
      //   console.log(teamData, "teamData")
      const teamId = teamData![0].team_id;

      const participantPromises = eventInput.participants.map(
        async (participant: any) => {
          const { error: participantError } = await supabase
            .from("participations")
            .insert([
              {
                team_id: teamId,
                phone: participant.phone,
                name: participant.name,
              },
            ])
            .select();

          const { data: uploadFile, error: uploadError } =
            await supabase.storage
              .from("fests")
              .upload(
                `Techtrix/2024/${eventInput?.id}/transactions/${
                  eventInput.eventName
                }-${file.name!}`,
                file!
              );
          console.log(uploadFile, "uploadFile");
          if (participantError) {
            throw new Error(
              `Error inserting participation record: ${participantError.message}`
            );
          }
        }
      );

      await Promise.all(participantPromises);
    });

    await Promise.all(promises);
    // console.log("Combo registration successful");
  } catch (error) {
    // console.error("Combo registration failed:", error);
  }
};
