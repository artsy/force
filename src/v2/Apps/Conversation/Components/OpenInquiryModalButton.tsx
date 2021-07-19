import { OpenInquiryModalButtonQuery } from "v2/__generated__/OpenInquiryModalButtonQuery.graphql"
import { Button, CheckCircleIcon, Flex, Separator, Text } from "@artsy/palette"
import React, { useEffect } from "react"
import { graphql } from "react-relay"
import { Link } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import styled from "styled-components"
import { useTracking } from "react-tracking"
import { tappedMakeOffer } from "@artsy/cohesion"

export const ShadowSeparator = styled(Separator)`
  box-shadow: 0 -1px 1px rgba(50, 50, 50, 0.1);
  width: 100%;
  height: 0;
`

export interface OpenInquiryModalButtonProps {
  openInquiryModal: () => void
  onMount: () => void
  conversationID: string
}

export const OpenInquiryModalButton: React.FC<OpenInquiryModalButtonProps> = ({
  openInquiryModal,
  onMount,
  conversationID,
}) => {
  const tracking = useTracking()

  const handleOpenModal = () => {
    tracking.trackEvent(tappedMakeOffer(conversationID))
    openInquiryModal()
  }

  useEffect(onMount, [])

  return (
    <>
      <ShadowSeparator />
      <Flex flexDirection="column" p={1}>
        <Flex flexDirection="row">
          <CheckCircleIcon mr={1} />
          <Flex flexShrink={1}>
            <Text color="black60" variant="small" mb={1}>
              Only purchases completed with our secure checkout are protected by{" "}
              <Link target="_blank" href="/buyer-guarantee">
                The Artsy Guarantee
              </Link>
              .
            </Text>
          </Flex>
        </Flex>
        <Button
          size="large"
          variant="primaryBlack"
          width="100%"
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
  onMount: () => void
  conversationID: string
}> = ({ artworkID, openInquiryModal, onMount, conversationID }) => {
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
              onMount={onMount}
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
