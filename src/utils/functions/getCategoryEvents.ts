import { supabase } from "@/lib";

export const getCategoryEvents = async(category:any)=>{
    try{
      
        const categoryDetails = await supabase
        .from("event_categories")
        .select("events(*)")
        .eq("name", category);
        
        // const events = categoryDetails.data![0].events ;
        const events = categoryDetails.data![0].events.map((event: any) => ({
            ...event,
            category_name: category
        }));
        return events;
    }
    catch(e){
        console.log(e);
    }
}