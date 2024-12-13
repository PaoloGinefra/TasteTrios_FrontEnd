"use client"; // This is a client component
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


interface RecipeProps {
    title: string;
}

export default function RecipeCard({ title }: RecipeProps) {
    return (
        <Card className="mt-6 w-96" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
            <CardBody placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <Typography variant="h5" color="blue-gray" className="mb-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    {title}
                </Typography>
                <Typography placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                    night life in Barcelona.
                </Typography>
            </CardBody>
            <CardFooter className="pt-0" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <Button placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>Read More</Button>
            </CardFooter>
        </Card>
    );
}