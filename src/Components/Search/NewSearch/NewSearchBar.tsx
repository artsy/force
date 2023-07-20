import { Box } from "@artsy/palette"
import { NewSearchBarInputQueryRenderer } from "Components/Search/NewSearch/NewSearchBarInput"
import { Media } from "Utils/Responsive"
import { MobileSearchBarQueryRenderer } from "./Mobile/MobileSearchBar"
import { FC } from "react"
import { getSearchTerm } from "Components/Search/NewSearch/utils/getSearchTerm"
import { isServer } from "Server/isServer"

interface NewSearchBarProps {
  onClose: () => void
}

export const NewSearchBar: FC<NewSearchBarProps> = ({ onClose }) => {
  const urlSearchTerm = isServer ? undefined : getSearchTerm(window?.location)

  return (
    <Box flex={1}>
      <Media at="xs">
        <MobileSearchBarQueryRenderer onClose={onClose} />
      </Media>
      <Media greaterThan="xs">
        <NewSearchBarInputQueryRenderer term={urlSearchTerm} />
      </Media>
    </Box>
  )
}
