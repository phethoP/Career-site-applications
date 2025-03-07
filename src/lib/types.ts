export interface JobListing {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  slug: string;
  closing_date?: string;
}

export interface JobApplication {
  id?: string;
  jobListingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  supportingDocuments?: SupportingDocument[];
  status?: string;
  createdAt?: string;
}

export interface SupportingDocument {
  id?: string;
  jobApplicationId?: string;
  documentUrl: string;
  fileName: string;
  createdAt?: string;
}
