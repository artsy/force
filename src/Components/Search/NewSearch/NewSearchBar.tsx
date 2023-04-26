import { Box } from "@artsy/palette"
import { NewSearchBarInputQueryRenderer } from "Components/Search/NewSearch/NewSearchBarInput"
import { Media } from "Utils/Responsive"

export const NewSearchBar = () => {
  return (
    <Box flex={1}>
      <Media at="xs">
        <NewSearchBarInputQueryRenderer isXs={true} />
      </Media>
      <Media greaterThan="xs">
        <NewSearchBarInputQueryRenderer isXs={false} />
      </Media>
    </Box>
  )
}
