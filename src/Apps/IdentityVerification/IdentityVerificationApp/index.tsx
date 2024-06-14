import {
  Button,
  Column,
  GridColumns,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { IdentityVerificationApp_identityVerification$data } from "__generated__/IdentityVerificationApp_identityVerification.graphql"
import { IdentityVerificationAppStartMutation } from "__generated__/IdentityVerificationAppStartMutation.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useMemo, useState } from "react"
import * as React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { useTracking } from "react-tracking"
import createLogger from "Utils/logger"
import { CompleteFailed } from "./CompleteFailed"
import { CompletePassed } from "./CompletePassed"
import { CompleteWatchlistHit } from "./CompleteWatchlistHit"
import { RouterLink } from "System/Components/RouterLink"
import { MetaTags } from "Components/MetaTags"
import { HttpError } from "found"

const logger = createLogger("IdentityVerificationApp.tsx")

interface Props {
  identityVerification: IdentityVerificationApp_identityVerification$data
  relay: RelayProp
}

const IdentityVerificationApp: React.FC<Props> = ({
  identityVerification,
  relay,
}) => {
  const [requesting, setRequesting] = useState(false)

  const { sendToast } = useToasts()

  const { trackEvent } = useTracking()

  const alternateComponent = useMemo(() => {
    if (!identityVerification) {
      throw new HttpError(404)
    }
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
      action_type: DeprecatedSchema.ActionType.ClickedContinueToIdVerification,
      context_page: DeprecatedSchema.PageName.IdentityVerificationPage,
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

    sendToast({
      variant: "error",
      message:
        "Something went wrong. Please try again or contact verification@artsy.net.",
    })
  }

  return (
    <>
      <MetaTags title="Artsy | ID Verification" />

      <Spacer y={4} />

      <GridColumns>
        <Column span={[12, 8, 6]} start={[1, 3, 4]}>
          {alternateComponent ? (
            alternateComponent
          ) : (
            <>
              <Text variant="xl" textAlign="center">
                Artsy Identity Verification
              </Text>

              <Spacer y={4} />

              <Text variant="lg-display">You’ll need</Text>

              <Spacer y={1} />

              <Text variant="sm">
                • Your non-expired government ID
                <br />• A mobile phone or computer with a camera to take a
                picture of yourself
              </Text>

              <Spacer y={4} />

              <Text variant="lg-display">
                Complete the process in a single session
              </Text>

              <Spacer y={1} />

              <Text variant="sm">
                Once you click “Continue to verification” below, the
                verification process must be fully completed within 15 minutes.
                It will take up to 5 minutes to complete.
              </Text>

              <Spacer y={4} />

              <Text variant="lg-display">Good to know</Text>

              <Spacer y={1} />

              <Text variant="sm">
                • You will have to enable permissions for your camera to take a
                photo of your ID and yourself.
                <br />
                • All four corners of your ID must be captured.
                <br />• Artsy can not accept emails of your personal documents,
                they must be submitted to our secure identity verification
                partner during this process.
              </Text>

              <Spacer y={4} />

              <Text variant="lg-display">
                Please use a supported web browser
              </Text>

              <Spacer y={1} />

              <Text>
                • iOS: Safari
                <br />• Android: Chrome, Samsung Internet
                <br />• Mac/PC: Safari, Chrome, Firefox, Microsoft Edge
              </Text>

              <Spacer y={4} />

              <Text variant="xs" textAlign="center">
                By clicking the button, you'll be redirected to our identity
                verification partner.
              </Text>

              <Spacer y={1} />

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

              <Spacer y={1} />

              <Text variant="xs" color="black60" textAlign="center">
                Questions about identity verification? Read the{" "}
                <RouterLink
                  inline
                  to="https://support.artsy.net/s/article/How-to-Complete-Identity-Verification"
                >
                  step by step instructions
                </RouterLink>{" "}
                or contact{" "}
                <RouterLink inline to={"mailto:verification@artsy.net"}>
                  verification@artsy.net
                </RouterLink>
                .
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
      fragment IdentityVerificationApp_identityVerification on IdentityVerification {
        internalID
        state
      }
    `,
  }
)
