import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Loader2 } from "lucide-react";
import { getJobListingBySlug, submitJobApplication } from "@/lib/api";
import { Database } from "@/lib/database.types";

type JobListing = Database["public"]["Tables"]["job_listings"]["Row"];

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  coverLetter: z
    .string()
    .min(50, { message: "Cover letter must be at least 50 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function JobApplicationPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [supportingDocFiles, setSupportingDocFiles] = useState<File[]>([]);
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
  });

  useEffect(() => {
    async function loadJobListing() {
      if (!jobId) return;

      try {
        const jobData = await getJobListingBySlug(jobId);
        if (jobData) {
          setJob(jobData);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        console.error("Error loading job listing:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    }

    loadJobListing();
  }, [jobId]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSupportingDocChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setSupportingDocFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!resumeFile) {
      setSubmitError("Please upload your resume");
      return;
    }

    if (!job) {
      setSubmitError("Job information is missing");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitJobApplication(job.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        resumeFile,
        supportingDocFiles,
        coverLetter: data.coverLetter,
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || "Failed to submit application");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4">Loading job details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold mb-4">Job Not Found</h1>
          <p className="mb-6">
            {error || "The job you're looking for doesn't exist."}
          </p>
          <Button onClick={() => navigate("/careers")}>Back to Careers</Button>
        </div>
      </Layout>
    );
  }

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Alert className="bg-green-50 border-green-200 mb-6">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-semibold">
                Application Submitted!
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Thank you for applying to the {job.title} position. We'll review
                your application and get back to you soon.
              </AlertDescription>
            </Alert>
            <Button onClick={() => navigate("/careers")}>
              Back to Careers
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Apply for {job.title}</CardTitle>
              <CardDescription>
                {job.location} • {job.job_type}
                {job.closing_date && (
                  <div className="mt-1 text-sm font-medium text-amber-600">
                    Applications close on:{" "}
                    {new Date(job.closing_date).toLocaleDateString()}
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {job.benefits && (job.benefits as string[]).length > 0 && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Benefits
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {(job.benefits as string[]).map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {submitError && (
                <Alert className="mb-6 bg-red-50 border-red-200 text-red-800">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.doe@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="resume">Resume</Label>
                      <div className="mt-1">
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeChange}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("resume")?.click()
                            }
                          >
                            Upload Resume
                          </Button>
                          {resumeFile && (
                            <span className="text-sm text-gray-600">
                              {resumeFile.name}
                            </span>
                          )}
                        </div>
                        {!resumeFile && (
                          <p className="text-sm font-medium text-destructive mt-1">
                            Please upload your resume
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Accepted formats: PDF, DOC, DOCX
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="supportingDoc">
                        Supporting Documents
                      </Label>
                      <div className="mt-1">
                        <Input
                          id="supportingDoc"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={handleSupportingDocChange}
                          className="hidden"
                          multiple
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("supportingDoc")?.click()
                            }
                          >
                            Add Documents
                          </Button>
                        </div>
                        {supportingDocFiles.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">
                              Uploaded files:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {supportingDocFiles.map((file, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="truncate">{file.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Certificates, portfolios, or other relevant documents
                        (PDF, DOC, DOCX, JPG, PNG)
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us why you're interested in this position and why you'd be a good fit..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Briefly describe your relevant experience and why
                          you're interested in this position.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/careers")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
