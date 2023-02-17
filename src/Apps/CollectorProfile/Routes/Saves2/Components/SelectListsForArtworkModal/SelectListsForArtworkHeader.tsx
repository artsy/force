import { Button, Flex, Spacer, Text } from "@artsy/palette"
import { SelectListsForArtworkImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkImage"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListsForArtworkHeader_artwork$data } from "__generated__/SelectListsForArtworkHeader_artwork.graphql"

interface SelectListsForArtworkHeaderProps {
  artwork: SelectListsForArtworkHeader_artwork$data
}

const SelectListsForArtworkHeader: FC<SelectListsForArtworkHeaderProps> = ({
  artwork,
}) => {
  const imageURL = artwork.image?.url ?? null

  return (
    <Flex flexDirection="row" alignItems="center">
      <Flex flex={1} flexDirection="row" alignItems="center">
        <SelectListsForArtworkImage size={50} url={imageURL} />
        <Spacer x={1} />
        <Text>
          {artwork.title}, {artwork.date}
        </Text>
      </Flex>

      <Spacer x={1} />

      <Button variant="secondaryBlack" size="small">
        Create New List
      </Button>
    </Flex>
  )
}

export const SelectListsForArtworkHeaderFragmentContainer = createFragmentContainer(
  SelectListsForArtworkHeader,
  {
    artwork: graphql`
      fragment SelectListsForArtworkHeader_artwork on Artwork {
        title
        date
        image {
          url(version: "square")
        }
      }
    `,
  }
)
