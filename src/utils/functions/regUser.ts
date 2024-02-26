import { supabase } from "@/lib";

export const regUser = async (inputs: any,userId:string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        name: inputs.name,
        college: inputs.college,
        phone: inputs.phone,
        gender: inputs.gender,
        college_roll: inputs?.roll!,
      }).eq("id",userId).select();
    return data;
  } catch (e) {
    console.log(e);
  }
};
