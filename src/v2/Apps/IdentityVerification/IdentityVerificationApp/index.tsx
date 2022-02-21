import { Box, Button, Link, Sans, Serif } from "@artsy/palette"
import { IdentityVerificationApp_me$data } from "v2/__generated__/IdentityVerificationApp_me.graphql"
import { IdentityVerificationAppStartMutation } from "v2/__generated__/IdentityVerificationAppStartMutation.graphql"
import * as Schema from "v2/System/Analytics/Schema"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { useState } from "react"
import * as React from "react"
import { Title as HeadTitle } from "react-head"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { useTracking } from "react-tracking"
import createLogger from "v2/Utils/logger"
import { CompleteFailed } from "./CompleteFailed"
import { CompletePassed } from "./CompletePassed"
import { CompleteWatchlistHit } from "./CompleteWatchlistHit"
import { WrongOwner } from "./WrongOwner"
const logger = createLogger("IdentityVerificationApp.tsx")

interface Props {
  me: IdentityVerificationApp_me$data
  relay: RelayProp
}

const IdentityVerificationApp: React.FC<Props> = ({ me, relay }) => {
  const { identityVerification } = me
  const [requesting, setRequesting] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const { trackEvent } = useTracking()
  if (!identityVerification || identityVerification.userID !== me.internalID) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return <WrongOwner email={me.email} />
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  let AlternateComponent: React.FC = null

  if (identityVerification.state === "failed") {
    AlternateComponent = CompleteFailed
  } else if (identityVerification.state === "passed") {
    AlternateComponent = CompletePassed
  } else if (identityVerification.state === "watchlist_hit") {
    AlternateComponent = CompleteWatchlistHit
  }
  const trackClickedContinueToVerification = () => {
    trackEvent({
      action_type: Schema.ActionType.ClickedContinueToIdVerification,
      context_page: Schema.PageName.IdentityVerificationPage,
      context_page_owner_id: identityVerification.internalID,
    })
  }

  function startIdentityVerification() {
    const mutation = new Promise<string>((resolve, reject) => {
      commitMutation<IdentityVerificationAppStartMutation>(relay.environment, {
        mutation: graphql`
          mutation IdentityVerificationAppStartMutation(
            $input: startIdentityVerificationMutationInput!
          ) {
            startIdentityVerification(input: $input) {
              startIdentityVerificationResponseOrError {
                ... on StartIdentityVerificationSuccess {
                  identityVerificationFlowUrl
                }
                ... on StartIdentityVerificationFailure {
                  mutationError {
                    detail
                    error
                    message
                  }
                }
              }
            }
          }
        `,
        onCompleted: (response, errors) => {
          if (errors && errors.length > 0) {
            reject(new Error(JSON.stringify(errors)))
          } else {
            const {
              startIdentityVerification: {
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                startIdentityVerificationResponseOrError: {
                  identityVerificationFlowUrl,
                  mutationError,
                },
              },
            } = response
            if (mutationError) {
              reject(new Error(JSON.stringify(mutationError)))
            } else {
              resolve(identityVerificationFlowUrl)
            }
          }
        },
        onError: reject,
        variables: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          input: { identityVerificationId: identityVerification.internalID },
        },
      })
    })

    mutation
      .then(handleMutationSuccess)
      .catch(handleMutationError)
      .finally(() => {
        setRequesting(false)
      })
  }

  const handleMutationSuccess = (identityVerificationFlowUrl: string) => {
    window.location.assign(identityVerificationFlowUrl)
  }

  const handleMutationError = (error: Error) => {
    logger.error("Error when trying to start identity verification", error)
    setShowErrorModal(true)
  }

  return (
    <>
      <HeadTitle>Artsy | ID Verification</HeadTitle>
      {AlternateComponent ? (
        <AlternateComponent />
      ) : (
        <>
          <ErrorModal
            show={showErrorModal}
            contactEmail="verification@artsy.net"
            onClose={() => setShowErrorModal(false)}
          />

          <Box px="2" mb="6" mt="3" mx="auto" width="100%" maxWidth="400px">
            <Serif size="6" textAlign="center">
              Artsy identity verification
            </Serif>

            <Sans size="4" mt="2" weight="medium">
              You’ll need
            </Sans>
            <Sans size="4">
              • Your non-expired government id
              <br />• A camera on your mobile device or computer to take a
              picture of yourself
            </Sans>

            <Sans size="4" mt="2" weight="medium">
              Keep in mind
            </Sans>
            <Sans size="4">
              • The verification process can take up to 5 minutes, and needs to
              be completed at one time
              <br />
              • You will have to enable permissions to your camera to take a
              photo of your ID and yourself
              <br />• All four corners of your ID must be captured
              <br />• Artsy can not accept emails of your personal documents,
              they must be submitted to our secure identity verification partner
              during this process
            </Sans>
            <Sans size="4" mt="2" weight="medium">
              Compatible browsers
            </Sans>
            <Sans size="4">
              • iOS: Safari
              <br />• Android: Chrome, Samsung Internet
              <br />• Mac/PC: Safari, Chrome, Firefox, Microsoft Edge
              <br />
              <br />
              By clicking the button, you'll be redirected to our identity
              verification partner.
            </Sans>

            <Button
              mt="4"
              width="100%"
              loading={requesting}
              onClick={() => {
                setRequesting(true)
                trackClickedContinueToVerification()
                startIdentityVerification()
              }}
            >
              Continue to verification
            </Button>

            <Sans mt="4" size="4" color="black60">
              For more information, see the{" "}
              <Link href="/identity-verification-faq">FAQ</Link>.
            </Sans>
          </Box>
        </>
      )}
    </>
  )
}

export const IdentityVerificationAppFragmentContainer = createFragmentContainer(
  IdentityVerificationApp,
  {
    me: graphql`
      fragment IdentityVerificationApp_me on Me
        @argumentDefinitions(id: { type: "String!" }) {
        internalID
        email
        identityVerification(id: $id) {
          internalID
          userID
          state
        }
      }
    `,
  }
)
