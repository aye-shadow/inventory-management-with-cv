// components/cards.js
"use client";
import { Box, Typography, Stack, Button, Skeleton } from "@mui/material";

export default function Cards({
  loading,
  inventory,
  loadingItem,
  handleAddItem,
  handleRemoveItem,
}) {
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
                  onClick={() => handleAddItem(name)}
                  disabled={loadingItem === name}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveItem(name)}
                  disabled={loadingItem === name}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          );
        })
      )}
    </Stack>
  );
}
