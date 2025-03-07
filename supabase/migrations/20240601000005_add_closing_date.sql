-- Add closing_date column to job_listings table
ALTER TABLE job_listings ADD COLUMN closing_date DATE;

-- Update existing job listings with sample closing dates
UPDATE job_listings SET closing_date = CURRENT_DATE + INTERVAL '30 days' WHERE closing_date IS NULL;
