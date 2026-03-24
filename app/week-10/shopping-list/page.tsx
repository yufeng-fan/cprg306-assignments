"use client";

import React, { useState, useEffect } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { ItemData } from "../../types/item";
import { getItems, addItem } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState<ItemData[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    if (user) {
      const userItems = await getItems(user.uid);
      setItems(userItems);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    }
    loadItems();
  }, [user, router]);

  const handleAddItem = async (item: ItemData) => {
    if (!user) return;
    const id = await addItem(user.uid, item);
    const newItem = { ...item, id };
    setItems([...items, newItem]);
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

  return user ? (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Shopping List
      </h1>
      <div className="max-w-2xl mx-auto" style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "0 1rem" }}>
          <NewItem onAddItem={handleAddItem} />
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
  ) : null;
};

export default Page;
