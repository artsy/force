import { Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { useAppPreferences } from "Apps/AppPreferences/useAppPreferences"
import { FC } from "react"

interface SettingsEditSettingsThemeSelectProps {}

export const SettingsEditSettingsThemeSelect: FC<SettingsEditSettingsThemeSelectProps> = props => {
  const { updatePreferences, preferences } = useAppPreferences()

  return (
    <>
      <Text color="black100" variant={["md", "lg"]} mb={4}>
        Theme
      </Text>

      <RadioGroup
        onSelect={(theme: "light" | "dark") => {
          updatePreferences({ theme })
        }}
        defaultValue={preferences.theme}
      >
        <Radio value="light">Default</Radio>

        <Spacer y={1} />

        <Radio value="dark">Dark</Radio>
      </RadioGroup>
    </>
  )
}
