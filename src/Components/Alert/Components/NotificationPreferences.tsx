import type { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { RouterLink } from "System/Components/RouterLink"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  Box,
  Checkbox,
  Message,
  Skeleton,
  SkeletonBox,
  Spacer,
  Text,
} from "@artsy/palette"
import type { NotificationPreferences_viewer$data } from "__generated__/NotificationPreferences_viewer.graphql"
import type { NotificationPreferencesQuery } from "__generated__/NotificationPreferencesQuery.graphql"
import { useFormikContext } from "formik"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

type AlertFormMode = "create" | "edit"

interface NotificationPreferencesProps {
  mode: AlertFormMode
  viewer?: NotificationPreferences_viewer$data
}

export const NotificationPreferences: FC<
  React.PropsWithChildren<NotificationPreferencesProps>
> = ({ viewer }) => {
  const { setFieldValue, values } = useFormikContext<AlertFormikValues>()

  const areCustomAlertsEmailNotificationsEnabled =
    viewer?.notificationPreferences?.some(preference => {
      return (
        preference.channel === "email" &&
        preference.name === "custom_alerts" &&
        preference.status === "SUBSCRIBED"
      )
    })

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
          }}
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
  },
)

interface NotificationPreferencesQueryRendererProps {
  mode: AlertFormMode
}

export const NotificationPreferencesQueryRenderer: React.FC<
  React.PropsWithChildren<NotificationPreferencesQueryRendererProps>
> = ({ mode }) => {
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
