import { Message } from "@artsy/palette"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { EmailPreferenceWarningMessage_viewer$data } from "__generated__/EmailPreferenceWarningMessage_viewer.graphql"
import { EmailPreferenceWarningMessageQuery } from "__generated__/EmailPreferenceWarningMessageQuery.graphql"

interface EmailPreferenceWarningMessageProps {
  viewer?: EmailPreferenceWarningMessage_viewer$data
}

export const EmailPreferenceWarningMessage: FC<EmailPreferenceWarningMessageProps> = ({
  viewer,
}) => {
  const { state } = useAlertContext()

  const areCustomAlertsEmailNotificationsEnabled = viewer?.notificationPreferences?.some(
    preference => {
      return (
        preference.channel === "email" &&
        preference.name === "custom_alerts" &&
        preference.status === "SUBSCRIBED"
      )
    }
  )

  const showEmailPreferenceWarning =
    state.settings.email && !areCustomAlertsEmailNotificationsEnabled

  if (!showEmailPreferenceWarning) return null

  return (
    <Message variant="alert" title="Change your email preferences" mt={2}>
      To receive Email Alerts, please update{" "}
      <RouterLink inline to="/unsubscribe">
        your email preferences
      </RouterLink>
      .
    </Message>
  )
}

export const EmailPreferenceWarningMessageFragmentContainer = createFragmentContainer(
  EmailPreferenceWarningMessage,
  {
    viewer: graphql`
      fragment EmailPreferenceWarningMessage_viewer on Viewer
        @argumentDefinitions(authenticationToken: { type: "String" }) {
        notificationPreferences(authenticationToken: $authenticationToken) {
          channel
          name
          status
        }
      }
    `,
  }
)

export const EmailPreferenceWarningMessageQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<EmailPreferenceWarningMessageQuery>
      lazyLoad
      query={graphql`
        query EmailPreferenceWarningMessageQuery {
          viewer {
            ...EmailPreferenceWarningMessage_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer) {
          return null
        }

        return (
          <EmailPreferenceWarningMessageFragmentContainer
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}
