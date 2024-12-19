import { Spacer } from "@artsy/palette"
import { AuctionTimerFragmentContainer } from "Components/AuctionTimer"
import { createFragmentContainer, graphql } from "react-relay"

import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import type { ArtworkSidebarAuctionTimer_artwork$data } from "__generated__/ArtworkSidebarAuctionTimer_artwork.graphql"
import { LotTimerFragmentContainer } from "./LotTimer"

interface ArtworkSidebarAuctionTimerProps {
  artwork: ArtworkSidebarAuctionTimer_artwork$data
}

export const ArtworkSidebarAuctionTimer: React.FC<
  React.PropsWithChildren<ArtworkSidebarAuctionTimerProps>
> = ({ artwork }) => {
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

export const ArtworkSidebarAuctionTimerFragmentContainer =
  createFragmentContainer(ArtworkSidebarAuctionTimer, {
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
  })
