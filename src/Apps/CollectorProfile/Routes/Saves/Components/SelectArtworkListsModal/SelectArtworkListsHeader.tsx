import { Button, Flex, Message, Spacer } from "@artsy/palette"
import { ArtworkModalHeaderInfo } from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkModalHeaderInfo"
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
        <ArtworkModalHeaderInfo artwork={artwork} />

        <Spacer x={[0, 1]} y={[2, 0]} />

        <Button
          variant="secondaryBlack"
          size="small"
          onClick={openCreateArtworkListModal}
        >
          {t("collectorSaves.selectArtworkLists.header.createNewListButton")}
        </Button>
      </Flex>

      {state.recentlyAddedList && (
        <>
          <Spacer y={2} />

          <Message
            variant="success"
            title={t(
              "collectorSaves.selectArtworkLists.header.recentlyAddedList.title"
            )}
          >
            {t(
              "collectorSaves.selectArtworkLists.header.recentlyAddedList.message",
              { name: state.recentlyAddedList.name }
            )}
          </Message>
        </>
      )}
    </>
  )
}
