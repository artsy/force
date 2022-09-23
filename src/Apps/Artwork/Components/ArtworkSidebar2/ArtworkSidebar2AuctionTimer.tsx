import { Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionTimerFragmentContainer } from "Components/AuctionTimer"
import { lotIsClosed } from "../../Utils/lotIsClosed"
import { ArtworkSidebar2AuctionTimer_artwork } from "__generated__/ArtworkSidebar2AuctionTimer_artwork.graphql"
import { LotTimerFragmentContainer } from "../ArtworkSidebar/LotTimer"

interface ArtworkSidebar2AuctionTimerProps {
  artwork: ArtworkSidebar2AuctionTimer_artwork
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
