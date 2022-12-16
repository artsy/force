import { AddCircleIcon, Button, Flex } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"

interface MyCollectionArtworkNoImageComponentProps {
  artworkID?: string
}

export const MyCollectionArtworkNoImageComponent: React.FC<MyCollectionArtworkNoImageComponentProps> = ({
  artworkID,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

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
      <Button
        data-testid="uploadPhotosButton"
        // @ts-ignore
        as={RouterLink}
        to={
          isCollectorProfileEnabled
            ? `/collector-profile/my-collection/artworks/${artworkID}/edit?step=photos`
            : `/my-collection/artworks/${artworkID}/edit?step=photos`
        }
        variant="secondaryNeutral"
        size="large"
        Icon={AddCircleIcon}
      >
        Upload Photos
      </Button>
    </Flex>
  )
}
