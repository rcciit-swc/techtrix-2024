import { supabase } from "@/lib"

export const getUserData = async (id: string) => {
    const {data,error} = await supabase.from('users').select('*').eq('id',id)

    return data;
}