import { Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionTimerFragmentContainer } from "Components/AuctionTimer"

import { ArtworkSidebar2AuctionTimer_artwork$data } from "__generated__/ArtworkSidebar2AuctionTimer_artwork.graphql"
import { LotTimerFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/LotTimer"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"

interface ArtworkSidebar2AuctionTimerProps {
  artwork: ArtworkSidebar2AuctionTimer_artwork$data
}

export const ArtworkSidebar2AuctionTimer: React.FC<ArtworkSidebar2AuctionTimerProps> = ({
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

export const ArtworkSidebar2AuctionTimerFragmentContainer = createFragmentContainer(
  ArtworkSidebar2AuctionTimer,
  {
    artwork: graphql`
      fragment ArtworkSidebar2AuctionTimer_artwork on Artwork {
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
        }
      }
    `,
  }
)
