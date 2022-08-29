import { AddCircleIcon, Button, Flex, NoImageIcon } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"

interface MyCollectionArtworkNoImageComponentProps {
  artworkID?: string
}

export const MyCollectionArtworkNoImageComponent: React.FC<MyCollectionArtworkNoImageComponentProps> = ({
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
      {isMyCollectionPhase3Enabled ? (
        <Button
          data-testid="uploadPhotosButton"
          // @ts-ignore
          as={RouterLink}
          to={`/my-collection/artworks/${artworkID}/edit`}
          queryParams={{
            step: "photos",
          }}
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
