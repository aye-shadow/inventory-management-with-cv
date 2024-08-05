"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const fetchInventory = async () => {
  const response = await axios.get("/api/firebase/getInventory");
  return response.data.inventoryList || [];
};

const InventoryContext = createContext({
  inventory: [],
  loading: true,
  updateInventory: () => {},
});

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      const data = await fetchInventory();
      setInventory(data);
      setLoading(false);
    };
    loadInventory();
  }, []);

  const updateInventory = (itemName, quantityChange) => {
    setInventory((prevInventory) => {
      // If quantityChange is 0, remove the item if it exists
      if (quantityChange === 0) {
        return prevInventory.filter(({ name }) => name !== itemName);
      } else {
        // Find the index of the item
        const itemIndex = prevInventory.findIndex(
          (item) => item.name === itemName
        );

        // If the item does not exist, add it
        if (itemIndex === -1) {
          return [
            ...prevInventory,
            { name: itemName, quantity: quantityChange },
          ];
        } else {
          // If the item exists, update its quantity
          return prevInventory.map((item, index) =>
            index === itemIndex ? { ...item, quantity: quantityChange } : item
          );
        }
      }
    });
  };

  return (
    <InventoryContext.Provider value={{ inventory, loading, updateInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => useContext(InventoryContext);
