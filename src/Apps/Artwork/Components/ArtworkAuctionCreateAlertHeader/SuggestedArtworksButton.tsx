import { Box, Button } from "@artsy/palette"
import { SuggestedArtworksModal } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModal"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

export const SuggestedArtworksButton: FC = () => {
  const { t } = useTranslation()
  const [modalIsOpened, setModalIsOpened] = useState(false)

  const handleClick = e => {
    e.preventDefault()
    setModalIsOpened(true)
  }

  const handleCloseModal = () => {
    setModalIsOpened(false)
  }

  return (
    <>
      <Media greaterThan="xs">
        <Box textAlign="center">
          <RouterLink to="" onClick={handleClick}>
            {t("artworkPage.artworkAuctionCreateAlertHeader.seeMoreButton")}
          </RouterLink>
        </Box>
      </Media>
      <Media at="xs">
        <Button
          variant="secondaryNeutral"
          width="100%"
          size="large"
          onClick={handleClick}
        >
          {t(
            "artworkPage.artworkAuctionCreateAlertHeader.suggestedArtworksButton"
          )}
        </Button>
      </Media>

      {modalIsOpened && <SuggestedArtworksModal onClose={handleCloseModal} />}
    </>
  )
}
