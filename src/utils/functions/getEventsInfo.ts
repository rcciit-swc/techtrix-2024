import { supabase } from "@/lib";

export const getEventInfo = async (name:any) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .select("*,roles(users(name,phone))")
            .eq("event_name",name);
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    }
}