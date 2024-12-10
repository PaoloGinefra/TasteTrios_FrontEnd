"use client"; // This is a client component
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/neo4j-data";

  function runQuery() {
    console.log("Running a query");
    setLoading(true); // Start loading
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data);
        setResult(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyWebsite</h1>
          <div className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex items-center justify-center text-center bg-blue-600 text-white py-20">
        <div>
          <h2 className="text-4xl font-bold mb-4">Welcome to MyWebsite</h2>
          <p className="text-lg mb-8">
            Your one-stop solution for modern web design and development.
          </p>
          <div className="space-x-4">
            <button
              className="bg-blue-500 px-6 py-2 rounded-full shadow-md hover:bg-blue-700"
              onClick={runQuery}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "RUN QUERY"}
            </button>
          </div>
          <div className="mt-6">
            {loading && (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-200"></div>
                <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-400"></div>
              </div>
            )}
            {result && !loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {result.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-lg shadow-md p-4 text-left"
                  >
                    <h3 className="text-xl font-bold text-blue-600 mb-2">
                      {recipe.Name}
                    </h3>
                    <p className="text-gray-700">
                      <strong>Calories:</strong> {recipe.Calories}
                    </p>
                    <p className="text-gray-700">
                      <strong>Servings:</strong> {recipe.RecipeServings || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Prep Time:</strong> {recipe.PrepTime || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Cook Time:</strong> {recipe.CookTime || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Total Time:</strong> {recipe.TotalTime || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
