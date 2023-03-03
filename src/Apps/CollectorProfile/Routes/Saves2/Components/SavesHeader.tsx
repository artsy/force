import React, { useState } from "react"
import { Box, Text, Spacer, Button, Join } from "@artsy/palette"
import { CreateNewListModalContainer } from "./CreateNewListModal"
import { AddArtworksModalContainer } from "./AddArtworksModal"
import { useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"

export const SavesHeader: React.FC = () => {
  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [viewKey, setViewKey] = useState<
    "ClosedState" | "CreateList" | "AddArtworks"
  >("ClosedState")
  const [listName, setListName] = useState<string | null>(null)

  const handleCloseModal = () => {
    setViewKey("ClosedState")
    setModalIsOpened(false)
  }

  const handleCreateNewListClick = () => {
    setViewKey("CreateList")
    setModalIsOpened(true)
  }

  const handleCreateListComplete = listName => {
    setListName(listName)
    setViewKey("AddArtworks")
  }

  const handleAddArtworksComplete = () => {
    setViewKey("ClosedState")
    setModalIsOpened(false)

    sendToast({
      variant: "success",
      message: t("collectorSaves.savesHeader.artworksAdded"),
    })
  }

  return (
    <>
      {viewKey == "CreateList" && (
        <CreateNewListModalContainer
          visible={modalIsOpened}
          onClose={handleCloseModal}
          onComplete={handleCreateListComplete}
        />
      )}

      {(true || viewKey == "AddArtworks") && (
        <AddArtworksModalContainer
          visible={true || modalIsOpened}
          onClose={handleCloseModal}
          onComplete={handleAddArtworksComplete}
          listName={listName ?? "Outdoor Sculptures"}
        />
      )}

      <Join separator={<Spacer y={0.5} />}>
        <Text variant="lg-display">
          {t("collectorSaves.savesHeader.savedArtworks")}
        </Text>

        <Box
          display={["block", "flex"]}
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          alignItems={["stretch", "center"]}
        >
          <Text variant="sm-display" color="black60">
            {t("collectorSaves.savesHeader.curateYourList")}
          </Text>

          <Button
            variant="secondaryBlack"
            size="small"
            onClick={handleCreateNewListClick}
            mt={[2, 0]}
          >
            {t("collectorSaves.savesHeader.createNewListButton")}
          </Button>
        </Box>
      </Join>
    </>
  )
}
