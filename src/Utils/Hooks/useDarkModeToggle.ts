import { useAppPreferences } from "Apps/AppPreferences/useAppPreferences"
import { useCallback, useEffect } from "react"

export const useDarkModeToggle = () => {
  const { updatePreferences, preferences } = useAppPreferences()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "i") {
        updatePreferences({
          theme: preferences.theme === "light" ? "dark" : "light",
        })
      }
    },
    [preferences.theme, updatePreferences]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [preferences.theme, updatePreferences, handleKeyDown])
}
