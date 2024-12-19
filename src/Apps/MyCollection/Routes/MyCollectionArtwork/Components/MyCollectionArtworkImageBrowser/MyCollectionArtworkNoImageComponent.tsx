import AddStrokeIcon from "@artsy/icons/AddStrokeIcon"
import { Button, Flex } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

interface MyCollectionArtworkNoImageComponentProps {
  artworkID?: string
}

export const MyCollectionArtworkNoImageComponent: React.FC<
  React.PropsWithChildren<MyCollectionArtworkNoImageComponentProps>
> = ({ artworkID }) => {
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
        to={`/collector-profile/my-collection/artworks/${artworkID}/edit?step=photos`}
        variant="secondaryNeutral"
        size="large"
        Icon={AddStrokeIcon}
      >
        Upload Photos
      </Button>
    </Flex>
  )
}
