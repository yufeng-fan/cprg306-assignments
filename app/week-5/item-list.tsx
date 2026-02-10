"use client";
import React from "react";
import Item from "./item";
import { useState, useMemo } from "react";
import items from "./items.json";

type DisplayMode =
  | { mode: "list"; sorted: typeof items }
  | {
      mode: "group";
      grouped: Record<string, typeof items>;
      sortedCats: string[];
    };

const ItemList: React.FC = () => {
  const [sortBy, setSortBy] = useState("name");

  const display = useMemo((): DisplayMode => {
    if (sortBy === "group") {
      const grouped = items.reduce(
        (acc: Record<string, typeof items>, item) => {
          const key = item.category || "";
          acc[key] = acc[key] || [];
          acc[key].push(item);
          return acc;
        },
        {},
      );

      // sort items within each category by name
      Object.keys(grouped).forEach((cat) => {
        grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
      });

      // sorted list of category names
      const sortedCats = Object.keys(grouped).sort((a, b) =>
        a.localeCompare(b),
      );

      return { mode: "group", grouped, sortedCats };
    }

    const sorted = [...items].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return 0;
    });

    return { mode: "list", sorted };
  }, [items, sortBy]);

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setSortBy("name")}
          style={{
            padding: "6px 12px",
            backgroundColor: sortBy === "name" ? "#cce5ff" : "#f0f0f0",
          }}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          style={{
            padding: "6px 12px",
            backgroundColor: sortBy === "category" ? "#cce5ff" : "#f0f0f0",
          }}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortBy("group")}
          style={{
            padding: "6px 12px",
            backgroundColor: sortBy === "group" ? "#cce5ff" : "#f0f0f0",
          }}
        >
          Group by Category
        </button>
      </div>

      {display.mode === "list" && (
        <ul>
          {display.sorted.map((item, index) => (
            <Item
              key={index}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {display.mode === "group" && (
        <div>
          {display.sortedCats.map((cat) => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <h3
                className="capitalize"
                style={{ marginBottom: 6, fontWeight: "bold" }}
              >
                {cat || "Uncategorized"}
              </h3>
              <ul>
                {display.grouped[cat].map((item, index) => (
                  <Item
                    key={index}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ItemList;
