"use client";
import { Box, Typography, Stack, Button, Skeleton } from "@mui/material";
import { useState } from "react";
import { useInventoryContext } from "../context/inventoryProvider";
import axios from "axios";

export default function Cards() {
  const { inventory, loading, updateInventory } = useInventoryContext();
  const [loadingItemNames, setLoadingItemNames] = useState([]);

  async function updateItemInInventory(iName, quantity) {
    setLoadingItemNames((prevItems) => [...prevItems, iName]);
  
    var payload = { itemName: iName, exists: true, newQuantity: quantity };
    try {
      await axios.post("/api/firebase/updateItem", payload);
      updateInventory(iName, quantity);
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setLoadingItemNames((prevItems) =>
        prevItems.filter((item) => item !== iName)
      );
    }
  }  

  return (
    <Stack width="800px" height="300px" spacing={2} overflow="auto">
      {loading ? (
        <Box display="flex" flexDirection="column" gap={2}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height="150px"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height="150px"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height="150px"
          />
          {/* Add more Skeletons or adjust as necessary */}
        </Box>
      ) : (
        inventory.map(({ name, quantity }) => {
          return (
            <Box
              key={name}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="background.paper"
              p={2}
              borderRadius={8}
            >
              <Typography>{name}</Typography>
              <Typography>{quantity}</Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateItemInInventory(name, quantity + 1)}
                  disabled={loadingItemNames.includes(name)}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => updateItemInInventory(name, quantity - 1)}
                  disabled={loadingItemNames.includes(name)}
                >
                  -
                </Button>
              </Stack>
            </Box>
          );
        })
      )}
    </Stack>
  );
}
