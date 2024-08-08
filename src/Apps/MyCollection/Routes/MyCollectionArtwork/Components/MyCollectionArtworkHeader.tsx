import { Button, Flex } from "@artsy/palette"
import { MyCollectionArtworkHeader_artwork$key } from "__generated__/MyCollectionArtworkHeader_artwork.graphql"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { MyCollectionArtworkBackButton } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkBackButton"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"

interface MyCollectionArtworkHeaderProps {
  artwork: MyCollectionArtworkHeader_artwork$key
}

export const MyCollectionArtworkHeader: React.FC<MyCollectionArtworkHeaderProps> = props => {
  const {
    editCollectedArtwork: trackEditCollectedArtwork,
  } = useMyCollectionTracking()

  const artwork = useFragment(FRAGMENT, props.artwork)
  const showEditCTA = !artwork.consignmentSubmission?.internalID

  return (
    <Flex pt={2} justifyContent="space-between" alignItems="center">
      <MyCollectionArtworkBackButton />

      {showEditCTA && (
        <Button
          // @ts-ignore
          as={RouterLink}
          variant="secondaryNeutral"
          size="small"
          to={`/collector-profile/my-collection/artworks/${artwork.internalID}/edit`}
          onClick={() =>
            trackEditCollectedArtwork(artwork.internalID, artwork.slug)
          }
          alignSelf="flex-end"
        >
          <Media greaterThanOrEqual="sm">Edit Artwork Details</Media>
          <Media lessThan="sm">Edit</Media>
        </Button>
      )}
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkHeader_artwork on Artwork {
    internalID
    slug
    consignmentSubmission {
      internalID
    }
  }
`
