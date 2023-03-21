import { FC, useState } from "react"
import { Box, Text, Spacer, Button, Join } from "@artsy/palette"
import { useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { CreateNewListModalWizard } from "./CreateNewListModal/CreateNewListModalWizard"
import { ArtworkList } from "./CreateNewListModal/CreateNewListModal"

export const SavesHeader: FC = () => {
  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const [modalIsOpened, setModalIsOpened] = useState(false)

  const handleCreateNewListClick = () => {
    setModalIsOpened(true)
  }

  const handleComplete = (artworkList: ArtworkList) => {
    setModalIsOpened(false)

    sendToast({
      variant: "success",
      message: t("collectorSaves.savesHeader.listCreated", {
        listName: artworkList.name,
      }),
    })
  }

  const handleClose = () => {
    setModalIsOpened(false)
  }

  return (
    <>
      {modalIsOpened && (
        <CreateNewListModalWizard
          onComplete={handleComplete}
          onClose={handleClose}
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
