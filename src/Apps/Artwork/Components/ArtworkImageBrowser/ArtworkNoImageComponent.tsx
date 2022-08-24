import { AddCircleIcon, Button, Flex, NoImageIcon } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"

interface ArtworkNoImageComponentProps {
  isMyCollectionArtwork?: boolean
  artworkID?: string
}

export const ArtworkNoImageComponent: React.FC<ArtworkNoImageComponentProps> = ({
  isMyCollectionArtwork,
  artworkID,
}) => {
  const isMyCollectionPhase3Enabled = useFeatureFlag(
    "my-collection-web-phase-3"
  )

  return (
    <Flex
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      {isMyCollectionArtwork && isMyCollectionPhase3Enabled ? (
        <Button
          data-testid="uploadPhotosButton"
          // @ts-ignore
          as={RouterLink}
          to={`/my-collection/artworks/${artworkID}/edit`}
          variant="secondaryNeutral"
          size="large"
          Icon={AddCircleIcon}
        >
          Upload Photos
        </Button>
      ) : (
        <NoImageIcon width="28px" height="28px" fill="black60" />
      )}
    </Flex>
  )
}
