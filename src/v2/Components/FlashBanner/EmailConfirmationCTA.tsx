import React from "react"
import { commitMutation, graphql } from "react-relay"
import { Button, Sans } from "@artsy/palette"
import { EmailConfirmationCTAMutationResponse } from "v2/__generated__/EmailConfirmationCTAMutation.graphql"
import {
  AnalyticsSchema as Schema,
  useSystemContext,
  useTracking,
} from "v2/Artsy"

import createLogger from "v2/Utils/logger"

const logger = createLogger("EmailConfirmationCTA")

export const EmailConfirmationCTA: React.FC = () => {
  const [afterSubmitContent, setAfterSubmitContent] = React.useState<string>(
    null
  )
  const { relayEnvironment } = useSystemContext()
  const { trackEvent } = useTracking()

  const requestConfirmation = () => {
    return new Promise<EmailConfirmationCTAMutationResponse>((done, reject) => {
      commitMutation(relayEnvironment, {
        onCompleted: (data, errors) => {
          errors && errors.length ? reject(errors) : done(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation EmailConfirmationCTAMutation {
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
    })
  }

  const handleSubmit = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      subject: Schema.Subject.EmailConfirmationCTA,
    })
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
        Please verify your email address{" "}
        <Button variant="primaryWhite" mx={1} inline onClick={handleSubmit}>
          <Sans size="3" py={0.5} px={2} lineHeight={0.2}>
            Send email
          </Sans>
        </Button>
      </>
    )
  } else {
    return <>{afterSubmitContent}</>
  }
}
