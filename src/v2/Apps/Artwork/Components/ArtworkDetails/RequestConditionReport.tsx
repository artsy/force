import { Button, ModalDialog, Text, useToasts } from "@artsy/palette"
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
  me: RequestConditionReport_me | null
}

export const RequestConditionReport: React.FC<RequestConditionReportProps> = props => {
  const { mediator, relayEnvironment } = useSystemContext()
  const { trackEvent } = useTracking()

  const [requesting, setRequesting] = useState(false)
  const [showRequestedModal, setShowRequestedModal] = useState(false)

  const { sendToast } = useToasts()

  const { me, artwork } = props
  const isLoggedIn = Boolean(me)

  const requestConditionReport = () => {
    return new Promise<RequestConditionReportMutationResponse>(
      async (resolve, reject) => {
        commitMutation<RequestConditionReportMutation>(relayEnvironment!, {
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
            input: { saleArtworkID: artwork.saleArtwork?.internalID! },
          },
        })
      }
    )
  }

  const handleMutationError = (error: Error) => {
    logger.error(error)

    setRequesting(false)

    sendToast({
      variant: "error",
      message:
        "Something went wrong. Please try again or contact support@artsy.net.",
    })
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
      variant="primaryGray"
      onClick={handleLoginClick}
      data-test="requestConditionReport"
    >
      Log in to request
    </Button>
  )

  const AuthenticatedContent: React.FC = () => (
    <Button
      size="small"
      variant="primaryGray"
      onClick={handleRequestConditionReportClick}
      loading={requesting}
    >
      Request condition report
    </Button>
  )

  const handleClose = () => setShowRequestedModal(false)

  const RequestedConditionReportModal: React.FC = () => {
    if (!showRequestedModal) return null

    return (
      <ModalDialog
        title="Condition report requested"
        onClose={handleClose}
        footer={
          <Button onClick={handleClose} width="100%">
            OK
          </Button>
        }
      >
        <Text variant="sm">
          We have received your request. The condition report will be sent to{" "}
          <strong>{me && me.email}</strong>.
        </Text>

        <Text variant="sm" mt={1}>
          For questions, contact{" "}
          <a href="mailto:specialist@artsy.net">specialist@artsy.net</a>.
        </Text>
      </ModalDialog>
    )
  }

  return (
    <>
      {isLoggedIn ? <AuthenticatedContent /> : <UnauthenticatedContent />}

      <RequestedConditionReportModal />
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
