import { supabase } from "@/lib";
import { eventInputType } from "@/types/events";

export const addEvent = async (event: eventInputType) => {
  console.log(event);
  try {
    if (
      event.name === "" ||
      event.category === "" ||
      event.description === "" ||
      event.imagePath === "" ||
      event.maxTeamSize === 0 ||
      event.minTeamSize === 0
    ) {
      return;
    }
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
        time: event.time,
        date: event.date,
        rules: event.rules,
        prize: event.prize,
        event_image_url: event.imagePath,
        registration_fees: event.price,
        year: data![0].year,
        desc: event.description,
      })
      .select();
    const emails: any = [];
    event?.coordinators?.map((coordinator) => emails.push(coordinator.email));
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id")
      .in("email", emails);

    const userIds: any = [];
    users?.map((user) => userIds.push(user.id));
    console.log(userIds);
    const { data: coordinatorData, error: coordinatorError } = await supabase
      .from("roles")
      .insert(
        userIds!.map((id: any) => ({
          id,
          role: "event_coordinator",
          event_id: eventData![0].id,
        }))
      )
      .select();
    console.log(data);
    console.log(coordinatorData);
    console.log(eventData);
  } catch (e) {
    console.log(e);
  }
};
