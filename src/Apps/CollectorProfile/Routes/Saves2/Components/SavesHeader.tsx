import React, { useState } from "react"
import { Box, Text, Spacer, Button, Join } from "@artsy/palette"
import { useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { CreateNewListModalWizard } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewList/CreateNewListModalWizard"

export const SavesHeader: React.FC = () => {
  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const [modalIsOpened, setModalIsOpened] = useState(false)

  const handleCreateNewListClick = () => {
    console.log("[Debug] handleCreateNewListClick")
    setModalIsOpened(true)
  }

  const handleComplete = () => {
    setModalIsOpened(false)

    sendToast({
      variant: "success",
      message: t("collectorSaves.savesHeader.artworksAdded"),
    })
  }

  console.log("[Debug] SavesHeader")

  return (
    <>
      <CreateNewListModalWizard
        modalIsOpened={modalIsOpened}
        onComplete={handleComplete}
      />

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
