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
                setCurrentIngredient("");
            }
            );
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
                    >
                        Add
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