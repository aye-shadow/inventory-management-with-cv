// hooks/useInventory.js
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  getDocs,
  query,
  collection,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitialInventory = async () => {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      const inventoryList = [];
      docs.forEach((doc) => {
        inventoryList.push({
          name: doc.id,
          ...doc.data(),
        });
      });
      setInventory(inventoryList);
    };

    setLoading(true);
    loadInitialInventory();
    setLoading(false);
  }, []);

  const addItem = async (itemName) => {
    const item = inventory.find(({ name }) => name === itemName)
    if (item) {
      const docRef = doc(collection(firestore, "inventory"), itemName);
      await setDoc(docRef, { quantity: item.quantity + 1 });

      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      await setDoc(doc(collection(firestore, "inventory"), itemName), {
        quantity: 1,
      });

      setInventory((prevInventory) => [
        ...prevInventory,
        { name: itemName, quantity: 1 },
      ]);
    }
  };

  const removeItem = async (itemName) => {
    const item = inventory.find(({ name }) => name === itemName);
    if (item) {
      const docRef = doc(collection(firestore, "inventory"), itemName);
      if (item.quantity === 1) {
        // delete from list and db
        await deleteDoc(docRef);

        setInventory((prevInventory) =>
          prevInventory.filter(({ name }) => name !== itemName)
        );
      } else {
        // decrement quantity
        await setDoc(docRef, { quantity: item.quantity - 1 });

        setInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.name === itemName
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    }
  };

  return { inventory, loading, addItem, removeItem };
};

export default useInventory;
