import {
  Flex,
  Text,
  Spacer,
  Clickable,
  ModalDialog,
  Button,
} from "@artsy/palette"
import { AuthenticityCertificate_artwork$data } from "__generated__/AuthenticityCertificate_artwork.graphql"
import { useState, FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { shouldRenderAuthenticityCertificate } from "Apps/Artwork/Utils/badges"
import { RouterLink } from "System/Components/RouterLink"
import CertificateIcon from "@artsy/icons/CertificateIcon"

interface AuthenticityCertificateProps {
  artwork: AuthenticityCertificate_artwork$data
}

export const AuthenticityCertificate: FC<AuthenticityCertificateProps> = ({
  artwork,
}) => {
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
      <Spacer y={1} />
      <Flex>
        <CertificateIcon mr={1} />
        <Text variant="xs" color="black100">
          Includes a{" "}
          <Clickable onClick={handleClick} textDecoration="underline">
            Certificate of Authenticity
          </Clickable>
          .
        </Text>
      </Flex>

      {isShowingModal && (
        <ModalDialog
          onClose={handleClose}
          title="Certificate of Authenticity"
          footer={
            <Button width="100%" onClick={handleClose}>
              OK
            </Button>
          }
        >
          <Flex flexGrow={1} flexDirection="column">
            <Text variant="sm">
              A certificate of authenticity (COA) is a document from an
              authoritative source that verifies the artwork’s authenticity.
              While many COAs are signed by the artist, others will be signed by
              the representing gallery or the printmaker who collaborated with
              the artist on the work. For secondary market works, authorized
              estates or foundations are often the issuing party.
            </Text>

            <Spacer y={2} />

            <Text variant="sm">
              COAs typically include the name of the artist, the details (title,
              date, medium, dimensions) of the work in question, and whenever
              possible an image of the work.
            </Text>

            <Spacer y={2} />

            <Text variant="sm">
              Read more about artwork authenticity in our{" "}
              <RouterLink
                inline
                to="https://support.artsy.net/s/article/What-Counts-as-an-Artworks-Proof-of-Authenticity"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help Center
              </RouterLink>
              .
            </Text>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}

export const AuthenticityCertificateFragmentContainer = createFragmentContainer(
  AuthenticityCertificate,
  {
    artwork: graphql`
      fragment AuthenticityCertificate_artwork on Artwork {
        hasCertificateOfAuthenticity
        is_biddable: isBiddable
      }
    `,
  }
)
