import { supabase } from "@/lib";

export const login = async () => {
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: location.origin + "/auth/callback?next=",
    },
  });
};
