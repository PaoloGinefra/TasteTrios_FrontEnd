interface IngredientProps {
    name: string;
    removeIngredient: (name: string) => void;
}

export default function Ingredient({ name, removeIngredient }: IngredientProps) {
    return (
        <div className="bg-black rounded-full px-4 py-2 mx-2">
            {name}
            <button onClick={() => removeIngredient(name)}>X</button>
        </div>
    );
}