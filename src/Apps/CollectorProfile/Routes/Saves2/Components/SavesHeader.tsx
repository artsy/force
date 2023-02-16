import React, { useState } from "react"
import { Flex, Text, Spacer, Button, Join } from "@artsy/palette"
import { CreateNewListModalContainer } from "./CreateNewListModal"
import { Media } from "Utils/Responsive"
import { CreateCollectionMutationResult } from "Apps/CollectorProfile/Routes/Saves2/types"
import { useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"

export const SavesHeader: React.FC = () => {
  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const [modalIsOpened, setModalIsOpened] = useState(false)

  const handleCreateNewListClick = () => {
    setModalIsOpened(true)
  }

  const handleComplete = (_result: CreateCollectionMutationResult) => {
    setModalIsOpened(false)

    sendToast({
      variant: "success",
      message: t("collectorSaves.savesHeader.listCreated"),
    })
  }

  return (
    <>
      <CreateNewListModalContainer
        visible={modalIsOpened}
        onClose={() => setModalIsOpened(false)}
        onComplete={handleComplete}
      />

      <Join separator={<Spacer y={0.5} />}>
        <Text variant="lg-display">
          {t("collectorSaves.savesHeader.savedArtworks")}
        </Text>

        {/* Desktop view */}
        <Media greaterThanOrEqual="sm">
          <Flex justifyContent="space-between">
            <Text variant="sm-display" color="black60">
              {t("collectorSaves.savesHeader.curateYourList")}
            </Text>
            <Button
              variant="secondaryBlack"
              size="small"
              onClick={handleCreateNewListClick}
            >
              {t("collectorSaves.savesHeader.createNewList")}
            </Button>
          </Flex>
        </Media>

        {/* Mobile view */}
        <Media lessThan="sm">
          <Text variant="sm-display" color="black60">
            {t("collectorSaves.savesHeader.curateYourList")}
          </Text>
          <Spacer y={2} />
          <Button
            variant="secondaryBlack"
            size="small"
            onClick={handleCreateNewListClick}
          >
            {t("collectorSaves.savesHeader.createNewList")}
          </Button>
        </Media>
      </Join>
    </>
  )
}
