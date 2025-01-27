import { Spacer, Stack, Text } from "@artsy/palette"
import { UserCollectionArtworks } from "Apps/User/Components/UserCollectionArtworks"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { ClientSuspense } from "Components/ClientSuspense"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { Jump } from "Utils/Hooks/useJump"
import type { UserCollectionRoute_collection$data } from "__generated__/UserCollectionRoute_collection.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface UserCollectionRouteProps {
  collection: UserCollectionRoute_collection$data
}

const UserCollectionRoute = ({ collection }: UserCollectionRouteProps) => {
  const {
    match: { params },
  } = useRouter()

  return (
    <>
      <MetaTags title={`${collection.name} | Artsy`} />

      <Spacer y={4} />

      <Jump id="UserCollectionRoute">
        <Stack gap={4}>
          <div>
            <Text variant="lg-display">{collection.name}</Text>
            {collection.artworksConnection && (
              <Text variant="lg-display" color="black60">
                {collection.artworksConnection.totalCount} artwork
                {collection.artworksConnection.totalCount === 1 ? "" : "s"}
              </Text>
            )}
          </div>

          <ClientSuspense
            fallback={
              <ArtworkGridPlaceholder columnCount={[2, 3, 4]} amount={10} />
            }
          >
            <UserCollectionArtworks
              id={collection.internalID}
              userID={params.userID}
            />
          </ClientSuspense>
        </Stack>
      </Jump>
    </>
  )
}

export const UserCollectionRouteFragmentContainer = createFragmentContainer(
  UserCollectionRoute,
  {
    collection: graphql`
      fragment UserCollectionRoute_collection on Collection {
        internalID
        name
        artworksConnection {
          totalCount
        }
      }
    `,
  },
)
