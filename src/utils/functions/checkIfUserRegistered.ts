import { supabase } from "@/lib";


export async function checkIfUserRegistered({
  phone_param,
}: {
  phone_param: string;
}) {
  const { data, error } = await supabase.rpc("check_if_user_registered", {
    phone_param,
  });

  if (error) {
    throw error;
  }

  return data;
}