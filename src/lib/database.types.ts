export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      job_applications: {
        Row: {
          id: string;
          job_listing_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          resume_url: string;
          cover_letter: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_listing_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          resume_url: string;
          cover_letter: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_listing_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          resume_url?: string;
          cover_letter?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      job_listings: {
        Row: {
          id: string;
          title: string;
          location: string;
          job_type: string;
          description: string;
          requirements: Json;
          responsibilities: Json;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          location: string;
          job_type: string;
          description: string;
          requirements: Json;
          responsibilities: Json;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          location?: string;
          job_type?: string;
          description?: string;
          requirements?: Json;
          responsibilities?: Json;
          slug?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      supporting_documents: {
        Row: {
          id: string;
          job_application_id: string;
          document_url: string;
          file_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_application_id: string;
          document_url: string;
          file_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          job_application_id?: string;
          document_url?: string;
          file_name?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
