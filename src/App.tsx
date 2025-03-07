import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import HomePage from "./pages/HomePage";
import CareersPage from "./pages/CareersPage";
import JobApplicationPage from "./pages/JobApplicationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:jobId" element={<JobApplicationPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
