import {
  Button,
  Clickable,
  Flex,
  ModalDialog,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ArtworkSidebarAuthenticityCertificate_artwork$data } from "__generated__/ArtworkSidebarAuthenticityCertificate_artwork.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import CertificateIcon from "@artsy/icons/CertificateIcon"
import { RouterLink } from "System/Components/RouterLink"

interface ArtworkSidebarAuthenticityCertificateProps {
  artwork: ArtworkSidebarAuthenticityCertificate_artwork$data
}

export const ArtworkSidebarAuthenticityCertificate: React.FC<
  React.PropsWithChildren<ArtworkSidebarAuthenticityCertificateProps>
> = ({ artwork }) => {
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
          Includes a{" "}
          <Clickable onClick={handleClick} textDecoration="underline">
            Certificate of Authenticity
          </Clickable>
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
              Explore how Artsy supports artwork authenticity in our{" "}
              <RouterLink
                inline
                to="https://support.artsy.net/s/article/The-Artsy-Guarantee"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help Center
              </RouterLink>
            </Text>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}

export const ArtworkSidebarAuthenticityCertificateFragmentContainer =
  createFragmentContainer(ArtworkSidebarAuthenticityCertificate, {
    artwork: graphql`
      fragment ArtworkSidebarAuthenticityCertificate_artwork on Artwork {
        hasCertificateOfAuthenticity
        isBiddable
      }
    `,
  })
