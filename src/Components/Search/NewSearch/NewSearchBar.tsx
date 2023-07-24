import { Box } from "@artsy/palette"
import { NewSearchBarInputQueryRenderer } from "Components/Search/NewSearch/NewSearchBarInput"
import { Media } from "Utils/Responsive"
import { MobileSearchBarQueryRenderer } from "./Mobile/MobileSearchBar"
import { FC } from "react"
import { useRouter } from "System/Router/useRouter"
interface NewSearchBarProps {
  onClose: () => void
}

export const NewSearchBar: FC<NewSearchBarProps> = ({ onClose }) => {
  const { match } = useRouter()
  const urlSearchTerm = match.location.query.term

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
