import {
  Box,
  Checkbox,
  Message,
  Skeleton,
  SkeletonBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Router/RouterLink"
import { FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationPreferences_viewer$data } from "__generated__/NotificationPreferences_viewer.graphql"
import { NotificationPreferencesQuery } from "__generated__/NotificationPreferencesQuery.graphql"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { useFormikContext } from "formik"
import { DEFAULT_FREQUENCY } from "Components/SavedSearchAlert/constants"
import { SavedSearchFrequency } from "Components/SavedSearchAlert/types"
import { FrequenceRadioButtons } from "Components/SavedSearchAlert/Components/FrequencyRadioButtons"

type AlertFormMode = "create" | "edit"

interface NotificationPreferencesProps {
  mode: AlertFormMode
  viewer?: NotificationPreferences_viewer$data
  frequency?: SavedSearchFrequency
}

export const NotificationPreferences: FC<NotificationPreferencesProps> = ({
  mode,
  viewer,
  frequency,
}) => {
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
    // Don't want to override the user's email preference when in edit mode
    if (mode === "edit") return

    setFieldValue("email", areCustomAlertsEmailNotificationsEnabled)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          onSelect={selected => {
            setFieldValue("push", selected)
            if (mode === "create") return
            // Restore initial frequency when "Mobile Alerts" is unselected
            if (!selected) {
              setFieldValue("frequency", frequency || DEFAULT_FREQUENCY)
            }
          }}
          selected={values.push}
        />
      </Box>

      <Spacer y={2} />

      {values.push && (
        <FrequenceRadioButtons
          defaultFrequence={values.frequency || DEFAULT_FREQUENCY}
          onSelect={selectedOption =>
            setFieldValue("frequency", selectedOption)
          }
        />
      )}
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

interface NotificationPreferencesQueryRendererProps {
  mode: AlertFormMode
  frequency?: SavedSearchFrequency
}

export const NotificationPreferencesQueryRenderer: React.FC<NotificationPreferencesQueryRendererProps> = ({
  mode,
  frequency,
}) => {
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
          <NotificationPreferencesFragmentContainer
            mode={mode}
            viewer={props.viewer}
            frequency={frequency}
          />
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
