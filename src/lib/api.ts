import { supabase } from "./supabase";
import { Database } from "./database.types";
import { uploadFile } from "./storage";

type JobListing = Database["public"]["Tables"]["job_listings"]["Row"];
type JobApplication =
  Database["public"]["Tables"]["job_applications"]["Insert"];
type SupportingDocument =
  Database["public"]["Tables"]["supporting_documents"]["Insert"];

export async function getJobListings(): Promise<JobListing[]> {
  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching job listings:", error);
    return [];
  }

  return data || [];
}

export async function getJobListingBySlug(
  slug: string,
): Promise<JobListing | null> {
  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching job listing:", error);
    return null;
  }

  return data;
}

export async function submitJobApplication(
  jobListingId: string,
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    resumeFile: File;
    supportingDocFiles: File[];
    coverLetter: string;
  },
): Promise<{ success: boolean; applicationId?: string; error?: string }> {
  try {
    // 1. Upload resume
    const resumeUrl = await uploadFile(
      formData.resumeFile,
      "resumes",
      "applications",
    );
    if (!resumeUrl) {
      return { success: false, error: "Failed to upload resume" };
    }

    // 2. Insert job application
    const { data: applicationData, error: applicationError } = await supabase
      .from("job_applications")
      .insert({
        job_listing_id: jobListingId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        resume_url: resumeUrl,
        cover_letter: formData.coverLetter,
      })
      .select()
      .single();

    if (applicationError) {
      console.error("Error submitting job application:", applicationError);
      return { success: false, error: applicationError.message };
    }

    // 3. Upload supporting documents if any
    if (formData.supportingDocFiles.length > 0) {
      const supportingDocPromises = formData.supportingDocFiles.map(
        async (file) => {
          const docUrl = await uploadFile(
            file,
            "supporting-documents",
            "applications",
          );
          if (docUrl) {
            return {
              job_application_id: applicationData.id,
              document_url: docUrl,
              file_name: file.name,
            };
          }
          return null;
        },
      );

      const supportingDocs = (await Promise.all(supportingDocPromises)).filter(
        Boolean,
      ) as SupportingDocument[];

      if (supportingDocs.length > 0) {
        const { error: docsError } = await supabase
          .from("supporting_documents")
          .insert(supportingDocs);

        if (docsError) {
          console.error("Error uploading supporting documents:", docsError);
          // We don't fail the whole submission if supporting docs fail
        }
      }
    }

    return { success: true, applicationId: applicationData.id };
  } catch (error) {
    console.error("Error in submitJobApplication:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
