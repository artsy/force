import { Button, Flex, Message, Spacer, Text } from "@artsy/palette"
import { SelectListsForArtworkImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkImage"
import {
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListsForArtworkHeader_artwork$data } from "__generated__/SelectListsForArtworkHeader_artwork.graphql"

interface SelectListsForArtworkHeaderProps {
  artwork: SelectListsForArtworkHeader_artwork$data
}

const SelectListsForArtworkHeader: FC<SelectListsForArtworkHeaderProps> = ({
  artwork,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "collectorSaves.selectedListsForArtwork.header",
  })
  const { state, dispatch } = useManageArtworkForSavesContext()
  const imageURL = artwork.image?.url ?? null

  const openCreateListModal = () => {
    dispatch({
      type: "SET_MODAL_KEY",
      payload: ModalKey.CreateNewList,
    })
  }

  return (
    <>
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
          {t("createNewListButton")}
        </Button>
      </Flex>

      {state.recentlyAddedList && (
        <Message variant="success" title={t("recentlyAddedList.title")} mt={2}>
          {t("recentlyAddedList.message", {
            name: state.recentlyAddedList.name,
          })}
        </Message>
      )}
    </>
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
