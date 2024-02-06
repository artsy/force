import { FC, useState } from "react"
import { Box, Text, Spacer, Button, Join } from "@artsy/palette"
import { useToasts } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { CreateNewListModalWizard } from "./CreateNewListModal/CreateNewListModalWizard"
import { ArtworkList } from "./CreateNewListModal/CreateNewListModal"
import { ProgressiveOnboardingSaveTitle } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveTitle"
import { RouterLink } from "System/Router/RouterLink"

interface ArtworkListsHeaderProps {
  savedArtworksCount: number
}

export const ArtworkListsHeader: FC<ArtworkListsHeaderProps> = ({
  savedArtworksCount,
}) => {
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
      message: t("collectorSaves.artworkListsHeader.listCreated", {
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
          savedArtworksCount={savedArtworksCount}
        />
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

          <Button
            variant="secondaryBlack"
            size="small"
            onClick={handleCreateNewListClick}
            mt={[2, 0]}
          >
            {t("collectorSaves.artworkListsHeader.createNewListButton")}
          </Button>
        </Box>
      </Join>
    </>
  )
}
