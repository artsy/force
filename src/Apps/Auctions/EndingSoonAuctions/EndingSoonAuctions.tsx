import { ContextModule } from "@artsy/cohesion"
import { Spacer, Text } from "@artsy/palette"
import { EndingSoonAuctionsGridPaginationContainer } from "Apps/Auctions/Routes/EndingSoonAuctionsGrid"
import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { EndingSoonAuctions_viewer$data } from "__generated__/EndingSoonAuctions_viewer.graphql"

interface EndingSoonAuctionsProps {
  viewer: EndingSoonAuctions_viewer$data
}

const EndingSoonAuctions: React.FC<EndingSoonAuctionsProps> = ({ viewer }) => {
  return (
    <>
      <MetaTags
        title="Auction Lots for You Ending Soon | Artsy"
        pathname="/auctions/lots-for-you-ending-soon"
      />

      <Spacer y={4} />

      <Text variant="xl">Auction Lots for You Ending Soon</Text>

      <Spacer y={4} />

      <LogInPrompt contextModule={ContextModule.auctionLotsEndingSoonRail} />

      {viewer && <EndingSoonAuctionsGridPaginationContainer viewer={viewer} />}
    </>
  )
}

export const EndingSoonAuctionsFragmentContainer = createFragmentContainer(
  EndingSoonAuctions,
  {
    viewer: graphql`
      fragment EndingSoonAuctions_viewer on Viewer {
        ...EndingSoonAuctionsGrid_viewer
      }
    `,
  }
)
