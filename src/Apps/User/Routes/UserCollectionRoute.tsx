import { Message, Spacer, Stack, Text } from "@artsy/palette"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { MetaTags } from "Components/MetaTags"
import type { UserCollectionRoute_collection$data } from "__generated__/UserCollectionRoute_collection.graphql"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"

interface UserCollectionRouteProps {
  collection: UserCollectionRoute_collection$data
}

const UserCollectionRoute = ({ collection }: UserCollectionRouteProps) => {
  return (
    <>
      <MetaTags title={`${collection.name} | Artsy`} />

      <Spacer y={4} />

      <Stack gap={4}>
        <Text variant="lg-display">{collection.name}</Text>

        {collection.artworksConnection ? (
          <ArtworkGrid
            columnCount={[2, 3, 4]}
            artworks={collection.artworksConnection}
          />
        ) : (
          <Message>No artworks in this collection yet.</Message>
        )}
      </Stack>
    </>
  )
}

export const UserCollectionRouteFragmentContainer = createFragmentContainer(
  UserCollectionRoute,
  {
    collection: graphql`
      fragment UserCollectionRoute_collection on Collection {
        id
        name
        artworksConnection(first: 50) {
          ...ArtworkGrid_artworks
        }
      }
    `,
  },
)
