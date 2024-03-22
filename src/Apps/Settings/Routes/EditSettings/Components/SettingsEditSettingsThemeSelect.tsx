import { Button, Text } from "@artsy/palette"
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

      <Button
        onClick={() => {
          updatePreferences({
            theme: preferences.theme === "light" ? "dark" : "light",
          })
        }}
      >
        Dark mode: {preferences.theme === "light" ? "Off" : "On"}
      </Button>
    </>
  )
}
