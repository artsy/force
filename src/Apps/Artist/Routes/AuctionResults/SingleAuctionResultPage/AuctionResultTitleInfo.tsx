import { Box, Text } from "@artsy/palette"
import { AuctionResultTitleInfo_auctionResult$key } from "__generated__/AuctionResultTitleInfo_auctionResult.graphql"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"

interface AuctionResultTitleInfoProps {
  auctionResult: AuctionResultTitleInfo_auctionResult$key
}
export const AuctionResultTitleInfo: React.FC<AuctionResultTitleInfoProps> = ({
  auctionResult,
}) => {
  const data = useFragment(auctionResultTitleInfoFragment, auctionResult)

  const { artist, title, dateText, organization, formattedSaleDate } = data

  return (
    <Box>
      <Text as="h1" variant={["sm-display", "lg-display"]}>
        {artist?.isPersonalArtist ? (
          artist?.name
        ) : (
          <RouterLink textDecoration="none" to={artist?.href ?? ""}>
            {artist?.name}
          </RouterLink>
        )}
      </Text>
      <Text as="h1" variant={["sm-display", "lg-display"]} mb={[0.5, 0]}>
        {title?.trim()}
        {dateText && dateText.replace(/\s+/g, "").length > 0 && ", " + dateText}
      </Text>

      <Text variant="xs" color="black60" mb={4}>
        {formattedSaleDate} • {organization}
      </Text>
    </Box>
  )
}

const auctionResultTitleInfoFragment = graphql`
  fragment AuctionResultTitleInfo_auctionResult on AuctionResult {
    artist {
      isPersonalArtist
      name
      slug
      href
    }
    formattedSaleDate: saleDate(format: "MMM DD, YYYY")
    title
    dateText
    organization
  }
`
