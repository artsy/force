import React from "react"
import { Box } from "@artsy/palette"
import { SearchBarQueryRenderer } from "reaction/Components/Search/SearchBar"

export const SearchBar = () => (
  <Box
    style={{
      position: "fixed",
      zIndex: 100,
      backgroundColor: "white",
      top: "2px",
    }}
  >
    <SearchBarQueryRenderer />
  </Box>
)
