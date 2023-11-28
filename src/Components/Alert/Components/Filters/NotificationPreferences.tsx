import {
  Box,
  Checkbox,
  Message,
  Skeleton,
  SkeletonBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Router/RouterLink"
import { FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationPreferences_viewer$data } from "__generated__/NotificationPreferences_viewer.graphql"
import { NotificationPreferencesQuery } from "__generated__/NotificationPreferencesQuery.graphql"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { useFormikContext } from "formik"

interface NotificationPreferencesProps {
  viewer?: NotificationPreferences_viewer$data
}

export const NotificationPreferences: FC<NotificationPreferencesProps> = ({
  viewer,
}) => {
  const { state } = useAlertContext()

  const { setFieldValue, values } = useFormikContext<AlertFormikValues>()

  const areCustomAlertsEmailNotificationsEnabled = viewer?.notificationPreferences?.some(
    preference => {
      return (
        preference.channel === "email" &&
        preference.name === "custom_alerts" &&
        preference.status === "SUBSCRIBED"
      )
    }
  )

  useEffect(() => {
    setFieldValue("email", areCustomAlertsEmailNotificationsEnabled)
  }, [areCustomAlertsEmailNotificationsEnabled, setFieldValue, state])

  const showEmailPreferenceWarning =
    values.email && !areCustomAlertsEmailNotificationsEnabled

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Text variant="sm-display">Email</Text>
        <Checkbox
          onSelect={selected => setFieldValue("email", selected)}
          selected={values.email}
        />
      </Box>
      {!!showEmailPreferenceWarning && (
        <Message variant="alert" title="Change your email preferences" mt={2}>
          To receive Email Alerts, please update{" "}
          <RouterLink inline to="/unsubscribe">
            your email preferences
          </RouterLink>
          .
        </Message>
      )}

      <Spacer y={2} />

      <Box display="flex" justifyContent="space-between">
        <Text variant="sm-display">Push Notifications</Text>
        <Checkbox
          onSelect={selected => setFieldValue("push", selected)}
          selected={values.push}
        />
      </Box>
    </Box>
  )
}

export const NotificationPreferencesFragmentContainer = createFragmentContainer(
  NotificationPreferences,
  {
    viewer: graphql`
      fragment NotificationPreferences_viewer on Viewer
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

export const NotificationPreferencesQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<NotificationPreferencesQuery>
      // lazyLoad
      placeholder={PLACEHOLDER}
      query={graphql`
        query NotificationPreferencesQuery {
          viewer {
            ...NotificationPreferences_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer) {
          return PLACEHOLDER
        }

        return (
          <NotificationPreferencesFragmentContainer viewer={props.viewer} />
        )
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <SkeletonBox width="100%" height={20} />
    <Spacer y={2} />
    <SkeletonBox width="100%" height={20} />
  </Skeleton>
)
