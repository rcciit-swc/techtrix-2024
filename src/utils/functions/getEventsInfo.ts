import { supabase } from "@/lib";

export const getEventInfo = async (id:any) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .select("*,roles(users(name,phone)),event_categories(name)")
            .eq("id",id);
        // console.log(data);
        return data;
    } catch (e) {
        // console.log(e);
    }
}