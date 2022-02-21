import { Button, Link, Modal, Text } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"
import {
  AnalyticsSchema as Schema,
  track,
  useSystemContext,
  useTracking,
} from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import createLogger from "v2/Utils/logger"
import { openAuthModal } from "v2/Utils/openAuthModal"

import { ContextModule, Intent } from "@artsy/cohesion"
import { RequestConditionReport_artwork$data } from "v2/__generated__/RequestConditionReport_artwork.graphql"
import { RequestConditionReport_me$data } from "v2/__generated__/RequestConditionReport_me.graphql"
import {
  RequestConditionReportMutation,
  RequestConditionReportMutation$data,
} from "v2/__generated__/RequestConditionReportMutation.graphql"
import { RequestConditionReportQuery } from "v2/__generated__/RequestConditionReportQuery.graphql"
import { ModalType } from "v2/Components/Authentication/Types"

const logger = createLogger(
  "Apps/Artwork/Components/ArtworkDetails/RequestConditionReport"
)

interface RequestConditionReportProps {
  artwork: RequestConditionReport_artwork$data
  me: RequestConditionReport_me$data | null
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
    return new Promise<RequestConditionReportMutation$data>(
      async (resolve, reject) => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      sale_artwork_id: artwork.saleArtwork.internalID,
    })
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
    <Button
      size="small"
      variant="secondaryGray"
      onClick={handleLoginClick}
      data-test="requestConditionReport"
    >
      Log in to request
    </Button>
  )

  const AuthenticatedContent: React.FC = () => (
    <Button
      size="small"
      variant="secondaryGray"
      onClick={handleRequestConditionReportClick}
      loading={requesting}
    >
      Request condition report
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
      <Text variant="sm" mt={1} color="black100" textAlign="center">
        We have received your request. The condition report will be sent to{" "}
        {me && me.email}.
      </Text>

      <Text variant="sm" mt={2} textAlign="center" color="black100">
        For questions, contact{" "}
        <Link href="mailto:specialist@artsy.net">specialist@artsy.net</Link>.
      </Text>

      <Button mt={4} onClick={() => setShowRequestedModal(false)}>
        OK
      </Button>
    </Modal>
  )

  return (
    <>
      {isLoggedIn ? <AuthenticatedContent /> : <UnauthenticatedContent />}

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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    sale_artwork_id: props.artwork.saleArtwork.internalID,
  }
})(RequestConditionReport)

export const RequestConditionReportQueryRenderer: React.FC<{
  artworkID: string
}> = ({ artworkID }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<RequestConditionReportQuery>
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
        if (props && props.artwork) {
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
