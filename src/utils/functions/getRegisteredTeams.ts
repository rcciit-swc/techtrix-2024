import { supabase } from "@/lib";

interface Params {
    phone_param?: string;
    transaction_id_param?: string;
    event_id_param?: string;
}

export async function getRegisteredTeams(params?:Params) {

    const computedParams = !!params ? Object.keys(params || {} as Params).reduce((acc, key) => {
        const value = params[key as keyof Params];
        return {
            ...acc,
            ...includeParam({ param: key, value }),
        };
    }, {} as Params): {};

    const { data, error } = await supabase.rpc("fetch_team_registrations_by_events", computedParams);
    if (error) {
        throw error;
      }
    
      return data;
}

const includeParam = ({ param, value }: { param: string; value?: string }) => {
    return !!value ? {
        [param]: value,
    } : {};
}