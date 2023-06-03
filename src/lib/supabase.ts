import { createClient } from "@supabase/supabase-js";
import html2canvas from "html2canvas";
import { Dispatch } from "react";

export const supabase = createClient(
  "https://abolnjytttxdqfzduovc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFib2xuanl0dHR4ZHFmemR1b3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1MzgyOTksImV4cCI6MjAwMTExNDI5OX0.Jr2gEhnOdbGRmb-rkW5v-zgrdcARrTjJDTzeRiPdWGw"
);

export const fetchall = async (setTableData: Dispatch<any>) => {
  const { data, error } = await supabase.from("User").select();
  setTableData(data);
};

export const uploadScreenshot = async (componentRef, userId, tempId) => {
  const canvas = await html2canvas(componentRef.current);

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL("image/jpeg", 0.5);
  // Convert the data URL to a Blob object
  const blob = await fetch(dataURL).then((res) => res.blob());
  // Create a file object with the Blob
  const file = new File([blob], "component.jpeg", { type: blob.type });
  console.log(file);

  const { data, error } = await supabase.storage
    .from("templates")
    .upload(`${userId}/${tempId}`, file);

  if (data) console.log("kayile aagasam");
  else console.log("error");
};
