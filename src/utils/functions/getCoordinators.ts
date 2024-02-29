import { supabase } from "@/lib";

export const getCoordinators = async(event:any) => {
    try{
        const coordinators:any = [];
        const { data, error } = await supabase
        .from('roles')
        .select('users(name,email,phone,id)')
        .eq('event_id', event);
        return data;
    }
    catch(e){
        // console.log(e);
    }
};