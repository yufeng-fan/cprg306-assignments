"use client";

import React, { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import { ItemData } from "../types/item";

const Page: React.FC = () => {
  const [items, setItems] = useState(itemsData);

  const handleClick = (item: ItemData) => {
    setItems([...items, item]);
  };
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping List</h1>
        <ItemList items={items} />
        <NewItem onAddItem={handleClick} />
      </div>
    </main>
  );
};

export default Page;
