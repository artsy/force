import { Box } from "@artsy/palette"
import { SearchBarInput } from "./SearchBarInput"
import { Media } from "Utils/Responsive"
import { MobileSearchBarQueryRenderer } from "./Mobile/MobileSearchBar"
import { FC } from "react"
import { useRouter } from "System/Hooks/useRouter"

interface SearchBarProps {
  onClose: () => void
}

export const SearchBar: FC<SearchBarProps> = ({ onClose }) => {
  const { match } = useRouter()

  const urlSearchTerm = match?.location?.query?.term

  return (
    <Box flex={1}>
      <Media at="xs">
        <MobileSearchBarQueryRenderer onClose={onClose} />
      </Media>

      <Media greaterThan="xs">
        <SearchBarInput searchTerm={urlSearchTerm} />
      </Media>
    </Box>
  )
}
