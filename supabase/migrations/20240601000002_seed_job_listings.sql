-- Seed job listings
INSERT INTO job_listings (title, location, job_type, description, requirements, responsibilities, slug)
VALUES 
('Frontend Developer', 'Remote', 'Full-time', 
 'Join our team as a Frontend Developer and help build beautiful, responsive user interfaces for our clients.',
 '["3+ years of experience with React", "Strong knowledge of HTML, CSS, and JavaScript", "Experience with responsive design and cross-browser compatibility", "Familiarity with modern frontend tools and libraries"]'::jsonb,
 '["Develop and maintain responsive web applications", "Collaborate with designers to implement UI/UX designs", "Write clean, maintainable, and efficient code", "Participate in code reviews and contribute to team discussions"]'::jsonb,
 'frontend-developer'),
 
('Backend Developer', 'Remote', 'Full-time', 
 'We''re looking for a Backend Developer to design and implement server-side applications and APIs.',
 '["3+ years of experience with Node.js or similar backend technologies", "Strong knowledge of database design and optimization", "Experience with RESTful API design and implementation", "Familiarity with cloud services (AWS, Azure, or GCP)"]'::jsonb,
 '["Design and develop scalable backend services and APIs", "Implement database schemas and optimize queries", "Ensure the security, performance, and reliability of applications", "Collaborate with frontend developers to integrate user-facing elements"]'::jsonb,
 'backend-developer')
ON CONFLICT (slug) DO NOTHING;
