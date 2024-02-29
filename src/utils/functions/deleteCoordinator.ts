import { supabase } from "@/lib";

export const deleteCoordinator = async ({ id }: { id: any }) => {
  await supabase.from("roles").delete().eq("id", id);
};
