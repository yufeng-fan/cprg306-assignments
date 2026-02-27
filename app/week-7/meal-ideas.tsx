"use client";
import { useState, useEffect } from "react";
import { MealData } from "../types/meal";

type Props = {
  ingredient: string;
};

const fetchMealIdeas = async (ingredient: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error calling API:", error);
  }
};

const MealIdeas: React.FC<Props> = ({ ingredient }) => {
  const [meals, setMeals] = useState<MealData[]>([]);

  const loadMealIdeas = async () => {
    setMeals((await fetchMealIdeas(ingredient)) || []);
  };

  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Meals</h1>
      <ul>
        {meals.map((meal) => (
          <li
            className="border border-black p-1 rounded-lg m-1"
            key={meal.idMeal}
          >
            {meal.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealIdeas;
