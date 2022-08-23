import { AddCircleIcon, Button, Flex, NoImageIcon, Text } from "@artsy/palette"
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
          // on click transfer the user to the upload photos flow using artworkID
          // TODO: waiting for CX-2701
          onClick={() => {}}
          size="large"
          variant="secondaryNeutral"
          Icon={AddCircleIcon}
        >
          <Text variant="sm">Upload Photos</Text>
        </Button>
      ) : (
        <NoImageIcon width="28px" height="28px" fill="black60" />
      )}
    </Flex>
  )
}
