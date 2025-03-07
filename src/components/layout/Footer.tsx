export default function Footer() {
  return (
    <footer className="bg-blue-50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-primary">Brilliware</h2>
            <p className="text-gray-600 mt-1">Innovative software solutions</p>
            <p className="text-gray-600 mt-1">
              Contact:{" "}
              <a
                href="mailto:careers@brilliware.com"
                className="text-primary hover:underline"
              >
                careers@brilliware.com
              </a>
            </p>
          </div>
          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Brilliware. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
