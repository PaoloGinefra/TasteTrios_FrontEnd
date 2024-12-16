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
import { useEffect, useState } from "react";
import { Match } from "../Pan-tryItOut/page";
import { FaFireAlt } from "react-icons/fa";
import { RiKnifeFill } from "react-icons/ri";
import { PiCookingPotFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";


interface RecipeProps {
    match: Match;
}

export default function RecipeCard({ match }: RecipeProps) {
    const [open, setOpen] = useState(false);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const handleOpen = () => setOpen(!open);
    const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/neo4j/getIngredients";

    function getIngredients() {
        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipeId: match.recipe.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Data:", data);
                setIngredients(data.ingredients);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }

    useEffect(() => {
        if (open) {
            getIngredients();
        }
    }, [match, open]);

    return (
        <>
            <Card onClick={handleOpen} className="w-96 hover:scale-105 active:scale-95 duration-200" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <CardBody placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Typography variant="h5" color="blue-gray" className="mb-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        {match.recipe.Name}
                    </Typography>
                    <Typography placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        {match.matchingIngredients.join(", ")}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex gap-2 flex-wrap justify-center" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Tooltip content="Calories" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}
                    >
                        <Chip
                            className="p-2  px-3"
                            value={match.recipe.Calories + " kCals"}
                            icon={<FaFireAlt className="text-xl" />}
                        />
                    </Tooltip>
                    {
                        match.recipe.PrepTime &&
                        <Tooltip content="Prep Time" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}>
                            <Chip
                                className="p-2  px-3"
                                value={match.recipe.PrepTime[2] + " mins"}
                                icon={<RiKnifeFill className="text-xl" />}
                            />
                        </Tooltip>
                    }

                    {
                        match.recipe.CookTime &&
                        <Tooltip content="Cook Time" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}>
                            <Chip
                                className="p-2  px-3"
                                value={match.recipe.CookTime[2] + " mins"}
                                icon={<PiCookingPotFill className="text-xl" />}
                            />
                        </Tooltip>
                    }

                    {
                        match.recipe.RecipeServings &&
                        <Tooltip content="Servings" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}>
                            <Chip
                                className="p-2  px-3"
                                value={match.recipe.RecipeServings}
                                icon={<FaPeopleGroup className="text-xl" />}
                            />
                        </Tooltip>
                    }



                </CardFooter>
            </Card>

            <Dialog open={open} handler={handleOpen} placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <DialogHeader placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                >
                    {match.recipe.Name}
                </DialogHeader>
                <DialogBody placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    Ingredients:
                    <ul>
                        {ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                </DialogBody>
            </Dialog>
        </>
    );
}