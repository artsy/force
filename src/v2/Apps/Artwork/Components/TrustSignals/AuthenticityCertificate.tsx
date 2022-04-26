import {
  CertificateIcon,
  Flex,
  Modal,
  Text,
  Link,
  Spacer,
} from "@artsy/palette"
import { AuthenticityCertificate_artwork } from "v2/__generated__/AuthenticityCertificate_artwork.graphql"
import { useState } from "react"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { TrustSignal, TrustSignalProps } from "./TrustSignal"
import { shouldRenderAuthenticityCertificate } from "v2/Apps/Artwork/Utils/badges"

interface AuthenticityCertificateProps
  extends Omit<TrustSignalProps, "Icon" | "label" | "description"> {
  artwork: AuthenticityCertificate_artwork
}

export const AuthenticityCertificate: React.FC<AuthenticityCertificateProps> = ({
  artwork,
  ...rest
}) => {
  const [isShowingModal, setIsShowingModal] = useState(false)

  const handleClose = () => {
    setIsShowingModal(false)
  }

  const handleClick = () => {
    setIsShowingModal(true)
  }

  return shouldRenderAuthenticityCertificate(artwork) ? (
    <>
      <TrustSignal
        onClick={handleClick}
        Icon={<CertificateIcon />}
        label="Certificate of authenticity"
        description="This work includes a certificate of authenticity."
        {...rest}
      />

      <Modal
        show={isShowingModal}
        onClose={handleClose}
        title="Certificate of Authenticity"
      >
        <Flex flexGrow={1} flexDirection="column">
          <Text variant="sm">
            A certificate of authenticity (COA) is a document from an
            authoritative source that verifies the artwork’s authenticity. While
            many COAs are signed by the artist, others will be signed by the
            representing gallery or the printmaker who collaborated with the
            artist on the work. For secondary market works, authorized estates
            or foundations are often the issuing party.
          </Text>

          <Spacer mt={2} />

          <Text variant="sm">
            COAs typically include the name of the artist, the details (title,
            date, medium, dimensions) of the work in question, and whenever
            possible an image of the work.
          </Text>

          <Spacer mt={2} />

          <Text variant="sm">
            Read more about artwork authenticity in our{" "}
            <Link
              href="https://support.artsy.net/hc/en-us/articles/360058123933-What-Counts-as-an-Artwork-s-Proof-of-Authenticity-"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help Center
            </Link>
            .
          </Text>
        </Flex>
      </Modal>
    </>
  ) : null
}

export const AuthenticityCertificateFragmentContainer = createFragmentContainer(
  AuthenticityCertificate,
  {
    artwork: graphql`
      fragment AuthenticityCertificate_artwork on Artwork {
        hasCertificateOfAuthenticity
        isBiddable
      }
    `,
  }
)
