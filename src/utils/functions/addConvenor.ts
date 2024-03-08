import { supabase } from "@/lib";

export const addConvenor = async (inputs: any) => {
  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("phone", inputs.phone);

    const { data: event, error: eventError } = await supabase
      .from("event_categories")
      .select("id")
      .eq("name", inputs.category);

    const { data: coordinator, error: coordinatorError } = await supabase
      .from("roles")
      .insert({
        id: user![0].id,
        role: "convenor",
        event_category_id: event![0].id,
      })
      .select();

    console.log(coordinator);
  } catch (e) {
    // console.log(e);
  }
};
