import React from "react"
import {
  Button,
  CheckCircleIcon,
  Flex,
  Text,
  Link,
  Separator,
} from "@artsy/palette"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { tappedMakeOffer } from "@artsy/cohesion"
import styled from "styled-components"

import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

import { OpenInquiryModalButtonQuery } from "v2/__generated__/OpenInquiryModalButtonQuery.graphql"

export const ShadowSeparator = styled(Separator)`
  box-shadow: 0 -1px 1px rgba(50, 50, 50, 0.1);
  width: 100%;
  height: 0;
`

export interface OpenInquiryModalButtonProps {
  openInquiryModal: () => void
  conversationID: string
}

export const OpenInquiryModalButton: React.FC<OpenInquiryModalButtonProps> = ({
  openInquiryModal,
  conversationID,
}) => {
  const tracking = useTracking()

  const handleOpenModal = () => {
    tracking.trackEvent(tappedMakeOffer(conversationID))
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

export const OpenInquiryModalButtonQueryRenderer: React.FC<{
  artworkID: string
  openInquiryModal: () => void
  conversationID: string
}> = ({ artworkID, openInquiryModal, conversationID }) => {
  const { relayEnvironment } = useSystemContext()
  return (
    <SystemQueryRenderer<OpenInquiryModalButtonQuery>
      environment={relayEnvironment!}
      query={graphql`
        query OpenInquiryModalButtonQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            isOfferableFromInquiry
          }
        }
      `}
      variables={{
        artworkID,
      }}
      cacheConfig={{ force: true }}
      render={({ props, error }): null | JSX.Element => {
        if (error) {
          return null
        }

        if (props?.artwork?.isOfferableFromInquiry) {
          return (
            <OpenInquiryModalButton
              openInquiryModal={() => openInquiryModal()}
              conversationID={conversationID}
            />
          )
        } else {
          return null
        }
      }}
    />
  )
}
