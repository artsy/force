import { Button, Flex, Spacer, Text } from "@artsy/palette"
import { SelectListsForArtworkImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkImage"
import {
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListsForArtworkHeader_artwork$data } from "__generated__/SelectListsForArtworkHeader_artwork.graphql"

interface SelectListsForArtworkHeaderProps {
  artwork: SelectListsForArtworkHeader_artwork$data
}

const SelectListsForArtworkHeader: FC<SelectListsForArtworkHeaderProps> = ({
  artwork,
}) => {
  const { dispatch } = useManageArtworkForSavesContext()
  const imageURL = artwork.image?.url ?? null

  const openCreateListModal = () => {
    dispatch({
      type: "SET_MODAL_KEY",
      payload: ModalKey.CreateNewList,
    })
  }

  return (
    <Flex
      flexDirection={["column", "row"]}
      alignItems={["stretch", "center"]}
      mt={[-2, 0]}
    >
      <Flex flex={1} flexDirection="row" alignItems="center">
        <SelectListsForArtworkImage size={50} url={imageURL} />
        <Spacer x={1} />
        <Text lineClamp={2}>
          {artwork.title}, {artwork.date}
        </Text>
      </Flex>

      <Spacer x={[0, 1]} y={[2, 0]} />

      <Button
        variant="secondaryBlack"
        size="small"
        onClick={openCreateListModal}
      >
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
