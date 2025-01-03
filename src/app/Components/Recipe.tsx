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
import { useState } from "react";
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
    const handleOpen = () => setOpen(!open);

    function interpretCombinedString(ingredients: string) {
        // Regular expression to extract the arguments from the function
        const regex = /c\(([^]+)\)/;

        // Match the function arguments
        const match = ingredients.match(regex);

        // If match is found, split the arguments and remove the extra quotes and whitespace
        if (match) {
            const argumentsString = match[1]; // Get the content inside the parentheses
            const argumentsArray = argumentsString
                .split("\",") // Split by commas
                .map(arg => arg.trim().replace(/"/g, '')); // Remove extra spaces and quotes

            return argumentsArray; // Output the parsed array
        }
        return [];
    }

    function interpretIngredientsAndQuantities(ingredients: string, quantities: string) {
        const ingredientsArray = interpretCombinedString(ingredients);
        const quantitiesArray = interpretCombinedString(quantities);

        return ingredientsArray.map((ingredient, index) => `${quantitiesArray[index]} - ${ingredient}`);
    }

    return (
        <>
            <Card onClick={handleOpen} className="w-96 hover:scale-105 active:scale-95 duration-200" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <CardBody placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Typography variant="h5" color="blue-gray" className="  " placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        {match.recipe.Name}
                    </Typography>
                    {
                        match.recipe.AuthorName != null &&
                        <Typography variant="h6" color="blue-gray" className="mb-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                            by {match.recipe.AuthorName}
                        </Typography>
                    }
                    <Typography className="line-clamp-1 overflow-hidden" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        {match.recipe.Description}
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
                        match.recipe.PrepTime != null &&
                        <Tooltip content="Prep Time" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}>
                            <Chip
                                className="p-2  px-3"
                                value={match.recipe.PrepTime + " mins"}
                                icon={<RiKnifeFill className="text-xl" />}
                            />
                        </Tooltip>
                    }

                    {
                        match.recipe.CookTime != null &&
                        <Tooltip content="Cook Time" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}>
                            <Chip
                                className="p-2  px-3"
                                value={match.recipe.CookTime + " mins"}
                                icon={<PiCookingPotFill className="text-xl" />}
                            />
                        </Tooltip>
                    }

                    {
                        match.recipe.RecipeServings != null &&
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

                    {
                        match.recipe.AggregatedRating != null &&
                        <Tooltip content="Average Rating" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}>
                            <Chip
                                className="p-2  px-3"
                                value={match.recipe.AggregatedRating}
                                icon={"⭐"}
                            />
                        </Tooltip>
                    }

                    {
                        match.recipe.Keywords !== "" &&
                        <>
                            {
                                interpretCombinedString(match.recipe.Keywords || "").map((keyword, index) => (
                                    <Tooltip key={index} content="Keyword" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }}>
                                        <Chip className="p-2  px-3" value={keyword} />
                                    </Tooltip>
                                ))
                            }
                        </>


                    }


                </CardFooter>
            </Card>

            <Dialog className="overflow-y-scroll h-[60vh]" open={open} handler={handleOpen} placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <DialogHeader className="felx flex-col" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}
                >
                    {match.recipe.Name}
                    {match.recipe.DatePublished != null &&
                        <Typography variant="h6" color="blue-gray" className="mb-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                            {new Date(match.recipe.DatePublished).toLocaleDateString()}
                        </Typography>
                    }
                </DialogHeader>
                <DialogBody placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <div className="text-left">

                        {
                            match.recipe.RecipeIngredientParts !== "" &&
                            <>
                                <Typography variant="h6" color="blue-gray" className="mb-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                                    Ingredients
                                </Typography>
                                <ul className="list-disc pl-6">
                                    {
                                        interpretIngredientsAndQuantities(match.recipe.RecipeIngredientParts, match.recipe.RecipeIngredientQuantities).map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                </ul>
                            </>
                        }

                        <Typography variant="h6" color="blue-gray" className="mb-2 mt-4" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                            Steps:
                        </Typography>
                        <ol className="list-decimal pl-6">
                            {
                                interpretCombinedString(match.recipe.RecipeInstructions).map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))
                            }
                        </ol>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}