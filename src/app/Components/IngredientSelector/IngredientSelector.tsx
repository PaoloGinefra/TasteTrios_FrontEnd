import { Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Ingredient from "./Ingredient";

interface IngredientSelectorProps {
    ingredients: string[];
    setIngredients: (ingredients: string[]) => void;
    runQuery: (ingredients: string[]) => void;
}

export default function IngredientSelector({ ingredients, setIngredients, runQuery }: IngredientSelectorProps) {
    const apiEndpoint = "https://taste-trios-back-end.vercel.app/api/neo4j/checkIngredient"
    const [currentIngredient, setCurrentIngredient] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const removeIngredient = (name: string) => {
        const newIngredients = ingredients.filter((ingredient) => ingredient !== name);
        setIngredients(newIngredients);
        runQuery(newIngredients);
    }

    function addIngredient() {
        if (currentIngredient === "") {
            return;
        }
        if (ingredients.includes(currentIngredient)) {
            alert("Ingredient already added");
            setCurrentIngredient("");
            return;
        }
        setIsLoading(true);
        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredient: currentIngredient,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Data:", data);
                if (data.exists) {
                    const newIngredients = [...ingredients, currentIngredient];
                    setIngredients(newIngredients);
                    setCurrentIngredient("");
                    runQuery(newIngredients);
                } else {
                    alert("Invalid ingredient");
                }
            })
            .catch((err) => {
                console.error("Error:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="flex flex-col items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addIngredient();
                }}
                className="flex flex-row justify-center"
            >
                <div className="relative flex w-full max-w-[24rem]">
                    <Input
                        type="text"
                        label="Ingredient"
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        crossOrigin=""
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value.toLowerCase())}
                        color="white"
                    />
                    <Button
                        type="submit"
                        size="sm"
                        className="!absolute right-1 top-1 rounded"
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        ) : (
                            "Add"
                        )}
                    </Button>
                </div>
            </form>
            <div className="flex flex-col justify-center mt-4 border-2 border-white p-1 rounded-xl max-w-[24rem]">
                <Typography className="mx-4" variant="h5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >Selected Ingredients</Typography>
                <div className="flex flex-row justify-center m-2 gap-1 max-w-[24rem] flex-wrap">
                    {ingredients.map((ingredient, index) => (
                        <Ingredient key={index} name={ingredient} removeIngredient={removeIngredient} />
                    ))}
                </div>
            </div>
        </div>
    );
}