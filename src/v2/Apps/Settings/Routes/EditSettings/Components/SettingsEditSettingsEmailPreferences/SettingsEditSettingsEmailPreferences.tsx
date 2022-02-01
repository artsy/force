import { FC } from "react"
import { Select, Text, useToasts } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsEmailPreferences_me } from "v2/__generated__/SettingsEditSettingsEmailPreferences_me.graphql"
import { useUpdateSettingsEmailPreferences } from "./useUpdateSettingsEmailPreferences"

const DEFAULT_FREQUENCY = "weekly"

interface SettingEditSettingsEmailPreferencesProps {
  me: SettingsEditSettingsEmailPreferences_me
}

export const SettingsEditSettingsEmailPreferences: FC<SettingEditSettingsEmailPreferencesProps> = ({
  me,
}) => {
  const { sendToast } = useToasts()
  const { submitMutation } = useUpdateSettingsEmailPreferences()

  const handleSelect = async (emailFrequency: string) => {
    try {
      submitMutation({ input: { emailFrequency } })

      sendToast({
        variant: "success",
        message: "Preferences Updated",
      })
    } catch (err) {
      const error = Array.isArray(err) ? err[0] : err

      sendToast({
        variant: "error",
        message: "Something went wrong",
        description: error.message,
      })
    }
  }

  return (
    <>
      <Text color="black100" variant="lg" mb={4}>
        Email Preferences
      </Text>

      <Text color="black60" variant="sm" mb={2}>
        Receive emails from Artsy with auctions, articles, curated collections,
        and new works by artists you follow
      </Text>

      <Select
        title="Frequency"
        onSelect={handleSelect}
        options={[
          { text: "None", value: "none" },
          { text: "Daily", value: "daily" },
          { text: "Weekly", value: "weekly" },
          { text: "Alerts Only", value: "alerts_only" },
        ]}
        selected={me.emailFrequency || DEFAULT_FREQUENCY}
      />
    </>
  )
}

export const SettingsEditSettingsEmailPreferencesFragmentContainer = createFragmentContainer(
  SettingsEditSettingsEmailPreferences,
  {
    me: graphql`
      fragment SettingsEditSettingsEmailPreferences_me on Me {
        emailFrequency
        id
      }
    `,
  }
)
