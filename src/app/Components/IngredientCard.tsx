"use client"; // This is a client component
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    Chip,
    Tooltip
} from "@material-tailwind/react";
import { IngredientMatch } from "../Mix&Max/page";
import { LuNewspaper } from "react-icons/lu";
import { useState } from "react";
import { Match, QueryResult } from "../Pan-tryItOut/page";
import RecipeCard from "./Recipe";


interface IngredientProps {
    match: IngredientMatch;
    selectedIngredients: string[];
}

export default function IngredientCard({ match, selectedIngredients }: IngredientProps) {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState<Match[] | null>(null); // Typed state
    const [loading, setLoading] = useState(false);
    const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/elasticsearch/matchIngredientsAnd";

    function handleOpen() {
        setOpen(!open);
        runQuery([...selectedIngredients, match.matchedIngredient]);

    }

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
        <>
            <Card onClick={handleOpen} className="w-96 hover:scale-105 active:scale-95 duration-200" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <CardBody placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Typography variant="h5" color="blue-gray" className="mb-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        {match.matchedIngredient}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex gap-2 flex-wrap justify-center" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Tooltip content="Matched Recipes count" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}
                    >
                        <Chip
                            className="p-2  px-3"
                            value={match.recipeCount}
                            icon={<LuNewspaper className="text-xl" />}
                        />
                    </Tooltip>

                    <Tooltip content="Average Rating of matched Recipes" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}>
                        <Chip
                            className="p-2  px-3"
                            value={match.avgOfAvgRatings.toFixed(2)}
                            icon={"⭐"}
                        />
                    </Tooltip>
                </CardFooter>
            </Card>


            <Dialog open={open} handler={handleOpen} placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <DialogHeader placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                >
                    {"Recepies with " + selectedIngredients.join(", ") + " and " + match.matchedIngredient}
                </DialogHeader>
                <DialogBody className="overflow-y-scroll h-[60vh]" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <div className="text-left">
                        {loading && (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-black animate-pulse"></div>
                                <div className="w-4 h-4 rounded-full bg-black animate-pulse delay-200"></div>
                                <div className="w-4 h-4 rounded-full bg-black animate-pulse delay-400"></div>
                            </div>
                        )}
                        {result && !loading && (
                            <>
                                <div className="flex flex-row gap-4 flex-wrap justify-center">
                                    {result.map((match) => (
                                        <RecipeCard key={match.recipe.RecipeId} match={match} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}