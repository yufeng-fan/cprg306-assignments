import React from "react";

interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category }) => {
  return (
    <li className="border border-black p-4 rounded-lg m-4">
      {name} <br />
      Quantity: {quantity} <br />
      Category: {category}
    </li>
  );
};

export default Item;
