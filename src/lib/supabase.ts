import { createClient } from "@supabase/supabase-js";
import html2canvas from "html2canvas";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function uploadScreenshot(
  componentRef: HTMLDivElement,
  userId: any,
  tempId: string
): Promise<string> {
  if (componentRef === null) {
    console.log("null passed");
    return "error";
  }
  const canvas = await html2canvas(componentRef);

  const dataURL = canvas.toDataURL("image/jpeg", 0.5);
  const blob = await fetch(dataURL).then((res) => res.blob());
  const file = new File([blob], "component.jpeg", { type: blob.type });

  const { data } = await supabase.storage
    .from("templates")
    .upload(`${userId}/${tempId}`, file);

  if (data) {
    const { data: imgLink } = supabase.storage
      .from("templates")
      .getPublicUrl(`${userId}/${tempId}`);
    return imgLink.publicUrl;
  }
  return "error";
}
