import { RouterLink } from "System/Components/RouterLink"
import { Text } from "@artsy/palette"

export const DebugClientError404Route = () => {
  return (
    <Text mt={4} variant="sm-display">
      <RouterLink to="/artist/example-404">Click to 404</RouterLink>
    </Text>
  )
}
