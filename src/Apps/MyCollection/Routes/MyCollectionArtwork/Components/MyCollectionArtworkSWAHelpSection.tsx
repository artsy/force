import { Separator, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"

export const MyCollectionArtworkSWAHelpSection: React.FC = () => {
  return (
    <Media greaterThanOrEqual="sm">
      <Separator my={4} />

      <Text mb={2} color="black60" variant="xs">
        Have a question? Visit our{" "}
        <RouterLink
          to={
            "https://support.artsy.net/s/topic/0TO3b000000UevOGAS/sell-with-artsy"
          }
          target="_blank"
        >
          help center
        </RouterLink>{" "}
        or get in touch with one of our specialists at{" "}
        <RouterLink to={"mailto:sell@artsy.net"}>sell@artsy.net</RouterLink>.
      </Text>
    </Media>
  )
}
