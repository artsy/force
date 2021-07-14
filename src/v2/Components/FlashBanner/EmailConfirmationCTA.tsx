import React from "react"
import { Button } from "@artsy/palette"
import { AnalyticsSchema, useSystemContext, useTracking } from "v2/System"
import { requestEmailConfirmation } from "./requestEmailConfirmationMutation"
import createLogger from "v2/Utils/logger"

const logger = createLogger("v2/Components/FlashBanner/EmailConfirmationCTA")

export const EmailConfirmationCTA: React.FC = () => {
  const [afterSubmitContent, setAfterSubmitContent] = React.useState<
    string | null
  >(null)

  const { relayEnvironment } = useSystemContext()
  const { trackEvent } = useTracking()

  const handleSubmit = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      subject: AnalyticsSchema.Subject.EmailConfirmationCTA,
    })

    if (!relayEnvironment) return

    requestEmailConfirmation(relayEnvironment)
      .then(({ sendConfirmationEmail }) => {
        const emailToConfirm =
          sendConfirmationEmail?.confirmationOrError?.unconfirmedEmail

        if (emailToConfirm) {
          setAfterSubmitContent(`An email has been sent to ${emailToConfirm}`)
        } else {
          const mutationError =
            sendConfirmationEmail?.confirmationOrError?.mutationError

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
        Please verify your email address
        <Button
          variant="primaryWhite"
          onClick={handleSubmit}
          size="small"
          ml={1}
        >
          Send email
        </Button>
      </>
    )
  } else {
    return <>{afterSubmitContent}</>
  }
}
