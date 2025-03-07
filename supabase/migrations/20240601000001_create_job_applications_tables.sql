-- Create job_listings table
CREATE TABLE IF NOT EXISTS job_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements JSONB NOT NULL,
  responsibilities JSONB NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_listing_id UUID NOT NULL REFERENCES job_listings(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create supporting_documents table
CREATE TABLE IF NOT EXISTS supporting_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_application_id UUID NOT NULL REFERENCES job_applications(id),
  document_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporting_documents ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access for job_listings" ON job_listings;
CREATE POLICY "Public read access for job_listings"
  ON job_listings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin access for job_listings" ON job_listings;
CREATE POLICY "Admin access for job_listings"
  ON job_listings FOR ALL
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public insert access for job_applications" ON job_applications;
CREATE POLICY "Public insert access for job_applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin access for job_applications" ON job_applications;
CREATE POLICY "Admin access for job_applications"
  ON job_applications FOR ALL
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public insert access for supporting_documents" ON supporting_documents;
CREATE POLICY "Public insert access for supporting_documents"
  ON supporting_documents FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin access for supporting_documents" ON supporting_documents;
CREATE POLICY "Admin access for supporting_documents"
  ON supporting_documents FOR ALL
  USING (auth.role() = 'authenticated');

-- Enable realtime
alter publication supabase_realtime add table job_listings;
alter publication supabase_realtime add table job_applications;
alter publication supabase_realtime add table supporting_documents;
