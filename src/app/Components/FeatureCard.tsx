"use client"; // This is a client component
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { useRouter } from 'next/navigation';
import { IconType } from "react-icons";
import React from "react";


interface FeatureCardProps {
    featureName: string;
    description: string;
    featureRoute: string;
    icon: IconType;
}

export function FeatureCard({ featureName, description, featureRoute, icon }: FeatureCardProps) {
    const router = useRouter();

    function handleClick() {
        router.push(featureRoute);
    }

    return (
        <Card className="w-96 hover:scale-105 duration-100 active:scale-95"
            variant="gradient"
            shadow={true}
            placeholder=""
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
            onClick={handleClick}
        >
            <CardHeader floated={false} shadow={false} className="flex align-middle justify-center text-9xl text-black tex" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                {React.createElement(icon)}
            </CardHeader>
            <CardBody className="text-center" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <Typography variant="h4" color="blue-gray" className="mb-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    {featureName}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                <Tooltip content="Like" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                    >
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Typography
                        as="a"
                        href="#twitter"
                        variant="lead"
                        color="light-blue"
                        textGradient
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                    >
                        <i className="fab fa-twitter" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                    >
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}