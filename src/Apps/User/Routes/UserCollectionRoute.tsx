import { Spacer, Stack, Text } from "@artsy/palette"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"

const UserCollectionRoute = () => {
  return (
    <>
      <MetaTags title="Artsy" pathname="TODO" />

      <Spacer y={4} />

      <Stack gap={4}>
        <Text variant="lg-display">Collection Name</Text>

        <ArtworkGridPlaceholder columnCount={[2, 3, 4]} amount={6} />
      </Stack>
    </>
  )
}

export const UserCollectionRouteFragmentContainer = createFragmentContainer(
  UserCollectionRoute,
  {
    user: graphql`
      fragment UserCollectionRoute_user on User {
        id
      }
    `,
  },
)
