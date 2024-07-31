// hooks/useInventory.js
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import {
  getDocs,
  query,
  collection,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loadingItems, setLoadingItems] = useState({});

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
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

  const setLoading = (item, value) => {
    setLoadingItems((prevState) => ({
      ...prevState,
      [item]: value,
    }));
  };

  const addItem = async (item) => {
    if (!item) return;
    setLoading(item, true);
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
    setLoading(item, false);
  };

  const removeItem = async (item) => {
    if (!item) return;
    setLoading(item, true);
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
    setLoading(item, false);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return { inventory, loadingItems, addItem, removeItem };
};

export default useInventory;
