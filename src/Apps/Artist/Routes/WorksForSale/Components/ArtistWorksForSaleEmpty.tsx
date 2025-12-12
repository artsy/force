import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { ArtworkFilterAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterAlertContextProvider"
import { EmptyState } from "Components/EmptyState"
import type { ArtistWorksForSaleEmpty_artist$data } from "__generated__/ArtistWorksForSaleEmpty_artist.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistWorksForSaleEmptyProps {
  artist: ArtistWorksForSaleEmpty_artist$data
}

const ArtistWorksForSaleEmpty: FC<
  React.PropsWithChildren<ArtistWorksForSaleEmptyProps>
> = ({ artist }) => {
  return (
    <EmptyState
      title="Get notified when new works are available"
      description={
        <>
          There are currently no works for sale for this artist.
          <br />
          Create an alert, and we’ll let you know when new works are added.
        </>
      }
      action={
        <ArtworkFilterAlertContextProvider
          initialCriteria={{ artistIDs: [artist.internalID] }}
          imageUrl={artist.coverArtwork?.image?.url}
        >
          <CreateAlertButton variant="secondaryNeutral" size="large" />
        </ArtworkFilterAlertContextProvider>
      }
    />
  )
}

export const ArtistWorksForSaleEmptyFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleEmpty,
  {
    artist: graphql`
      fragment ArtistWorksForSaleEmpty_artist on Artist {
        internalID
        name
        coverArtwork {
          image {
            url(version: "large")
          }
        }
      }
    `,
  },
)
