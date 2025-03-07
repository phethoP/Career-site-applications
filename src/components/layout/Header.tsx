import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-blue-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">BrilliwareCareers</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
