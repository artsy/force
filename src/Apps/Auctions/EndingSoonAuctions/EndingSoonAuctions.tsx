import { Spacer, Text } from "@artsy/palette"
import { EndingSoonAuctionsGridFragmentContainer } from "Apps/Auctions/Routes/EndingSoonAuctionsGrid"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { EndingSoonAuctions_viewer$data } from "__generated__/EndingSoonAuctions_viewer.graphql"

interface EndingSoonAuctionsProps {
  viewer: EndingSoonAuctions_viewer$data
}

const EndingSoonAuctions: React.FC<EndingSoonAuctionsProps> = ({ viewer }) => {
  return (
    <>
      <MetaTags title="Auction Lots for You Ending Soon" />

      <Spacer y={4} />

      <Text variant="xl">Auction Lots for You Ending Soon</Text>

      <Spacer y={4} />

      {viewer && <EndingSoonAuctionsGridFragmentContainer viewer={viewer} />}
    </>
  )
}

export const EndingSoonAuctionsFragmentContainer = createFragmentContainer(
  EndingSoonAuctions,
  {
    viewer: graphql`
      fragment EndingSoonAuctions_viewer on Viewer
        @argumentDefinitions(
          includeArtworksByFollowedArtists: { type: "Boolean!" }
          isAuction: { type: "Boolean!" }
          liveSale: { type: "Boolean!" }
        ) {
        ...EndingSoonAuctionsGrid_viewer
          @arguments(
            includeArtworksByFollowedArtists: $includeArtworksByFollowedArtists
            isAuction: $isAuction
            liveSale: $liveSale
          )
      }
    `,
  }
)
