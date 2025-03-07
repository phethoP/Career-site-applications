import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJobListings } from "@/lib/api";
import { Database } from "@/lib/database.types";

type JobListing = Database["public"]["Tables"]["job_listings"]["Row"];

export default function CareersPage() {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobListings() {
      try {
        const listings = await getJobListings();
        setJobListings(listings);
      } catch (err) {
        console.error("Error loading job listings:", err);
        setError("Failed to load job listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadJobListings();
  }, []);

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Careers at Brilliware
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our team of talented professionals and help us build
              innovative software solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-8">
              Current Openings
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <p>Loading job listings...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : jobListings.length === 0 ? (
              <div className="text-center py-8">
                <p>
                  No job openings available at the moment. Please check back
                  later.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobListings.map((job) => (
                  <Card
                    key={job.id}
                    className="shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>
                        {job.location} • {job.job_type}
                        {job.closing_date && (
                          <div className="mt-1 text-sm font-medium text-amber-600">
                            Closing Date:{" "}
                            {new Date(job.closing_date).toLocaleDateString()}
                          </div>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{job.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {(job.requirements as string[]).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">
                          Responsibilities:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {(job.responsibilities as string[]).map(
                            (resp, index) => (
                              <li key={index}>{resp}</li>
                            ),
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-primary">
                          Benefits:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {((job.benefits as string[]) || []).map(
                            (benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/careers/${job.slug}`}>
                        <Button>Apply Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
