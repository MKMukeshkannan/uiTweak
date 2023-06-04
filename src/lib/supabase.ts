import { createClient } from "@supabase/supabase-js";
import html2canvas from "html2canvas";

export const supabase = createClient(
  "https://abolnjytttxdqfzduovc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFib2xuanl0dHR4ZHFmemR1b3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1MzgyOTksImV4cCI6MjAwMTExNDI5OX0.Jr2gEhnOdbGRmb-rkW5v-zgrdcARrTjJDTzeRiPdWGw"
);

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
