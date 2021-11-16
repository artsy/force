import { RouterLink } from "v2/System/Router/RouterLink"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { Box, Button, Text } from "@artsy/palette"

export const Header: React.FC = () => {
  return (
    <FullBleedHeader
      src="http://files.artsy.net/consign/swa_landing_header.jpg"
      caption="Helen Frankenthaler, Detail of <i>Shatter</i>, 1953."
    >
      <Box
        position="absolute"
        left="50%"
        top="50%"
        textAlign="center"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <Text as="h1" variant="xxl" mb={2}>
          Sell with Artsy
        </Text>

        <Text as="h2" variant="lg" mb={[2, 6]}>
          Sell artwork from your collection at auction.
        </Text>

        <Button
          // @ts-ignore
          as={RouterLink}
          //TODO: SWA-77
          //to="/consign/submission"
          to="/consign/submission/artwork-details"
        >
          Get a Free Auction Valuation
        </Button>
      </Box>
    </FullBleedHeader>
  )
}
