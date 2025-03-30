import {cn} from "@/shared/lib/utils";
import React from "react";
import {Button} from "../ui";
import {Title} from "./title";
import Image from "next/image";
import {GroupVariants} from "./group-variants";
import {PizzaSize, pizzaSizes, PizzaType, pizzaTypes} from "@/shared/constants/pizza";
import {Ingredient} from "@prisma/client";
import {IngredientItem} from "./ingredient-item";
import {useSet} from "react-use";

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items?: any[];
    onClickAdd?: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({name, items, imageUrl, ingredients, onClickAdd, className}) => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);

    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

    const textDetails = "text text text";
    const totalPrice = 100;

    return (
        <div className={cn("flex flex-1", className)}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <Image src={imageUrl} alt={name} className="transition-all z-10 duration-300" fill />
            </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-1 mt-3">
                    <GroupVariants
                        items={pizzaSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />

                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className="bg-gray-50 mt-3 p-5 rounded-md h-[290px] overflow-auto scrollbar">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
                    Добавить в корзину {totalPrice} Р
                </Button>
            </div>
        </div>
    );
};
