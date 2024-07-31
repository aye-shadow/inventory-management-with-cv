// components/cards.js
"use client";
import { Box, Typography, Stack, Button, Skeleton } from "@mui/material";
import useInventory from "@/hooks/useInventory";

export default function Cards({
  inventory,
  loadingItems,
  addItem,
  removeItem,
}) {
  const isLoading = inventory.length === 0; // Adjust this based on your actual loading state

  return (
    <Stack width="800px" height="300px" spacing={2} overflow="auto">
      {isLoading ? (
        <Box display='flex' flexDirection='column' gap={2}>
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
        inventory.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#f0f0f0"
            padding={2}
          >
            <Typography variant="h5" color="#333">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h5" color="#333">
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => addItem(name)}
                disabled={loadingItems[name]}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeItem(name)}
                disabled={loadingItems[name]}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        ))
      )}
    </Stack>
  );
}
