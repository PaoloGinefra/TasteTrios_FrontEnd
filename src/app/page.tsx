"use client"; // This is a client component
import { useState } from "react";
import RecipeCard from "./Components/Recipe";
import IngredientSelector from "./Components/IngredientSelector/IngredientSelector";
interface Recipe {
  Calories: string;
  CookTime?: string;
  Name: string;
  PrepTime?: string;
  RecipeServings?: string;
  TotalTime?: string;
  id: string;
}

interface Match {
  matchingScore: number;
  recipe: Recipe;
}

interface QueryResult {
  recipes: Match[];
}

export default function Home() {
  const [result, setResult] = useState<Match[] | null>(null); // Typed state
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/neo4j/matchIngredients";

  function runQuery() {
    console.log("Running a query");
    setLoading(true);
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
        limit: 20,
      }),
    })
      .then((res) => res.json())
      .then((data: QueryResult) => {
        console.log("Data:", data);
        setResult(data.recipes);
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setLoading(false);
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
          <IngredientSelector ingredients={ingredients} setIngredients={setIngredients} />
          <div className="space-x-4">
            <button
              className="bg-blue-500 px-6 py-2 rounded-full shadow-md hover:bg-blue-700"
              onClick={runQuery}
              disabled={loading}
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
                {result.map((match) => (
                  <RecipeCard key={match.recipe.id} title={match.recipe.Name + " - " + match.matchingScore} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
