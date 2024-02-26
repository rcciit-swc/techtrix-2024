import { supabase } from "@/lib";

export async function getImageUrl({
    eventId,
    fileName,
}: {
  eventId: string;
  fileName: string;
}) {
  const { data } = supabase.storage.from("fests").getPublicUrl(`Techtrix/2024/${eventId}/transactions/${fileName}`);

  if (!data) {
    throw new Error("Image not found");
  }

  return data;
}