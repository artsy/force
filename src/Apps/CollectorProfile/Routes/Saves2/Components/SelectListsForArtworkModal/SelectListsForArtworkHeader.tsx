import { Button, Flex, Message, Spacer, Text } from "@artsy/palette"
import { SavesEntityImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesEntityImage"
import {
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const SelectListsForArtworkHeader: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useManageArtworkForSavesContext()
  const artwork = state.artwork!

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
      >
        <Flex flex={1} flexDirection="row" alignItems="center">
          <SavesEntityImage size={50} url={artwork.imageURL} />
          <Spacer x={1} />
          <Text lineClamp={2}>{artwork.title}</Text>
        </Flex>

        <Spacer x={[0, 1]} y={[2, 0]} />

        <Button
          variant="secondaryBlack"
          size="small"
          onClick={openCreateListModal}
        >
          {t("collectorSaves.selectedListsForArtwork.createNewListButton")}
        </Button>
      </Flex>

      <Spacer y={2} />

      {state.recentlyAddedList && (
        <Message
          variant="success"
          title={t(
            "collectorSaves.selectedListsForArtwork.recentlyAddedList.title"
          )}
          mx={-2}
        >
          {t(
            "collectorSaves.selectedListsForArtwork.recentlyAddedList.message",
            {
              name: state.recentlyAddedList.name,
            }
          )}
        </Message>
      )}
    </>
  )
}
