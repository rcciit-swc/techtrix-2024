import { supabase } from "@/lib";

export const getEvents = async () => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*,event_categories(name)")
      .eq("fest_name", "Techtrix");
    // console.log(data);
    return data;
  } catch (e) {
    // console.log(e);
  }
};
