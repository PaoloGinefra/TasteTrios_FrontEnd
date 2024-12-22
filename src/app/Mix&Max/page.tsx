"use client"; // This is a client component
import { useState } from "react";
import IngredientSelector from "../Components/IngredientSelector/IngredientSelector";
import { Button } from "@material-tailwind/react";
import IngredientCard from "../Components/IngredientCard";
import Plotter from "../Components/Plotter/Plotter";
import { PlottablePropertyConfig } from "../Components/Plotter/Formatter";
import NavBar from "../Components/NavBar";
import { FaCartArrowDown } from "react-icons/fa";

export interface IngredientMatch {
    matchedIngredient: string;
    recipeCount: number;
    avgOfAvgRatings: number;
    IngredientCompatibility: number;
}

interface QueryResult {
    ingredients: IngredientMatch[];
}

export default function Home() {
    const [result, setResult] = useState<IngredientMatch[] | null>(null); // Typed state
    const [loading, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [limit, setLimit] = useState(20);
    const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/neo4j/mixAndMax";

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
                setResult(data.ingredients);
            })
            .catch((err) => {
                console.error("Error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const recipeCountConfig: PlottablePropertyConfig<number, IngredientMatch> = {
        propertyName: "recipeCount",
        nBins: 20,
        collector: (match: IngredientMatch) => match.recipeCount,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " matched recipes"
    };

    const avgOfAvgRatingsConfig: PlottablePropertyConfig<number, IngredientMatch> = {
        propertyName: "avgOfAvgRatings",
        nBins: 20,
        collector: (match: IngredientMatch) => match.avgOfAvgRatings,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " stars"
    };

    const IngredientCompatibilityConfig: PlottablePropertyConfig<number, IngredientMatch> = {
        propertyName: "IngredientCompatibility",
        nBins: 20,
        collector: (match: IngredientMatch) => match.IngredientCompatibility,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " stars"
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const configs: PlottablePropertyConfig<any, IngredientMatch>[] = [
        recipeCountConfig,
        avgOfAvgRatingsConfig,
        IngredientCompatibilityConfig
    ]

    return (
        <div className="bg-black min-h-screen">
            <NavBar />
            <section className="flex items-center justify-center text-center text-white pt-10">
                <div>
                    <div className="flex align-middle justify-center text-9xl ">
                        <FaCartArrowDown />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">MIX & MAX</h2>
                    <p className="text-lg mb-8 max-w-lg mx-auto">
                        Insert the ingredients you have, we will suggest wich ones to buy to maximize the number of recipes you can make. Click on an ingredient to see the matched recipes.
                    </p>
                    <IngredientSelector ingredients={ingredients} setIngredients={setIngredients} runQuery={runQuery} />
                    <Plotter
                        data={result ?? []}
                        configs={configs}
                    />
                    <div className="mt-6 border-4 rounded-xl p-4">
                        {loading && (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-200"></div>
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-400"></div>
                            </div>
                        )}
                        {result && !loading && (
                            <div className="flex flex-wrap flex-row justify-center gap-6">
                                {result.map((match) => (
                                    <IngredientCard key={match.matchedIngredient} match={match} selectedIngredients={ingredients} />
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
