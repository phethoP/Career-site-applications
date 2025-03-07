-- Add benefits column to job_listings table
ALTER TABLE job_listings ADD COLUMN benefits JSONB DEFAULT '[]'::jsonb;

-- Update existing job listings with sample benefits
UPDATE job_listings 
SET benefits = '[
  "Competitive salary",
  "Health insurance",
  "401(k) matching",
  "Flexible working hours",
  "Remote work options"
]'::jsonb 
WHERE benefits IS NULL OR benefits = '[]'::jsonb;
