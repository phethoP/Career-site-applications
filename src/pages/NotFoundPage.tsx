import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </Layout>
  );
}
