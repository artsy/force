import { Button, Flex, Message, Spacer, Text } from "@artsy/palette"
import { SavesEntityImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesEntityImage"
import {
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const SelectArtworkListsHeader: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useManageArtworkForSavesContext()
  const artwork = state.artwork!

  const openCreateArtworkListModal = () => {
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
          <Text lineClamp={2}>
            {artwork.artists && `${artwork.artists}, `}
            <i>{artwork.title}</i>
            {artwork.year && `, ${artwork.year}`}
          </Text>
        </Flex>

        <Spacer x={[0, 1]} y={[2, 0]} />

        <Button
          variant="secondaryBlack"
          size="small"
          onClick={openCreateArtworkListModal}
        >
          {t("collectorSaves.selectArtworkLists.header.createNewListButton")}
        </Button>
      </Flex>

      <Spacer y={2} />

      {state.recentlyAddedList && (
        <Message
          variant="success"
          title={t(
            "collectorSaves.selectArtworkLists.header.recentlyAddedList.title"
          )}
          mx={-2}
        >
          {t(
            "collectorSaves.selectArtworkLists.header.recentlyAddedList.message",
            {
              name: state.recentlyAddedList.name,
            }
          )}
        </Message>
      )}
    </>
  )
}
