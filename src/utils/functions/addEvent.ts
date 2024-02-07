import { supabase } from "@/lib";
import { eventInputType } from "@/types/events";

export const addEvent = async (event: eventInputType) => {
  console.log(event);
  try {
    const { data, error } = await supabase
      .from("event_categories")
      .insert({ name: event.category, year: 2024, fest_name: "Techtrix" })
      .select();
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .insert({
        event_category_id: data![0].id,
        fest_name: data![0].fest_name,
        min_team_member: event.minTeamSize,
        max_team_member: event.maxTeamSize,
        event_name: event.name,
        event_image_url: event.imagePath,
        registration_fees: event.price,
        year: data![0].year,
        desc: event.description,
      })
      .select();
    console.log(data);
    console.log(eventData);
  } catch (e) {
    console.log(e);
  }
};
