import { Box } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"
import { Media } from "Utils/Responsive"
import type { FC } from "react"
import { MobileSearchBarQueryRenderer } from "./Mobile/MobileSearchBar"
import { SearchBarInput } from "./SearchBarInput"

interface SearchBarProps {
  onClose: () => void
}

export const SearchBar: FC<React.PropsWithChildren<SearchBarProps>> = ({
  onClose,
}) => {
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
