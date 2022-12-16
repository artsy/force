import { AddCircleIcon, Button, Flex } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

interface MyCollectionArtworkNoImageComponentProps {
  artworkID?: string
}

// TODO
export const MyCollectionArtworkNoImageComponent: React.FC<MyCollectionArtworkNoImageComponentProps> = ({
  artworkID,
}) => {
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
        to={`/my-collection/artworks/${artworkID}/edit?step=photos`}
        variant="secondaryNeutral"
        size="large"
        Icon={AddCircleIcon}
      >
        Upload Photos
      </Button>
    </Flex>
  )
}
