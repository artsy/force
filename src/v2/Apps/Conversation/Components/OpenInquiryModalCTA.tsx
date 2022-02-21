import * as React from "react"
import {
  Button,
  CheckCircleIcon,
  Flex,
  Text,
  Link,
  Separator,
  FLAT_SHADOW,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { tappedMakeOffer } from "@artsy/cohesion"
import styled from "styled-components"
import { OpenInquiryModalCTA_conversation$data } from "v2/__generated__/OpenInquiryModalCTA_conversation.graphql"

export const ShadowSeparator = styled(Separator)`
  box-shadow: ${FLAT_SHADOW};
  width: 100%;
  height: 0;
`

export interface OpenInquiryModalCTAProps {
  openInquiryModal: () => void
  conversation: OpenInquiryModalCTA_conversation$data
}

export const OpenInquiryModalCTA: React.FC<OpenInquiryModalCTAProps> = ({
  openInquiryModal,
  conversation,
}) => {
  const tracking = useTracking()

  const handleOpenModal = () => {
    tracking.trackEvent(tappedMakeOffer(conversation?.internalID ?? ""))
    openInquiryModal()
  }

  return (
    <>
      <ShadowSeparator />
      <Flex flexDirection="column" p={1}>
        <Flex flexDirection="row">
          <CheckCircleIcon mr={1} />
          <Flex flexShrink={1}>
            <Text color="black60" variant="xs" mb={1}>
              Only purchases completed with our secure checkout are protected by{" "}
              <Link target="_blank" href="/buyer-guarantee">
                The Artsy Guarantee
              </Link>
              .
            </Text>
          </Flex>
        </Flex>
        <Button
          size="medium"
          variant="primaryBlack"
          onClick={() => handleOpenModal()}
        >
          Make Offer
        </Button>
      </Flex>
    </>
  )
}

export const OpenInquiryModalCTAFragmentContainer = createFragmentContainer(
  OpenInquiryModalCTA,
  {
    conversation: graphql`
      fragment OpenInquiryModalCTA_conversation on Conversation {
        internalID
      }
    `,
  }
)
