"use client";
import { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import Cards from "./components/cards";
import { CameraEnhance as CameraEnhanceIcon } from "@mui/icons-material";
import Link from "next/link";
import { useInventoryContext } from "./context/inventoryProvider";

export default function Home() {
  const { inventory, updateInventory } = useInventoryContext();

  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName("");
  };

  const handleUpdateItem = async (itemName, nQuantity) => {
    const itemIndex = inventory.findIndex((item) => item.name === itemName);

    if (itemIndex == -1 && nQuantity != 0) {
      let addAmount, existingItem;

      if (itemIndex == -1) {
        // item does not exist, so add it
        addAmount = 1;
        existingItem = false;
      } else {
        // item exists
        existingItem = true;
        if (nQuantity === -1) {
          // decrement quantity
          addAmount = inventory[itemIndex].quantity - 1;
        } else {
          // increment quantity
          addAmount = inventory[itemIndex].quantity + 1;
        }

        var payload = {
          itemName: iName,
          exists: existingItem,
          newQuantity: addAmount,
        };
        await axios.post("/api/firebase/updateItem", payload);
        updateInventory(itemName, addAmount);
      }
    }
    handleClose(); // Close the modal after adding an item
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
                onClick={() => handleUpdateItem(itemName, 1)}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleUpdateItem(itemName, -1)}
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
      <Cards />
    </Box>
  );
}
