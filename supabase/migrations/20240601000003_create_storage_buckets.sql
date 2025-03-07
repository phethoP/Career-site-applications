-- Create storage buckets for resumes and supporting documents
INSERT INTO storage.buckets (id, name, public)
VALUES 
('resumes', 'resumes', true),
('supporting-documents', 'supporting-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Public read access for resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

CREATE POLICY "Public insert access for resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Public read access for supporting documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'supporting-documents');

CREATE POLICY "Public insert access for supporting documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'supporting-documents');
