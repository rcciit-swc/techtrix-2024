import { supabase } from "@/lib";

export async function getUserInfo() {
  const { data, error } = await supabase.auth.getSession();
  const userDetails = await supabase
    .from("users")
    .select()
    .eq("id", data.session?.user.id);

  if (error) {
    throw error;
  }

  return userDetails?.data?.[0];
}
