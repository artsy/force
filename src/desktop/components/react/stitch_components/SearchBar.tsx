import React from "react"
import { Box } from "@artsy/palette"
import { SearchBarQueryRenderer } from "v2/Components/Search/SearchBar"
import styled from "styled-components"

const SearchBarContainer = styled(Box)`
  z-index: 100;
`

export const SearchBar = () => (
  <SearchBarContainer>
    <SearchBarQueryRenderer />
  </SearchBarContainer>
)
