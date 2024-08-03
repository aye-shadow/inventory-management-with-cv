// pages/Home.js
"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import useInventory from "@/app/hooks/useInventory";
import Cards from "./components/cards";
import { CameraEnhance as CameraEnhanceIcon } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const { loading, inventory, loadingItem, addItem, removeItem } = useInventory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName("");
  };

  const handleAddItem = async (itemName) => {
    addItem(itemName);
    handleClose(); // Close the modal after adding an item
  };

  const handleRemoveItem = async (itemName) => {
    removeItem(itemName)
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
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveItem(itemName)}
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
      <Link href="./camera">
        <IconButton style={{ fontSize: "24px" }}>
          <CameraEnhanceIcon />
        </IconButton>
      </Link>
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
        loading={loading}
        inventory={inventory}
        loadingItem={loadingItem}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
      />
    </Box>
  );
}
