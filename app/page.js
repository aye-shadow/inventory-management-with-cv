// pages/Home.js
"use client";
import { Suspense, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import useInventory from "@/hooks/useInventory";
import Cards from "./components/cards";

export const dynamic = "force-dynamic";

export default function Home() {
  const { inventory, loadingItems, addItem, removeItem } = useInventory();
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName("");
  };

  const handleAddItem = async (item) => {
    await addItem(item);
    handleClose(); // Close the modal after adding an item
  };

  const handleRemoveItem = async (item) => {
    await removeItem(item);
    handleClose(); // Close the modal after removing an item
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      flexDirection="column"
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%)" }}
          width={400}
          bgcolor="background.paper"
          border="2px solid black"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography variant="h6">Add or Remove Item</Typography>
          <Stack width="100%" direction="column" spacing={2}>
            <TextField
              label="Item Name"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddItem(itemName)}
                disabled={loadingItems[itemName]}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveItem(itemName)}
                disabled={loadingItems[itemName]}
              >
                Remove
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border="1px solid #333" marginTop={2}>
        <Box
          width="800px"
          height="100px"
          bgcolor="#add8e6"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>
      </Box>
      <Cards
        inventory={inventory}
        loadingItems={loadingItems}
        addItem={addItem}
        removeItem={removeItem}
      />
    </Box>
  );
}
