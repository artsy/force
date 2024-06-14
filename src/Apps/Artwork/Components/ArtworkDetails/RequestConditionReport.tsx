import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Button, ModalDialog, Text, useToasts } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import createLogger from "Utils/logger"
import { ContextModule, Intent } from "@artsy/cohesion"
import { RequestConditionReport_artwork$data } from "__generated__/RequestConditionReport_artwork.graphql"
import { RequestConditionReport_me$data } from "__generated__/RequestConditionReport_me.graphql"
import {
  RequestConditionReportMutation,
  RequestConditionReportMutation$data,
} from "__generated__/RequestConditionReportMutation.graphql"
import { RequestConditionReportQuery } from "__generated__/RequestConditionReportQuery.graphql"
import track, { useTracking } from "react-tracking"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"

const logger = createLogger(
  "Apps/Artwork/Components/ArtworkDetails/RequestConditionReport"
)

interface RequestConditionReportProps {
  artwork: RequestConditionReport_artwork$data
  me: RequestConditionReport_me$data | null | undefined
}

export const RequestConditionReport: React.FC<RequestConditionReportProps> = props => {
  const { relayEnvironment, isLoggedIn } = useSystemContext()
  const { trackEvent } = useTracking()

  const [requesting, setRequesting] = useState(false)
  const [showRequestedModal, setShowRequestedModal] = useState(false)

  const { sendToast } = useToasts()

  const { me, artwork } = props

  const { showAuthDialog } = useAuthDialog()

  const requestConditionReport = () => {
    return new Promise<RequestConditionReportMutation$data>(
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
            input: { saleArtworkID: artwork.saleArtwork?.internalID as string },
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

  const handleLoginClick = () => {
    showAuthDialog({
      mode: "Login",
      analytics: {
        contextModule: ContextModule.aboutTheWork,
        intent: Intent.requestConditionReport,
      },
    })

    // TODO: do we need this tracking?
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      subject: DeprecatedAnalyticsSchema.Subject.Login,
      sale_artwork_id: artwork?.saleArtwork?.internalID,
    })
  }

  const handleRequestConditionReportClick = () => {
    setRequesting(true)

    trackEvent({
      action_type:
        DeprecatedAnalyticsSchema.ActionType.ClickedRequestConditionReport,
      subject: DeprecatedAnalyticsSchema.Subject.RequestConditionReport,
    })

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

  const handleClose = () => setShowRequestedModal(false)

  return (
    <>
      {isLoggedIn ? (
        <Button
          size="small"
          variant="primaryGray"
          onClick={handleRequestConditionReportClick}
          loading={requesting}
        >
          Request condition report
        </Button>
      ) : (
        <Button
          size="small"
          variant="primaryGray"
          onClick={handleLoginClick}
          data-test="requestConditionReport"
        >
          Log in to request
        </Button>
      )}

      <RequestedConditionReportModal
        show={showRequestedModal}
        onClose={handleClose}
        email={me?.email ?? "Unknown"}
      />
    </>
  )
}

const RequestedConditionReportModal: React.FC<{
  onClose(): void
  show: boolean
  email: string
}> = ({ onClose, show, email }) => {
  if (!show) return null

  return (
    <ModalDialog
      title="Condition report requested"
      onClose={onClose}
      footer={
        <Button onClick={onClose} width="100%">
          OK
        </Button>
      }
    >
      <Text variant="sm">
        We have received your request. The condition report will be sent to{" "}
        <strong>{email}</strong>.
      </Text>

      <Text variant="sm" mt={1}>
        For questions, contact{" "}
        <RouterLink inline to="mailto:specialist@artsy.net">
          specialist@artsy.net
        </RouterLink>
        .
      </Text>
    </ModalDialog>
  )
}

const TrackingWrappedRequestConditionReport: React.FC<RequestConditionReportProps> = track(
  props => {
    return {
      context_page: DeprecatedAnalyticsSchema.PageName.ArtworkPage,
      context_module:
        DeprecatedAnalyticsSchema.ContextModule.AboutTheWorkCondition,
      context_page_owner_id: props.artwork.internalID,
      context_page_owner_slug: props.artwork.slug,
      context_page_owner_type: "Artwork",
      sale_artwork_id: props.artwork.saleArtwork?.internalID,
    }
  }
)(RequestConditionReport)

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
