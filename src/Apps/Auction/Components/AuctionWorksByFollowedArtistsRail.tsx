import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { Rail } from "Components/Rail/Rail"
import { extractNodes } from "Utils/extractNodes"
import type { AuctionWorksByFollowedArtistsRail_viewer$data } from "__generated__/AuctionWorksByFollowedArtistsRail_viewer.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionWorksByFollowedArtistsRailProps {
  viewer: AuctionWorksByFollowedArtistsRail_viewer$data
}

const AuctionWorksByFollowedArtistsRail: React.FC<
  React.PropsWithChildren<AuctionWorksByFollowedArtistsRailProps>
> = ({ viewer }) => {
  const nodes = extractNodes(viewer.saleArtworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <ArtworkGridContextProvider isAuctionArtwork hideLotLabel>
      <Rail
        title="Works By Artists You Follow"
        viewAllOnClick={() => {
          // TODO
          // Track works by artists you follow click
        }}
        getItems={() => {
          return nodes.map((node, index) => {
            return (
              <ShelfArtworkFragmentContainer
                artwork={node}
                key={index}
                lazyLoad
              />
            )
          })
        }}
      />
    </ArtworkGridContextProvider>
  )
}

export const AuctionWorksByFollowedArtistsRailFragmentContainer =
  createFragmentContainer(AuctionWorksByFollowedArtistsRail, {
    viewer: graphql`
      fragment AuctionWorksByFollowedArtistsRail_viewer on Viewer
      @argumentDefinitions(saleID: { type: "String" }) {
        saleArtworksConnection(
          first: 30
          aggregations: [TOTAL]
          saleSlug: $saleID
          includeArtworksByFollowedArtists: true
        ) {
          edges {
            node {
              ...ShelfArtwork_artwork
            }
          }
        }
      }
    `,
  })
