"use client"; // This is a client component
import { useState } from "react";
import RecipeCard from "./Components/Recipe";
import IngredientSelector from "./Components/IngredientSelector/IngredientSelector";
import { Button } from "@material-tailwind/react";
import { FeatureCard } from "./Components/FeatureCard";
import { FaSearch } from "react-icons/fa";


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
  const [limit, setLimit] = useState(20);
  const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/neo4j/matchIngredients";

  function runQuery(ingredients: string[]) {
    console.log("Running a query");
    setLoading(true);
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
        limit: limit,
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
    <div className="bg-black min-h-screen">
      <section className="flex items-center justify-center text-center text-white py-20">
        <div>
          <h2 className="text-4xl font-bold mb-4">TASTE TRIOS</h2>
          <p className="text-lg mb-8">
            Your one-stop solution for modern web design and development.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard featureName="Search" description="Ciao ciao ciao" featureRoute="/ciao" icon={FaSearch} />
          </div>
          <IngredientSelector ingredients={ingredients} setIngredients={setIngredients} runQuery={runQuery} />
          <div className="space-x-4">
            <button
              className="bg-blue-500 px-6 py-2 rounded-full shadow-md hover:bg-blue-700"
              onClick={() => runQuery(ingredients)}
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
                <Button
                  color="blue"
                  className="col-span-full"
                  onClick={() => {
                    setLimit((prev) => prev + 10)
                    runQuery(ingredients)
                  }}
                  placeholder=""
                  onPointerEnterCapture={() => { }}
                  onPointerLeaveCapture={() => { }}
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
