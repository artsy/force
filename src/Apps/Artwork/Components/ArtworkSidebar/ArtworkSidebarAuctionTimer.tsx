import { Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionTimerFragmentContainer } from "Components/AuctionTimer"

import { ArtworkSidebarAuctionTimer_artwork$data } from "__generated__/ArtworkSidebarAuctionTimer_artwork.graphql"
import { LotTimerFragmentContainer } from "./LotTimer"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"

interface ArtworkSidebarAuctionTimerProps {
  artwork: ArtworkSidebarAuctionTimer_artwork$data
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
        (sale?.cascadingEndTimeIntervalMinutes ? (
          <>
            <Spacer y={2} />
            <LotTimerFragmentContainer saleArtwork={saleArtwork} />
          </>
        ) : (
          <>
            <Spacer y={2} />
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
          cascadingEndTimeIntervalMinutes
          isClosed
          ...AuctionTimer_sale
          startAt
        }
        saleArtwork {
          ...LotTimer_saleArtwork
          endAt
          endedAt
        }
      }
    `,
  }
)
