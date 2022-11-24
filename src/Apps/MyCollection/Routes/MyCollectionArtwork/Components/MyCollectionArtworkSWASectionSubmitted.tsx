import { Flex, Text, WinningBidIcon } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

export const MyCollectionArtworkSWASectionSubmitted = () => {
  const article =
    "https://support.artsy.net/hc/en-us/sections/360008311913-Sell-with-Artsy"

  return (
    <>
      <Flex alignItems="center" flexDirection={"row"} mb={1} mt={2}>
        <WinningBidIcon />
        <Text variant="sm" ml={0.5}>
          Artwork has been submitted for sale
        </Text>
      </Flex>

      <Text mb={2} color="black60" variant="xs">
        Have a question? Visit our{" "}
        <RouterLink to={article} target="_blank" color="black100">
          help center
        </RouterLink>{" "}
        or get in touch with one of our specialists at{" "}
        <RouterLink to={"mailto:sell@artsy.net"} color="black100">
          sell@artsy.net
        </RouterLink>
      </Text>
    </>
  )
}
