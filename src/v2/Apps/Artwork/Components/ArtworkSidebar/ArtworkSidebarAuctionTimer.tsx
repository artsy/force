import { Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionTimerFragmentContainer } from "v2/Components/AuctionTimer"
import { LotTimerFragmentContainer } from "v2/Components/LotTimer"
import { lotIsClosed } from "../../Utils/lotIsClosed"
import { ArtworkSidebarAuctionTimer_artwork } from "v2/__generated__/ArtworkSidebarAuctionTimer_artwork.graphql"

interface ArtworkSidebarAuctionTimerProps {
  artwork: ArtworkSidebarAuctionTimer_artwork
}

export const ArtworkSidebarAuctionTimer: React.FC<ArtworkSidebarAuctionTimerProps> = ({
  artwork,
}) => {
  const { sale, saleArtwork } = artwork

  return (
    <>
      {sale &&
        saleArtwork &&
        !lotIsClosed(sale, saleArtwork) &&
        (sale?.cascadingEndTimeInterval ? (
          <>
            <Spacer mt={2} />
            <LotTimerFragmentContainer saleArtwork={saleArtwork} />
          </>
        ) : (
          <>
            <Spacer mt={2} />
            <AuctionTimerFragmentContainer sale={sale} />
          </>
        ))}
    </>
  )
}

export const ArtworkSidebarAuctionTimerFragmentContainer = createFragmentContainer(
  ArtworkSidebarAuctionTimer,
  {
    artwork: graphql`
      fragment ArtworkSidebarAuctionTimer_artwork on Artwork {
        internalID
        sale {
          cascadingEndTimeInterval
          isClosed
          ...AuctionTimer_sale
          startAt
        }
        saleArtwork {
          ...LotTimer_saleArtwork
          endAt
        }
      }
    `,
  }
)
