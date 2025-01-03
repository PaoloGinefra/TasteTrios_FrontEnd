"use client"; // This is a client component
import { useState } from "react";
import RecipeCard from "../Components/Recipe";
import { Button } from "@material-tailwind/react";
import Plotter from "../Components/Plotter/Plotter";
import { PlottablePropertyConfig } from "../Components/Plotter/Formatter";
import JsonVisualizer from "../Components/JsonVisualizer/JsonVisualizer";

export interface Recipe {
    Calories: string;
    CookTime?: number;
    Name: string;
    PrepTime?: number;
    RecipeServings?: number;
    TotalTime?: number;
    RecipeId: string;
    Description: string;
    RecipeIngredientParts: string;
    RecipeIngredientQuantities: string;
    RecipeInstructions: string;
    AggregatedRating?: number;
    Keywords?: string;
    DatePublished?: string;
    AuthorName?: string;
}

export interface Match {
    matchingScore: number;
    recipe: Recipe;
    matchingIngredients: string[];
}

export interface StandardQueryResult {
    recipes: Match[];
}

export interface AggQueryResult {
    aggregations: object;
}

export interface QueryResult {
    recipes?: Match[];
    aggregations?: object;
}

interface QueryResultPageProps {
    queryNumber: number;
    queryDescription: string;
    query: object;
}
export default function QueryResultPage({ queryNumber, queryDescription, query }: QueryResultPageProps) {
    const [result, setResult] = useState<Match[] | null>(null); // Typed state
    const [aggregations, setAggregations] = useState<object | null>(null); // New state for aggregations
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(20);
    const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/elasticsearch/queries?queryNumber=" + queryNumber + "&limit=" + limit;

    function runQuery() {
        console.log("Running a query");
        setLoading(true);
        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data: QueryResult) => {
                console.log("Data:", data);
                if (data.recipes) {
                    setResult(data.recipes);
                }
                if (data.aggregations) {
                    setAggregations(data.aggregations);
                }
            })
            .catch((err) => {
                console.error("Error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const publishedDateConfig: PlottablePropertyConfig<string, Recipe> = {
        propertyName: "DatePublished",
        nBins: 20,
        collector: (recipe: Recipe) => recipe.DatePublished ?? "",
        quantifier: (me: string) => new Date(me).getTime(),
        exposer: (me: number) => new Date(me).toDateString(),
    }

    const cookTimeConfig: PlottablePropertyConfig<number, Recipe> = {
        propertyName: "CookTime",
        nBins: 20,
        collector: (recipe: Recipe) => recipe.CookTime ?? 0,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " minutes"
    }

    const prepTimeConfig: PlottablePropertyConfig<number, Recipe> = {
        propertyName: "PrepTime",
        nBins: 20,
        collector: (recipe: Recipe) => recipe.PrepTime ?? 0,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " minutes"
    }

    const totalTimeConfig: PlottablePropertyConfig<number, Recipe> = {
        propertyName: "TotalTime",
        nBins: 20,
        collector: (recipe: Recipe) => recipe.TotalTime ?? 0,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " minutes"
    }

    const caloriesConfig: PlottablePropertyConfig<number, Recipe> = {
        propertyName: "Calories",
        nBins: 20,
        collector: (recipe: Recipe) => parseFloat(recipe.Calories),
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " calories"
    }

    const servingsConfig: PlottablePropertyConfig<number, Recipe> = {
        propertyName: "RecipeServings",
        nBins: 20,
        collector: (recipe: Recipe) => recipe.RecipeServings ?? 0,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " servings"
    }

    const ratingConfig: PlottablePropertyConfig<number, Recipe> = {
        propertyName: "AggregatedRating",
        nBins: 5,
        collector: (recipe: Recipe) => recipe.AggregatedRating ?? 0,
        quantifier: (me: number) => me,
        exposer: (me: number) => me.toFixed(2).toString() + " stars",
        minVal: 0,
        maxVal: 5
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plottableConfigs: PlottablePropertyConfig<any, Recipe>[] = [
        publishedDateConfig,
        cookTimeConfig,
        prepTimeConfig,
        totalTimeConfig,
        caloriesConfig,
        servingsConfig,
        ratingConfig
    ];

    return (
        <div className="bg-black min-h-screen" >
            <section className="flex items-center justify-center text-center text-white pb-20">
                <div className="min-w-full">
                    <h2 className="text-4xl font-bold mb-4">QUERY #{queryNumber + 1}</h2>
                    <p className="text-lg mb-8 max-w-lg mx-auto">
                        {queryDescription}
                    </p>
                    <div className="mb-8 flex justify-center">
                        <JsonVisualizer json={{ "_search": query }} />
                    </div>
                    <Button
                        onClick={runQuery}
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        disabled={loading}
                        className="text-xl m-5"
                    >
                        {
                            loading ? "Loading..." : "Run Query"
                        }
                    </Button>
                    {loading && (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                            <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-200"></div>
                            <div className="w-4 h-4 rounded-full bg-white animate-pulse delay-400"></div>
                        </div>
                    )}
                    {result && !loading && (
                        <div>
                            <Plotter
                                data={result !== null ? result.map(r => r.recipe) : []}
                                configs={plottableConfigs}
                            />
                            <div className="mt-6 border-4 rounded-xl p-4">
                                <div className="flex flex-wrap flex-row justify-center gap-6">
                                    {result.map((match) => (
                                        <RecipeCard key={match.recipe.RecipeId} match={match} />
                                    ))}
                                    <Button
                                        className="col-span-full"
                                        onClick={() => {
                                            setLimit((prev) => prev + 10)
                                            runQuery();
                                        }}
                                        placeholder=""
                                        onPointerEnterCapture={() => { }}
                                        onPointerLeaveCapture={() => { }}
                                    >
                                        Load More
                                    </Button>
                                </div>
                            </div>

                        </div>)}
                    {aggregations && !loading && (
                        <div className="mt-6">
                            <h3 className="text-2xl font-bold mb-4">Aggregations</h3>
                            <JsonVisualizer json={aggregations} />
                        </div>
                    )}
                </div>
            </section>
        </div >
    );
}
