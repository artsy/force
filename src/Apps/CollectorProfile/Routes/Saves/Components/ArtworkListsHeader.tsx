import { FC, useState } from "react"
import { Box, Text, Spacer, Button, Join, Flex } from "@artsy/palette"
import { useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { CreateNewListModalWizard } from "./CreateNewListModal/CreateNewListModalWizard"
import { ArtworkList } from "./CreateNewListModal/CreateNewListModal"
import { ProgressiveOnboardingSaveTitle } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveTitle"
import { RouterLink } from "System/Router/RouterLink"
import { EditListPrivacyModal } from "Apps/CollectorProfile/Routes/Saves/Components/EditListPrivacyModal/EditListPrivacyModal"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"

interface ArtworkListsHeaderProps {
  savedArtworksCount: number
  me: CollectorProfileSavesRoute_me$data
}

export const ArtworkListsHeader: FC<ArtworkListsHeaderProps> = ({
  savedArtworksCount,
  me,
}) => {
  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const [createModalIsOpened, setCreateModalIsOpened] = useState(false)
  const [editModalIsOpened, setEditModalIsOpened] = useState(false)

  const handleCreateListClick = () => {
    setCreateModalIsOpened(true)
  }

  const handleEditListClick = () => {
    setEditModalIsOpened(true)
  }

  const handleCreateComplete = (artworkList: ArtworkList) => {
    setCreateModalIsOpened(false)

    sendToast({
      variant: "success",
      message: t("collectorSaves.artworkListsHeader.listCreated", {
        listName: artworkList.name,
      }),
    })
  }

  const handleCreateClose = () => {
    setCreateModalIsOpened(false)
  }

  const handleEditClose = () => {
    setEditModalIsOpened(false)
  }

  return (
    <>
      {createModalIsOpened && (
        <CreateNewListModalWizard
          onComplete={handleCreateComplete}
          onClose={handleCreateClose}
          savedArtworksCount={savedArtworksCount}
        />
      )}

      {editModalIsOpened && (
        <EditListPrivacyModal me={me} onClose={handleEditClose} />
      )}

      <Join separator={<Spacer y={0.5} />}>
        <Text variant="lg-display">
          {t("collectorSaves.artworkListsHeader.savedArtworks")}
        </Text>

        <Box
          display={["block", "flex"]}
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          alignItems={["stretch", "center"]}
        >
          <Text variant="sm-display" color="black60">
            <ProgressiveOnboardingSaveTitle>
              {t("collectorSaves.artworkListsHeader.curateYourList") +
                " " +
                t("collectorSaves.artworkListsHeader.connector") +
                " "}
              <RouterLink to="https://support.artsy.net/s/article/Offers-on-saved-works">
                {t("collectorSaves.artworkListsHeader.signalInterest")}
              </RouterLink>
            </ProgressiveOnboardingSaveTitle>
          </Text>

          <Flex>
            <Button
              variant="tertiary"
              size="large"
              onClick={handleEditListClick}
              mt={[2, 0]}
            >
              {t("collectorSaves.artworkListsHeader.editListPrivacyButton")}
            </Button>
            <Spacer x={4} />
            <Button
              variant="secondaryBlack"
              size="large"
              onClick={handleCreateListClick}
              mt={[2, 0]}
            >
              {t("collectorSaves.artworkListsHeader.createNewListButton")}
            </Button>
          </Flex>
        </Box>
      </Join>
    </>
  )
}
