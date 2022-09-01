import {
  CertificateIcon,
  Flex,
  Text,
  Spacer,
  Clickable,
  ModalDialog,
  Button,
} from "@artsy/palette"
import { ArtworkSidebar2AuthenticityCertificate_artwork } from "__generated__/ArtworkSidebar2AuthenticityCertificate_artwork.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { shouldRenderAuthenticityCertificate } from "Apps/Artwork/Utils/badges"
import { useTranslation } from "react-i18next"

interface ArtworkSidebar2AuthenticityCertificateProps {
  artwork: ArtworkSidebar2AuthenticityCertificate_artwork
}

export const ArtworkSidebar2AuthenticityCertificate: React.FC<ArtworkSidebar2AuthenticityCertificateProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  const [isShowingModal, setIsShowingModal] = useState(false)

  const handleClose = () => {
    setIsShowingModal(false)
  }

  const handleClick = () => {
    setIsShowingModal(true)
  }

  if (!shouldRenderAuthenticityCertificate(artwork)) {
    return null
  }

  return (
    <>
      <Flex alignItems="center">
        <CertificateIcon mr={1} />
        <Text variant="sm-display">
          {t("artworkPage.sidebar.details.AuthenticityCertificate.includes")}
          <Clickable onClick={handleClick} textDecoration="underline">
            {t(
              "artworkPage.sidebar.details.AuthenticityCertificate.certificateOfAuthenticity"
            )}
          </Clickable>
        </Text>
      </Flex>

      {isShowingModal && (
        <ModalDialog
          onClose={handleClose}
          title={t(
            "artworkPage.sidebar.details.AuthenticityCertificateModal.title"
          )}
          footer={
            <Button width="100%" onClick={handleClose}>
              {t(
                "artworkPage.sidebar.details.AuthenticityCertificateModal.close"
              )}
            </Button>
          }
        >
          <Flex flexGrow={1} flexDirection="column">
            <Text variant="sm">
              {t(
                "artworkPage.sidebar.details.AuthenticityCertificateModal.description1"
              )}
            </Text>

            <Spacer mt={2} />

            <Text variant="sm">
              {t(
                "artworkPage.sidebar.details.AuthenticityCertificateModal.description2"
              )}
            </Text>

            <Spacer mt={2} />

            <Text variant="sm">
              {t(
                "artworkPage.sidebar.details.AuthenticityCertificateModal.readMore"
              )}
              <a
                href="https://support.artsy.net/hc/en-us/articles/360058123933-What-Counts-as-an-Artwork-s-Proof-of-Authenticity-"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "artworkPage.sidebar.details.AuthenticityCertificateModal.helpCenterLink"
                )}
              </a>
            </Text>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}

export const ArtworkSidebar2AuthenticityCertificateFragmentContainer = createFragmentContainer(
  ArtworkSidebar2AuthenticityCertificate,
  {
    artwork: graphql`
      fragment ArtworkSidebar2AuthenticityCertificate_artwork on Artwork {
        hasCertificateOfAuthenticity
        is_biddable: isBiddable
      }
    `,
  }
)
