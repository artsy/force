import { Button, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { IdentityVerificationApp_identityVerification } from "v2/__generated__/IdentityVerificationApp_identityVerification.graphql"
import { IdentityVerificationAppStartMutation } from "v2/__generated__/IdentityVerificationAppStartMutation.graphql"
import * as Schema from "v2/System/Analytics/Schema"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { useMemo, useState } from "react"
import * as React from "react"
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
import { RouterLink } from "v2/System/Router/RouterLink"
import { MetaTags } from "v2/Components/MetaTags"

const logger = createLogger("IdentityVerificationApp.tsx")

interface Props {
  identityVerification: IdentityVerificationApp_identityVerification
  relay: RelayProp
}

const IdentityVerificationApp: React.FC<Props> = ({
  identityVerification,
  relay,
}) => {
  const [requesting, setRequesting] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const { trackEvent } = useTracking()

  const alternateComponent = useMemo(() => {
    if (identityVerification.state === "failed") {
      return <CompleteFailed />
    }

    if (identityVerification.state === "passed") {
      return <CompletePassed />
    }

    if (identityVerification.state === "watchlist_hit") {
      return <CompleteWatchlistHit />
    }

    return null
  }, [identityVerification])

  const trackClickedContinueToVerification = () => {
    trackEvent({
      action_type: Schema.ActionType.ClickedContinueToIdVerification,
      context_page: Schema.PageName.IdentityVerificationPage,
      context_page_owner_id: identityVerification?.internalID,
    })
  }

  // TODO: Replace this with `useMutation`
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
          input: { identityVerificationId: identityVerification?.internalID },
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
      <MetaTags title="Artsy | ID Verification" />

      <Spacer mt={4} />

      <GridColumns>
        <Column span={[12, 8, 6]} start={[1, 3, 4]}>
          {alternateComponent ? (
            alternateComponent
          ) : (
            <>
              {/* TODO: Replace this with toast */}
              <ErrorModal
                show={showErrorModal}
                contactEmail="verification@artsy.net"
                onClose={() => setShowErrorModal(false)}
              />

              <Text variant="xl" textAlign="center">
                Artsy identity verification
              </Text>

              <Spacer mt={4} />

              <Text variant="lg-display">You’ll need</Text>

              <Spacer mt={1} />

              <Text variant="sm">
                • Your non-expired government id
                <br />• A camera on your mobile device or computer to take a
                picture of yourself
              </Text>

              <Spacer mt={4} />

              <Text variant="lg-display">Keep in mind</Text>

              <Spacer mt={1} />

              <Text variant="sm">
                • The verification process can take up to 5 minutes, and needs
                to be completed at one time
                <br />
                • You will have to enable permissions to your camera to take a
                photo of your ID and yourself
                <br />• All four corners of your ID must be captured
                <br />• Artsy can not accept emails of your personal documents,
                they must be submitted to our secure identity verification
                partner during this process
              </Text>

              <Spacer mt={4} />

              <Text variant="lg-display">Compatible browsers</Text>

              <Spacer mt={1} />

              <Text>
                • iOS: Safari
                <br />• Android: Chrome, Samsung Internet
                <br />• Mac/PC: Safari, Chrome, Firefox, Microsoft Edge
              </Text>

              <Spacer mt={4} />

              <Text variant="xs" textAlign="center">
                By clicking the button, you'll be redirected to our identity
                verification partner.
              </Text>

              <Spacer mt={1} />

              <Button
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

              <Spacer mt={1} />

              <Text variant="xs" color="black60" textAlign="center">
                For more information, see the{" "}
                <RouterLink to="/identity-verification-faq">FAQ</RouterLink>.
              </Text>
            </>
          )}
        </Column>
      </GridColumns>
    </>
  )
}

export const IdentityVerificationAppFragmentContainer = createFragmentContainer(
  IdentityVerificationApp,
  {
    identityVerification: graphql`
      fragment IdentityVerificationApp_identityVerification on IdentityVerification
        @argumentDefinitions(id: { type: "String!" }) {
        internalID
        state
      }
    `,
  }
)
