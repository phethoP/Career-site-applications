import { supabase } from "./supabase";

export async function uploadFile(
  file: File,
  bucket: string,
  path: string,
): Promise<string | null> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return publicUrl;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    return null;
  }
}
