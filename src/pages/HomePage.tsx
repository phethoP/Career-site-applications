import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <Layout>
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Welcome to Brilliware
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We build innovative software solutions that transform businesses
              and drive growth.
            </p>
            <Link to="/careers">
              <Button size="lg">View Career Opportunities</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-6 text-center">
              About Us
            </h2>
            <p className="text-lg mb-6">
              Brilliware is a leading software development company specializing
              in creating custom solutions for businesses of all sizes. With a
              team of experienced developers, designers, and project managers,
              we deliver high-quality software that meets the unique needs of
              our clients.
            </p>
            <p className="text-lg mb-6">
              Our mission is to help businesses leverage technology to improve
              efficiency, enhance customer experiences, and achieve their goals.
              We pride ourselves on our collaborative approach, technical
              expertise, and commitment to excellence.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
