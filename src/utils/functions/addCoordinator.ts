import { supabase } from "@/lib";

export const addCoordinator = async (inputs: any) => {
  try {
    console.log(inputs)
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", inputs.email);
      console.log(user)

    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("id")
      .eq("event_name", inputs.event);
      console.log(event)

    const { data: coordinator, error: coordinatorError } = await supabase
      .from("roles")
      .insert({
        id: user![0].id,
        role: "event_coordinator",
        event_id: event![0].id,
      })
      .select();

      console.log(coordinator)
    // console.log(coordinator);
  } catch (e) {
    // console.log(e);
  }
};
