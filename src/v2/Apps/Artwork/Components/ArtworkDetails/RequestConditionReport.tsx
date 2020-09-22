import { Button, Col, Link, Modal, Row, Spinner, Text } from "@artsy/palette"
import React, { useState } from "react"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"

import {
  AnalyticsSchema as Schema,
  track,
  useSystemContext,
  useTracking,
} from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import createLogger from "v2/Utils/logger"
import { openAuthModal } from "v2/Utils/openAuthModal"

import { ContextModule, Intent } from "@artsy/cohesion"
import { RequestConditionReport_artwork } from "v2/__generated__/RequestConditionReport_artwork.graphql"
import { RequestConditionReport_me } from "v2/__generated__/RequestConditionReport_me.graphql"
import {
  RequestConditionReportMutation,
  RequestConditionReportMutationResponse,
} from "v2/__generated__/RequestConditionReportMutation.graphql"
import { RequestConditionReportQuery } from "v2/__generated__/RequestConditionReportQuery.graphql"
import { ModalType } from "v2/Components/Authentication/Types"

const logger = createLogger(
  "Apps/Artwork/Components/ArtworkDetails/RequestConditionReport"
)

interface RequestConditionReportProps {
  artwork: RequestConditionReport_artwork
  me: RequestConditionReport_me
}

export const RequestConditionReport: React.FC<RequestConditionReportProps> = props => {
  const { mediator, relayEnvironment } = useSystemContext()
  const { trackEvent } = useTracking()

  const [requesting, setRequesting] = useState(false)
  const [showRequestedModal, setShowRequestedModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const { me, artwork } = props
  const isLoggedIn = Boolean(me)

  const requestConditionReport = () => {
    return new Promise<RequestConditionReportMutationResponse>(
      async (resolve, reject) => {
        commitMutation<RequestConditionReportMutation>(relayEnvironment, {
          onCompleted: data => {
            resolve(data)
          },
          onError: error => {
            reject(error)
          },
          mutation: graphql`
            mutation RequestConditionReportMutation(
              $input: RequestConditionReportInput!
            ) {
              requestConditionReport(input: $input) {
                conditionReportRequest {
                  internalID
                }
              }
            }
          `,
          variables: {
            input: { saleArtworkID: artwork.saleArtwork.internalID },
          },
        })
      }
    )
  }

  const handleMutationError = (error: Error) => {
    logger.error(error)

    setRequesting(false)
    setShowErrorModal(true)
  }

  function trackRequestClick() {
    trackEvent({
      action_type: Schema.ActionType.ClickedRequestConditionReport,
      subject: Schema.Subject.RequestConditionReport,
    })
  }

  const handleLoginClick = () => {
    // TODO: do we need this tracking?
    trackEvent({
      action_type: Schema.ActionType.Click,
      subject: Schema.Subject.Login,
      sale_artwork_id: artwork.saleArtwork.internalID,
    })
    openAuthModal(mediator, {
      mode: ModalType.login,
      redirectTo: location.href,
      contextModule: ContextModule.aboutTheWork,
      intent: Intent.requestConditionReport,
    })
  }

  const handleRequestConditionReportClick = () => {
    setRequesting(true)
    trackRequestClick()

    requestConditionReport()
      .then(data => {
        if (data.requestConditionReport) {
          setRequesting(false)
          setShowRequestedModal(true)
        } else {
          handleMutationError(new Error("Unknown error"))
        }
      })
      .catch(error => {
        handleMutationError(error)
      })
  }

  const UnauthenticatedContent: React.FC = () => (
    <>
      <Button
        size="small"
        variant="secondaryGray"
        onClick={handleLoginClick}
        data-test="requestConditionReport"
      >
        Log in
      </Button>
      <Text variant="caption" display="inline" ml={1}>
        to request
      </Text>
    </>
  )

  const AuthenticatedContent: React.FC = () => (
    <Button
      size="small"
      width={180}
      variant="secondaryGray"
      onClick={handleRequestConditionReportClick}
    >
      {requesting ? <Spinner size="small" /> : "Request condition report"}
    </Button>
  )

  const RequestedConditionReportModal: React.FC = () => (
    <Modal
      title="Condition report requested"
      onClose={() => {
        setShowRequestedModal(false)
      }}
      show={showRequestedModal}
    >
      <Text variant="text" mt={1} color="black100" textAlign="center">
        We have received your request. The condition report will be sent to{" "}
        {me && me.email}.
      </Text>

      <Text variant="text" mt={2} textAlign="center" color="black100">
        For questions, contact{" "}
        <Link href="mailto:specialist@artsy.net">specialist@artsy.net</Link>.
      </Text>

      <Button block mt={4} onClick={() => setShowRequestedModal(false)}>
        OK
      </Button>
    </Modal>
  )

  return (
    <>
      <Row>
        <Col>
          {isLoggedIn ? <AuthenticatedContent /> : <UnauthenticatedContent />}
        </Col>
      </Row>
      <RequestedConditionReportModal />
      <ErrorModal
        show={showErrorModal}
        onClose={() => {
          setShowErrorModal(false)
        }}
      />
    </>
  )
}

const TrackingWrappedRequestConditionReport: React.FC<RequestConditionReportProps> = track<
  RequestConditionReportProps
>(props => {
  return {
    context_page: Schema.PageName.ArtworkPage,
    context_module: Schema.ContextModule.AboutTheWorkCondition,
    context_page_owner_id: props.artwork.internalID,
    context_page_owner_slug: props.artwork.slug,
    context_page_owner_type: "Artwork",
    sale_artwork_id: props.artwork.saleArtwork.internalID,
  }
})(RequestConditionReport)

export const RequestConditionReportQueryRenderer: React.FC<{
  artworkID: string
}> = ({ artworkID }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<RequestConditionReportQuery>
      environment={relayEnvironment}
      variables={{ artworkID }}
      query={graphql`
        query RequestConditionReportQuery($artworkID: String!) {
          me {
            ...RequestConditionReport_me
          }

          artwork(id: $artworkID) {
            ...RequestConditionReport_artwork
          }
        }
      `}
      render={({ props }) => {
        if (props) {
          return (
            <RequestConditionReportFragmentContainer
              artwork={props.artwork}
              me={props.me}
            />
          )
        } else {
          return null
        }
      }}
    />
  )
}

export const RequestConditionReportFragmentContainer = createFragmentContainer(
  TrackingWrappedRequestConditionReport,
  {
    me: graphql`
      fragment RequestConditionReport_me on Me {
        email
        internalID
      }
    `,
    artwork: graphql`
      fragment RequestConditionReport_artwork on Artwork {
        internalID
        slug
        saleArtwork {
          internalID
        }
      }
    `,
  }
)
