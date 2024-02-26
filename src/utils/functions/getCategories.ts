import { supabase } from "@/lib";

export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("event_categories")
      .select("id ,name")
      .eq("fest_name", "Techtrix");
    // console.log(data);
    return data;
  } catch (e) {
    // console.log(e);
  }
};
