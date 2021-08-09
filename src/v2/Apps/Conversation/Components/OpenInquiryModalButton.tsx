import { OpenInquiryModalButtonQuery } from "v2/__generated__/OpenInquiryModalButtonQuery.graphql"
import { Button, CheckCircleIcon, Flex, Text } from "@artsy/palette"
import React from "react"
import { graphql } from "react-relay"
import { Link } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useTracking } from "react-tracking"
import { tappedMakeOffer } from "@artsy/cohesion"

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
