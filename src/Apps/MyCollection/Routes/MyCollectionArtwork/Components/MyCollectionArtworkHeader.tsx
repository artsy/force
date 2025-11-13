import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { TopContextBar } from "Components/TopContextBar"
import { RouterLink } from "System/Components/RouterLink"
import { Button } from "@artsy/palette"
import type { MyCollectionArtworkHeader_artwork$key } from "__generated__/MyCollectionArtworkHeader_artwork.graphql"
import { graphql, useFragment } from "react-relay"

interface MyCollectionArtworkHeaderProps {
  artwork: MyCollectionArtworkHeader_artwork$key
}

export const MyCollectionArtworkHeader: React.FC<
  React.PropsWithChildren<MyCollectionArtworkHeaderProps>
> = props => {
  const { editCollectedArtwork: trackEditCollectedArtwork } =
    useMyCollectionTracking()

  const artwork = useFragment(FRAGMENT, props.artwork)

  return (
    <TopContextBar
      displayBackArrow
      href="/collector-profile/my-collection"
      rightContent={
        <Button
          // @ts-expect-error
          as={RouterLink}
          variant="secondaryNeutral"
          size="small"
          to={`/collector-profile/my-collection/artworks/${artwork.internalID}/edit`}
          onClick={() =>
            trackEditCollectedArtwork(artwork.internalID, artwork.slug)
          }
        >
          Edit Artwork Details
        </Button>
      }
    >
      Back to My Collection
    </TopContextBar>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkHeader_artwork on Artwork {
    internalID
    slug
  }
`
