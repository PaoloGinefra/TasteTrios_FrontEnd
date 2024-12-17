"use client"; // This is a client component
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Chip,
    Tooltip
} from "@material-tailwind/react";
import { Match } from "../Mix&Max/page";
import { LuNewspaper } from "react-icons/lu";


interface IngredientProps {
    match: Match;
}

export default function IngredientCard({ match }: IngredientProps) {

    return (
        <>
            <Card className="w-96" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
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
        </>
    );
}