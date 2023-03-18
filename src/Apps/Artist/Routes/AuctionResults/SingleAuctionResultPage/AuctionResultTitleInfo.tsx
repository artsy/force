import { Box, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { AuctionResultTitleInfo_auctionResult$data } from "__generated__/AuctionResultTitleInfo_auctionResult.graphql"

interface AuctionResultTitleInfoProps {
  auctionResultTitleInfo: AuctionResultTitleInfo_auctionResult$data
}
const AuctionResultTitleInfo: React.FC<AuctionResultTitleInfoProps> = ({
  auctionResultTitleInfo,
}) => {
  const { artist, title, dateText, organization } = auctionResultTitleInfo
  return (
    <Box>
      <Text as="h1" variant="lg-display">
        {artist?.isPersonalArtist ? (
          artist?.name
        ) : (
          <RouterLink textDecoration="none" to={artist?.href ?? ""}>
            {artist?.name}
          </RouterLink>
        )}
      </Text>
      <Text as="h1" variant="lg-display" mb={[0.5, 0]}>
        {title?.trim()}
        {dateText && dateText.replace(/\s+/g, "").length > 0 && ", " + dateText}
      </Text>

      <Text variant="xs" color="black60" mb={4}>
        /Auction date/ • {organization}
      </Text>
    </Box>
  )
}

export const AuctionResultTitleInfoFragmentContainer = createFragmentContainer(
  AuctionResultTitleInfo,
  {
    auctionResult: graphql`
      fragment AuctionResultTitleInfo_auctionResult on AuctionResult {
        artist {
          isPersonalArtist
          name
          slug
          href
        }
        title
        dateText
        organization
      }
    `,
  }
)
