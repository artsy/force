import { Button, Flex, Message, Spacer, Text } from "@artsy/palette"
import { SelectListsForArtworkImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkImage"
import {
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const SelectListsForArtworkHeader: FC = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "collectorSaves.selectedListsForArtwork.header",
  })
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
        mt={[-2, 0]}
      >
        <Flex flex={1} flexDirection="row" alignItems="center">
          <SelectListsForArtworkImage size={50} url={artwork.imageURL} />
          <Spacer x={1} />
          <Text lineClamp={2}>{artwork.title}</Text>
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
