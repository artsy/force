import { Box } from "@artsy/palette"
import { NewSearchBarInputQueryRenderer } from "Components/Search/NewSearch/NewSearchBarInput"
import { Media } from "Utils/Responsive"
import { SearchBar } from "./Mobile/SearchBar"
import { FC } from "react"

interface NewSearchBarProps {
  onClose: () => void
}

export const NewSearchBar: FC<NewSearchBarProps> = ({ onClose }) => {
  return (
    <Box flex={1}>
      <Media at="xs">
        <SearchBar onClose={onClose} />
      </Media>
      <Media greaterThan="xs">
        <NewSearchBarInputQueryRenderer />
      </Media>
    </Box>
  )
}
