import { Button } from '@material-tailwind/react';
import { IoIosCloseCircle } from "react-icons/io";
interface IngredientProps {
    name: string;
    removeIngredient: (name: string) => void;
}

export default function Ingredient({ name, removeIngredient }: IngredientProps) {
    return (
        <div className="relative inline-block">
            <Button
                className="text-white rounded-full px-4 py-2 mx-2 duration-100"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                {name}
            </Button>
            <div
                className="absolute bg-red-400 inset-0 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 duration-200 mx-2"
                onClick={() => removeIngredient(name)}
            >
                <IoIosCloseCircle />
            </div>
        </div>
    );
}