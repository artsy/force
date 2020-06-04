import React from "react"
import { commitMutation, graphql } from "react-relay"
import { Button, Sans } from "@artsy/palette"
import { EmailConfirmationLinkExpiredMutationResponse } from "v2/__generated__/EmailConfirmationLinkExpiredMutation.graphql"
import {
  AnalyticsSchema as Schema,
  useSystemContext,
  useTracking,
} from "v2/Artsy"

import createLogger from "v2/Utils/logger"

const logger = createLogger("EmailConfirmationLinkExpired")

export const EmailConfirmationLinkExpired: React.FC = () => {
  const [afterSubmitContent, setAfterSubmitContent] = React.useState<string>(
    null
  )
  const { relayEnvironment } = useSystemContext()
  const { trackEvent } = useTracking()

  const requestConfirmation = () => {
    return new Promise<EmailConfirmationLinkExpiredMutationResponse>(
      (done, reject) => {
        commitMutation(relayEnvironment, {
          onCompleted: (data, errors) => {
            errors && errors.length ? reject(errors) : done(data)
          },
          onError: error => {
            reject(error)
          },
          mutation: graphql`
            mutation EmailConfirmationLinkExpiredMutation {
              sendConfirmationEmail(input: {}) {
                confirmationOrError {
                  ... on SendConfirmationEmailMutationSuccess {
                    unconfirmedEmail
                  }
                  ... on SendConfirmationEmailMutationFailure {
                    mutationError {
                      error
                      message
                    }
                  }
                }
              }
            }
          `,
        })
      }
    )
  }

  const handleSubmit = () => {
    logger.warn("click")
    trackEvent({
      action_type: Schema.ActionType.Click,
      subject: Schema.Subject.EmailConfirmationLinkExpired,
    })
    logger.warn("track")
    requestConfirmation()
      .then(({ sendConfirmationEmail: { confirmationOrError } }) => {
        const emailToConfirm = confirmationOrError?.unconfirmedEmail

        if (emailToConfirm) {
          setAfterSubmitContent(`An email has been sent to ${emailToConfirm}`)
        } else {
          const mutationError = confirmationOrError?.mutationError

          switch (mutationError?.message || mutationError?.error) {
            case "email is already confirmed":
              setAfterSubmitContent("Your email is already confirmed")
              break
            default:
              setAfterSubmitContent("Something went wrong. Try again?")
              break
          }
        }
      })
      .catch(reason => logger.error(JSON.stringify(reason)))
  }

  if (!afterSubmitContent) {
    return (
      <>
        Link expired.{" "}
        <Button variant="primaryWhite" mx={1} inline onClick={handleSubmit}>
          <Sans size="3" py={0.5} px={2} lineHeight={0.2}>
            Resend verification email
          </Sans>
        </Button>
      </>
    )
  } else {
    return <>{afterSubmitContent}</>
  }
}
