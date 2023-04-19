import { Box } from "@artsy/palette"
import { NewSearchBarInputContainer } from "Components/Search/NewSearch/NewSearchBarInputContainer"
import { Media } from "Utils/Responsive"

export const NewSearchBar = () => {
  return (
    <Box flex={1}>
      <Media at="xs">
        <NewSearchBarInputContainer isXs={true} />
      </Media>
      <Media greaterThan="xs">
        <NewSearchBarInputContainer isXs={false} />
      </Media>
    </Box>
  )
}
