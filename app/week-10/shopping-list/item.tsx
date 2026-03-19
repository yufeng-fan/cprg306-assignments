import React from "react";

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category, onSelect }) => {
  return (
    <li
      className="border border-black p-4 rounded-lg m-4"
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      {name} <br />
      Quantity: {quantity} <br />
      Category: {category}
    </li>
  );
};

export default Item;
