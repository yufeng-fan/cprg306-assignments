"use client";

import React, { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { ItemData } from "../../types/item";

const Page: React.FC = () => {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleClick = (item: ItemData) => {
    setItems([...items, item]);
  };

  const handleItemSelect = (mealName: string) => {
    let cleanedName =
      mealName.indexOf(",") !== -1
        ? mealName.split(",")[0].trim().toLowerCase()
        : mealName
            .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
            .trim()
            .toLowerCase();
    cleanedName = cleanedName === "bananas" ? "banana" : cleanedName;
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Shopping List
      </h1>
      <div className="max-w-2xl mx-auto" style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "0 1rem" }}>
          <NewItem onAddItem={handleClick} />
          <br />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {selectedItemName && (
          <div style={{ flex: 1, padding: "0 1rem" }}>
            <MealIdeas ingredient={selectedItemName} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
