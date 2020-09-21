import { CertificateIcon, Flex, Modal, Text } from "@artsy/palette"
import { AuthenticityCertificate_artwork } from "v2/__generated__/AuthenticityCertificate_artwork.graphql"
import React, { useState } from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"

interface AuthenticityCertificateProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: AuthenticityCertificate_artwork
}

export const AuthenticityCertificate: React.FC<AuthenticityCertificateProps> = ({
  artwork,
  ...other
}) => {
  const [isShowingModal, setIsShowingModal] = useState(false)

  const onDismissModal = () => {
    setIsShowingModal(false)
  }

  const onOpenModal = () => {
    setIsShowingModal(true)
  }

  return (
    artwork.hasCertificateOfAuthenticity &&
    !artwork.is_biddable && (
      <>
        <TrustSignal
          onClick={onOpenModal.bind(this)}
          Icon={<CertificateIcon />}
          label="Certificate of authenticity"
          description={"This work includes a certificate of authenticity."}
          {...other}
        />

        <Modal
          show={isShowingModal}
          onClose={onDismissModal}
          title="Certificate of Authenticity"
        >
          <Flex flexGrow={1} flexDirection="column">
            <Text variant="text" pb={2}>
              A certificate of authenticity (COA) is a signed document from an
              authoritative source that verifies the artwork’s authenticity.
              While many COAs are signed by the artist, others will be signed by
              the representing gallery or the printmaker who collaborated with
              the artist on the work. For secondary market works, authorized
              estates or foundations are often the issuing party.
            </Text>
            <Text variant="text" pb={2}>
              COAs typically include the name of the artist, the details (title,
              date, medium, dimensions) of the work in question, and whenever
              possible an image of the work.
            </Text>
          </Flex>
        </Modal>
      </>
    )
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
