"use client"; // This is a client component
import { useState } from "react";
import RecipeCard from "../Components/Recipe";
import IngredientSelector from "../Components/IngredientSelector/IngredientSelector";
import { Button } from "@material-tailwind/react";


export interface Recipe {
    Calories: string;
    CookTime?: number[];
    Name: string;
    PrepTime?: number[];
    RecipeServings?: string;
    TotalTime?: number[];
    id: string;
}

export interface Match {
    matchingScore: number;
    recipe: Recipe;
    matchingIngredients: string[];
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
                    <h2 className="text-4xl font-bold mb-4">PAN-TRY IT OUT</h2>
                    <p className="text-lg mb-8">
                        Insert your ingredients and we will find the best recipes for you
                    </p>
                    <IngredientSelector ingredients={ingredients} setIngredients={setIngredients} runQuery={runQuery} />
                    <div className="mt-6 border-4 rounded-xl p-4">
                        {loading && (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-200"></div>
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-400"></div>
                            </div>
                        )}
                        {result && !loading && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {result.map((match) => (
                                    <RecipeCard key={match.recipe.id} match={match} />
                                ))}
                                <Button
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
