import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { ArtworkFilterAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterAlertContextProvider"
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
    <>
      <Spacer y={[2, 0]} />

      <GridColumns>
        <Column span={6} start={4} textAlign="center">
          <Text variant="md">Get notified when new works are available</Text>

          <Text variant="md" color="black60">
            There are currently no works for sale for this artist. Create an
            alert, and we’ll let you know when new works are added.
          </Text>

          <Spacer y={2} />

          <ArtworkFilterAlertContextProvider
            initialCriteria={{ artistIDs: [artist.internalID] }}
          >
            <CreateAlertButton />
          </ArtworkFilterAlertContextProvider>
        </Column>
      </GridColumns>
    </>
  )
}

export const ArtistWorksForSaleEmptyFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleEmpty,
  {
    artist: graphql`
      fragment ArtistWorksForSaleEmpty_artist on Artist {
        internalID
        name
      }
    `,
  }
)
