import { Box, Text } from "@artsy/palette"
import { getDisplaySaleDate } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { AuctionResultTitleInfo_auctionResult$key } from "__generated__/AuctionResultTitleInfo_auctionResult.graphql"

interface AuctionResultTitleInfoProps {
  auctionResultTitleInfo: AuctionResultTitleInfo_auctionResult$key
}
export const AuctionResultTitleInfo: React.FC<AuctionResultTitleInfoProps> = ({
  auctionResultTitleInfo,
}) => {
  const data = useFragment(
    auctionResultTitleInfoFragment,
    auctionResultTitleInfo
  )

  const { artist, title, dateText, organization, saleDate } = data

  const dateOfSale = getDisplaySaleDate(saleDate)

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
        {dateOfSale} • {organization}
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
    saleDate
    title
    dateText
    organization
  }
`
