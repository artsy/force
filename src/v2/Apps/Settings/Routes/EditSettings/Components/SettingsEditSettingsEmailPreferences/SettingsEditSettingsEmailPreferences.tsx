import * as React from "react"
import { Flex, Select, Text, useToasts } from "@artsy/palette"
import { useSystemContext } from "v2/System/SystemContext"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsEmailPreferences_me } from "v2/__generated__/SettingsEditSettingsEmailPreferences_me.graphql"
import { UpdateUserEmailPreferencesMutation } from "v2/Components/UserSettings/UserEmailPreferences/UserEmailPreferencesMutation"

const fallbackFrequency = "weekly"

const options = [
  { text: "None", value: "none" },
  { text: "Daily", value: "daily" },
  { text: "Weekly", value: "weekly" },
  { text: "Alerts Only", value: "alerts_only" },
]

interface SettingEditSettingsEmailPreferencesProps {
  me: SettingsEditSettingsEmailPreferences_me
}

export const SettingsEditSettingsEmailPreferences: React.FC<SettingEditSettingsEmailPreferencesProps> = ({
  me,
}) => {
  const { relayEnvironment } = useSystemContext()
  const emailFrequency = me?.emailFrequency || fallbackFrequency

  const { sendToast } = useToasts()

  const handleSelect = async newEmailFrequency => {
    const variables = { emailFrequency: newEmailFrequency }
    try{
      await UpdateUserEmailPreferencesMutation(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        relayEnvironment,
        variables,
        me?.id
      )
      sendToast({
        variant: "success",
        message: "Information updated successfully",
      })
    } catch (err) {
      sendToast({ variant: "error", message: err.message })
    }
  }

  return (
    <>
      <Text color="black100" variant="lg" mb={4}>
        Email Preferences
      </Text>
      <Text color="black60" variant="sm">
        Receive emails from Artsy with auctions, articles, curated collections,
        and new works by artists you follow
      </Text>
      <Flex mt="2" justifyContent="space-between">
        <Text color="black100" variant="sm">
          Frequency
        </Text>
        <Flex alignItems="center">
          <Select
            variant="inline"
            onSelect={handleSelect}
            options={options}
            selected={emailFrequency}
          />
        </Flex>
      </Flex>
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
