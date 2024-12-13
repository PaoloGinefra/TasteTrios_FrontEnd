interface IngredientProps {
    name: string;
    removeIngredient: (name: string) => void;
}

export default function Ingredient({ name, removeIngredient }: IngredientProps) {
    return (
        <button
            className="bg-black hover:bg-red-700 text-white rounded-full px-4 py-2 mx-2"
            onClick={() => removeIngredient(name)}
        >
            {name}
        </button>
    );
}