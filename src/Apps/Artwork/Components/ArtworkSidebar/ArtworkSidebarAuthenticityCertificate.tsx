import {
  Flex,
  Text,
  Spacer,
  Clickable,
  ModalDialog,
  Button,
} from "@artsy/palette"
import { ArtworkSidebarAuthenticityCertificate_artwork$data } from "__generated__/ArtworkSidebarAuthenticityCertificate_artwork.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Components/RouterLink"
import CertificateIcon from "@artsy/icons/CertificateIcon"

interface ArtworkSidebarAuthenticityCertificateProps {
  artwork: ArtworkSidebarAuthenticityCertificate_artwork$data
}

export const ArtworkSidebarAuthenticityCertificate: React.FC<ArtworkSidebarAuthenticityCertificateProps> = ({
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

  const shouldRenderAuthenticityCertificate =
    artwork.hasCertificateOfAuthenticity && !artwork.isBiddable

  if (!shouldRenderAuthenticityCertificate) {
    return null
  }

  return (
    <>
      <Flex alignItems="center" data-testid="authenticity-certificate">
        <CertificateIcon mr={1} />
        <Text variant="sm">
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

            <Spacer y={2} />

            <Text variant="sm">
              {t(
                "artworkPage.sidebar.details.AuthenticityCertificateModal.description2"
              )}
            </Text>

            <Spacer y={2} />

            <Text variant="sm">
              {t(
                "artworkPage.sidebar.details.AuthenticityCertificateModal.readMore"
              )}
              <RouterLink
                inline
                to="https://support.artsy.net/s/article/What-Counts-as-an-Artworks-Proof-of-Authenticity"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(
                  "artworkPage.sidebar.details.AuthenticityCertificateModal.helpCenterLink"
                )}
              </RouterLink>
            </Text>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}

export const ArtworkSidebarAuthenticityCertificateFragmentContainer = createFragmentContainer(
  ArtworkSidebarAuthenticityCertificate,
  {
    artwork: graphql`
      fragment ArtworkSidebarAuthenticityCertificate_artwork on Artwork {
        hasCertificateOfAuthenticity
        isBiddable
      }
    `,
  }
)
