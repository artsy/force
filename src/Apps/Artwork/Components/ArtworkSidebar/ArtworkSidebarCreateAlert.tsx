import { Flex, Separator, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import type { ArtworkSidebarCreateAlert_artwork$data } from "__generated__/ArtworkSidebarCreateAlert_artwork.graphql"

import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"

interface ArtworkSidebarCreateAlertProps {
  artwork: ArtworkSidebarCreateAlert_artwork$data
}

export const ArtworkSidebarCreateAlert: React.FC<
  React.PropsWithChildren<ArtworkSidebarCreateAlertProps>
> = ({ artwork }) => {
  if (!artwork.isEligibleToCreateAlert) return null

  return (
    <>
      <Separator />
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        // FIXME: Remove
        my={2}
      >
        <Text variant="xs" mr={2}>
          Get notifications for similar works
        </Text>
        <CreateAlertButton />
      </Flex>
    </>
  )
}

export const ArtworkSidebarCreateAlertFragmentContainer =
  createFragmentContainer(ArtworkSidebarCreateAlert, {
    artwork: graphql`
      fragment ArtworkSidebarCreateAlert_artwork on Artwork {
        isEligibleToCreateAlert
      }
    `,
  })
